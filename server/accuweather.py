import requests
import os
import logging

logger = logging.getLogger(__name__)

def rate_limit_warning(rate_limit_remaining: int):
	if rate_limit_remaining < 10:
		logger.warning(f"There are {rate_limit_remaining} API calls remaining!")

def get_location_keys(models: dict, country_codes: dict, cities: dict):
	"""
		Calls the call_locations_api() function while collecting each region's location keys.

		Returns a dictionary location_keys with each region's location keys.
	"""

	location_keys = dict()

	for region_model_tuple in models.keys():

		region_name = region_model_tuple[0]

		response = call_locations_api(region_name, country_codes, cities)

		if response.status_code == requests.codes.ok:

			response_json = response.json()
			rate_limit_warning(int(response.headers.get("RateLimit-Remaining")))

			# Response returns a list with a single dictionary
			location_key = response_json[0].get('Key')
			location_keys[region_name] = location_key

		else:
			logger.warning(f"Failed to retrieve location key for - {region_name}! Using cached location key for {region_name} as backup.")

	return location_keys

def call_locations_api(region_name: str, country_codes: dict, cities: dict):
	"""
		Calls the Locations API - City Search (results narrowed by countryCode).

		List of all the response parameters: https://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/cities/%7BcountryCode%7D/search
		Returns a response from the API.
	"""

	country_code = country_codes.get(region_name)
	city_name = cities.get(region_name)

	# q: query
	payload = {"apikey": os.environ.get("API_KEY", default="BAD_API_KEY"), "q": city_name}

	# Recommended by AccuWeather to allow GZIP compression
	headers = {"Accept-Encoding": "gzip"}
	url = f"http://dataservice.accuweather.com/locations/v1/cities/{country_code}/search"

	response = requests.get(url, params=payload, headers=headers, timeout=0.5)
	return response

def get_current_conditions(models: dict, location_keys: dict):
	"""
		Calls the call_conditions_api() function while collecting each region's temperature, pressure, dewpoint temperature along with their date time for the last 24 hours.

		Returns a dictionary conditions with each region's weather data for the last 24 hours
	"""

	conditions = dict()
	for region_model_tuple in models.keys():

		region_name = region_model_tuple[0]
		location_key = location_keys.get(region_name)

		response = call_conditions_api(location_key)

		if response.status_code == requests.codes.ok:

			response_json = response.json()
			rate_limit_warning(int(response.headers.get("RateLimit-Remaining")))

			# Response returns a list with 24 dictionaries. Iterates from latest to earliest

			for hour in range(24):

				temperature = response_json[hour].get("Temperature").get("Imperial").get("Value")
				pressure = response_json[hour].get("Pressure").get("Metric").get("Value")
				dewpoint = response_json[hour].get("DewPoint").get("Imperial").get("Value")
				date_time = response_json[hour].get("LocalObservationDateTime")
				
				conditions[hour] = {
					"temperature": float(temperature), 
					"pressure": float(pressure), 
					"dewpoint": float(dewpoint), 
					"datetime": date_time
				}

		else:
			logger.warning(f"Failed to retrieve historical data for - {region_name}!")

	return conditions

def call_conditions_api(location_key: str):
	"""
		Calls the Current Conditions API - Historical Current Conditions (past 24 hours) - to get the temperature, pressure, and dewpoint temperatures for the last 24 hours.
		
		List of all the response parameters: https://developer.accuweather.com/accuweather-current-conditions-api/apis/get/currentconditions/v1/%7BlocationKey%7D/historical/24
		Returns a response from the API
	"""

	payload = {"apikey": os.environ.get("API_KEY", default="BAD_API_KEY"), "details": True}

	# Recommended by AccuWeather to allow GZIP compression
	headers = {"Accept-Encoding": "gzip"}
	url = f"http://dataservice.accuweather.com/currentconditions/v1/{location_key}/historical/24"

	response = requests.get(url, params=payload, headers=headers, timeout=0.5)
	return response

def request_weather_data(models: dict):
	"""
		Makes API requests to AccuWeather to collect the latest weather data (past 24 hours) for all models

		Call to Locations API is required to call the Current Conditions API
	"""

	# Mapping of regions to country codes to help with getting location keys
	country_codes = {
		"mongolia": "MN"
	}

	# Mapping of regions to cities to help with query in call_conditions_api()
	cities = {
		"mongolia": "ulaanbaatar"
	}

	location_keys = get_location_keys(models, country_codes, cities)
	current_conditions = get_current_conditions(models, location_keys)

	# Store current conditions to SQLite DB
	logger.info(f"Finished getting current weather conditions data.")
from pathlib import Path

import pandas as pd
import numpy as np 

import openmeteo_requests
import requests_cache
from retry_requests import retry

import logging
import boto3
from botocore.exceptions import ClientError
import os

def upload_file_to_s3(file_name, bucket, object_name=None):
	"""Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """
		
	# If S3 object_name was not specified, use file_name
	if object_name is None:
		object_name = os.path.basename(file_name)
	
	s3_client = boto3.client('s3')
	try:
		response = s3_client.upload_file(file_name, bucket, object_name)
	except ClientError as e:
		logging.error(e)
		return False
	return True

historical_forecasts_path = Path("data/historical_forecasts")
historical_forecasts_path.mkdir(parents=True, exist_ok=True)

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
openmeteo = openmeteo_requests.Client(session = retry_session)

# Make sure all required weather variables are listed here
# The order of variables in hourly or daily is important to assign them correctly below
url = "https://historical-forecast-api.open-meteo.com/v1/forecast"

LOCATIONS = ["houston"]
LAT_COORDS = [52.52]
LONG_COORDS = [12.41]

params = {
	"latitude": LAT_COORDS,
	"longitude": LONG_COORDS,
	"hourly": ["temperature_2m", "surface_pressure", "wind_speed_10m", "dew_point_2m", "wind_direction_10m", "weather_code", "cloud_cover"],
	"models": "ncep_hrrr_conus",
	"timezone": "America/Chicago",
	"start_date": "2018-01-01",
	"end_date": "2026-01-01",
	"temperature_unit": "fahrenheit",
	"temporal_resolution": "hourly_3",
}

responses = openmeteo.weather_api(url, params = params)

for i in range(len(LOCATIONS)):
	response = responses[i]

	print(f"Coordinates: {response.Latitude()}°N {response.Longitude()}°E")

	# Process hourly data. The order of variables needs to be the same as requested.
	hourly = response.Hourly()

	hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()
	hourly_dew_point_2m = hourly.Variables(1).ValuesAsNumpy()
	hourly_surface_pressure = hourly.Variables(2).ValuesAsNumpy()
	hourly_wind_speed_10m = hourly.Variables(3).ValuesAsNumpy()
	hourly_cloud_cover = hourly.Variables(4).ValuesAsNumpy()
	hourly_wind_direction_10m = hourly.Variables(5).ValuesAsNumpy()
	hourly_weather_code = hourly.Variables(6).ValuesAsNumpy()

	hourly_data = {
		"date": pd.date_range(
			start = pd.to_datetime(hourly.Time(), unit = "s", utc = True),
			end =  pd.to_datetime(hourly.TimeEnd(), unit = "s", utc = True),
			freq = pd.Timedelta(seconds = hourly.Interval()),
			inclusive = "left"
		).tz_convert(response.Timezone().decode())
	}

	hourly_data["temperature_2m"] = hourly_temperature_2m
	hourly_data["dew_point_2m"] = hourly_dew_point_2m
	hourly_data["surface_pressure"] = hourly_surface_pressure
	hourly_data["wind_speed_10m"] = hourly_wind_speed_10m
	hourly_data["cloud_cover"] = hourly_cloud_cover
	hourly_data["wind_direction_10m"] = hourly_wind_direction_10m
	hourly_data["weather_code"] = hourly_weather_code

	hourly_dataframe = pd.DataFrame(data = hourly_data)

	file_name = "data/historical_forecasts/" + LOCATIONS[i] + '_hourly_dataframe.pkl'
	print(file_name)
	hourly_dataframe.to_pickle(file_name)

	upload_file_to_s3(file_name, 's3://weather-wizard-weather-data', 'historical_forecasts/' + LOCATIONS[i] + '_hourly_dataframe.pkl')
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.events import (
    EVENT_JOB_ERROR,
    EVENT_JOB_EXECUTED,
    EVENT_JOB_MISSED
)
from accuweather import request_weather_data
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# def job_executed(error):
# 	"""Log error when the request_weather_data job fails to execute"""
# 	logger.debug(error)

# def job_missed(error):
# 	"""Log error when the request_weather_data job gets missed"""
# 	logger.debug(error)

# def job_error(event):
# 	"""Log error when the request_weather_data job runs into error"""
# 	logger.warning(event)

# def job_added(event):
# 	"""Log that the request_weather_data job has been added to scheduler"""
# 	logger.info(event)

def start_scheduler(models: dict, hours: int, minutes: int = 0):
	"""
		Starts a scheduler to periodically call the AccuWeather API.
		
		@param models: A dictionary containing the Keras models.
		@param minutes: Defines the interval between API calls in minutes. An optional parameter to help make debugging easier.
		@param hours: Defines the hourly interval between API calls.
	"""
	# Starts a scheduler on a thread different from the main thread
	# scheduler = BackgroundScheduler()

	# scheduler.add_job(request_weather_data, 'interval', minutes=minutes, hours=hours, args=(models,))
	# scheduler.start()

	# logger.info("Started background scheduler.")

	# Listens to an event caught by the scheduler and then fires a callable function
	# scheduler.add_listener(job_missed, EVENT_JOB_MISSED)
	# scheduler.add_listener(job_error, EVENT_JOB_ERROR)
	# scheduler.add_listener(job_executed, EVENT_JOB_EXECUTED)
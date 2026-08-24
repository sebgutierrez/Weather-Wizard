from fastapi import FastAPI
import boto3
import pandas as pd
from pathlib import Path

# s3://weather-wizard-weather-data
# s3://weather-wizard-weather-data/forecasts/{region}
# s3://weather-wizard-weather-data/features/{region} <--- inputs for inferencing (up to 1 week back)
# s3://weather-wizard-weather-data/history/{region}

app = FastAPI()

def download_object(object_name, file_path):
    df = []
    if file_path.exists():
        df = pd.read_pickle(file_path)
    else:
        s3 = boto3.client('s3')
        s3.download_file('s3://weather-wizard-weather-data/', object_name, file_path)
        df = pd.read_pickle(file_path)
    return df

def get_forecast_data(region_name):

    object_name = "forecasts/" + region_name + "_hourly_dataframe.pkl"
    file_path = Path('/data/' + object_name)

    df = download_object(object_name, file_path)
    return df

def get_historical_data(region_name):

    object_name = "history/" + region_name + "_hourly_dataframe.pkl"
    file_path = Path('/data/' + object_name)

    df = download_object(object_name, file_path)
    return df

def get_features_data(region_name):

    object_name = "features/" + region_name + "_hourly_dataframe.pkl"
    file_path = Path('/data/' + object_name)

    df = download_object(object_name, file_path)
    return df

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/history/{region_name}")
async def history(region_name):  
    data = get_historical_data(region_name)
    return {"data": data}

@app.get("/features/{region_name}")
async def features(region_name):  
    data = get_features_data(region_name)
    return {"data": data}

@app.get("/forecasts/{region_name}")
async def forecast(region_name):  
    data = get_forecast_data(region_name)
    return {"data": data}
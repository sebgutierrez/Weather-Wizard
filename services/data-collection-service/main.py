from fastapi import FastAPI
import boto3
import pandas as pd
from pathlib import Path

# s3://weather-wizard-data
# s3://weather-wizard-data/forecasts/{region} <--- "ground truth" forecasts
# s3://weather-wizard-data/features/{region} <--- inputs for inferencing (currently up to 1 week back)
# s3://weather-wizard-data/historical_forecasts/{region} <--- historical data, can be used for training

app = FastAPI()

def download_object(object_name, file_path):
    df = []
    if file_path.exists():
        df = pd.read_pickle(file_path)
    else:
        s3 = boto3.client('s3')
        s3.download_file('s3://weather-wizard-data/', object_name, file_path)
        df = pd.read_pickle(file_path)
    return df

def get_forecast_data(region_name):

    object_name = "forecasts/" + region_name + "_hourly_dataframe.pkl"
    file_path = Path('/data/' + object_name)

    df = download_object(object_name, file_path)
    return df

def get_historical_data(region_name):

    object_name = "historical_forecasts/" + region_name + "_hourly_dataframe.pkl"
    file_path = Path('/data/' + object_name)

    df = download_object(object_name, file_path)
    return df

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/history/{region_name}")
async def history(region_name):  
    data = get_historical_data(region_name)
    return data.to_json(orient="records") # or split

@app.get("/forecasts/{region_name}")
async def forecast(region_name):  
    data = get_forecast_data(region_name)
    return data.to_json(orient="records")
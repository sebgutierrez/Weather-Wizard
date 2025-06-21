# Example usage: python.exe preprocess_ecmwf.py --dataset-path C:/Users/sguti/WW-Data/Houston_1970_2024.nc --region-name Houston --lag-time 56 --forecast-horizon 2 --cnn False

import argparse
import numpy as np
import pandas as pd
import xarray as xr
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from joblib import dump, load

def main():

	parser = argparse.ArgumentParser()
	parser.add_argument("-d", "--dataset-path", type=str)
	parser.add_argument("-r", "--region-name", type=str)
	parser.add_argument("-l", "--lag-time", type=int)
	parser.add_argument("-f", "--forecast-horizon", type=int)
	parser.add_argument("-c", "--cnn", type=str)

	args = parser.parse_args()

	dataset_path = ""
	region_name = ""
	lag_time = 0
	forecast_horizon = 0
	cnn_flag = ""

	try:
		if args.dataset_path:
			dataset_path = args.dataset_path
		if args.region_name:	
			region_name = args.region_name
		if args.lag_time:	
			lag_time = args.lag_time
		if args.forecast_horizon:	
			forecast_horizon = args.forecast_horizon
		if args.cnn:	
			cnn_flag = args.cnn
	except Exception as e:
		print(f"An unexpected error occurred: {e}")

	# Preprocessing section

	xr_dataset = []
	try:
		xr_dataset = xr.open_dataset(dataset_path, decode_timedelta=True)
	except Exception as e:
		print(f"An error happened opening the dataset file: {e}") 

	df = []
	# Non-CNN models such as LSTMs should only focus on one pair of coordinates (default to the center of the 2D coordinate grid)
	if cnn_flag == "False": 
		xr_dataset["t2m"] = xr_dataset["t2m"][:,:,2,2]
		xr_dataset["d2m"] = xr_dataset["d2m"][:,:,2,2]
		xr_dataset["sp"] = xr_dataset["sp"][:,:,2,2]
		xr_dataset["tp"] = xr_dataset["tp"][:,:,2,2]
		xr_dataset["u10"] = xr_dataset["u10"][:,:,2,2]
		xr_dataset["v10"] = xr_dataset["v10"][:,:,2,2]
		df = xr_dataset.drop_vars(["latitude", "longitude"]).to_dataframe()
	else:
		df = xr_dataset.to_dataframe()

	# Drop any null values
	df.dropna(how="any", inplace=True)

	# Scale variables to similar orders of magnitude
	df["t2m (degF)"] = 9/5 * (df["t2m"] - 273.15) + 32
	df["d2m (degF)"] = 9/5 * (df["d2m"] - 273.15) + 32
	df["sp (mPa)"] = df["sp"] / 10**3
	df["tp (mm)"] = df["tp"] * 10**3
	df["wind_speed (m/s)"] = np.sqrt(df["u10"]**2 + df["v10"]**2)

	# Conversion from netcdf to DataFrame leaves time (day) and step (hour) as indices. Simpler to just concatenate the two.
	df = df.reset_index()
	df["timestep"] = df["time"] + df["step"]
	df = df.set_index("timestep")

	df.drop(["t2m", "d2m", "sp", "u10", "v10", "tp", "time", "step"], axis=1, inplace=True)

	# The IsolationForest ‘isolates’ observations by randomly selecting a feature and then randomly selecting a split value between the maximum and minimum values of the selected feature. 
	# Outliers are higher in the tree.
	iforest = IsolationForest(random_state=0, n_estimators = 100, contamination = 0.005, max_samples ='auto')
	prediction = iforest.fit_predict(df)
	df['anomaly'] = prediction
	outliers = df[df["anomaly"] < 0]

	# Impute the current outlier with the average of the last X days
	# Window should be small enough to not be affected by trend and large enough to take advantage of the series stationarity
	for index, series in outliers.iterrows():
		imputation_window = pd.date_range(start=pd.to_datetime(index) - pd.Timedelta(days=4, hours=3), end=pd.to_datetime(index) - pd.Timedelta(hours=3), freq="3h")
		df.loc[index, ["t2m (degF)", "d2m (degF)", "sp (mPa)", "tp (mm)", "wind_speed (m/s)"]] = df.loc[imputation_window, ["t2m (degF)", "d2m (degF)", "sp (mPa)", "tp (mm)", "wind_speed (m/s)"]].mean()
	
	df.drop(["anomaly"], axis=1, inplace=True)
	
	# Split into training subset only (80%). Used for fitting the StandardScalar for later use on validation, test data, and real-time data
	train_len = int(np.ceil(df.shape[0]) * 0.8)
	train_df = df[:train_len]

	# Sliding window approach for generating input/outputs.
	window = lag_time + forecast_horizon
	X_train = []
	y_train = []

	for i in range(train_df.shape[0]-window):
		X_train.append(train_df[i:i+lag_time])
		y_train.append(train_df[i+lag_time:i+window]["t2m (degF)"])

	# Convert train subset features to numpy array
	X_train = np.array(X_train)

	# Fit StandardScaler() to X_train only for later use to standardize validation data, test data, and incoming data
	X_train_scaler = StandardScaler()
	# Collapse to (samples * timesteps, features)
	X_train_reshaped = X_train.reshape(-1, X_train.shape[-1])
	X_train_scaler.fit(X_train_reshaped)

	try:
		X_train_scaler_file = region_name + "_scaler_model.pickle"
		dump(X_train_scaler, X_train_scaler_file)
	except Exception as e:
		print(f"An unexpected error occurred when pickling scaler model: {e}")

	# Save the preprocessed dataframe for use in model training
	try:
		df_file = region_name + "_preprocessed.pickle"
		dump(df, df_file)
	except Exception as e:
		print(f"An unexpected error occurred when pickling the preprocessed DataFrame: {e}")

if __name__ == "__main__":
	main()
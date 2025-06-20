import sys, argparse
import numpy as np
import pandas as pd
import xarray as xr
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from joblib import dump, load 

def train_val_test_split(df, lag_time, lead_time, train_split=0.8, val_split=0.1):

	train_len = int(np.ceil(df.shape[0]) * train_split)
	val_len = train_len + int(np.ceil(df.shape[0]) * val_split)

	train_df, val_df, test_df = df[:train_len], df[train_len:val_len], df[val_len:]

	lag_time = 32 # 4 days * 8 timesteps per day
	lead_time = 1
	window = lag_time + lead_time
	x_train = []
	y_train = []
	x_val = []
	y_val = []
	x_test = []
	y_test = []

	for i in range(train_df.shape[0]-window):
		x_train.append(train_df[i:i+lag_time])
		y_train.append(train_df[i+lag_time:i+window]["t2m (degF)"])

	for i in range(val_df.shape[0]-window):
		x_val.append(val_df[i:i+lag_time])
		y_val.append(val_df[i+lag_time:i+window]["t2m (degF)"])

	for i in range(test_df.shape[0]-window):
		x_test.append(test_df[i:i+lag_time])
		y_test.append(test_df[i+lag_time:i+window]["t2m (degF)"])

	# Convert data sets to numpy arrays 
	x_train, y_train = np.array(x_train), np.array(y_train)
	x_val, y_val = np.array(x_val), np.array(y_val)
	x_test, y_test = np.array(x_test), np.array(y_test)

	return x_train, y_train, x_val, y_val, x_test, y_test


def standardize(df):
	standardized_df = df

	# Scale variables to similar orders of magnitude
	standardized_df["t2m (degF)"] = 9/5 * (standardized_df["t2m"] - 273.15) + 32
	standardized_df["d2m (degF)"] = 9/5 * (standardized_df["d2m"] - 273.15) + 32
	standardized_df["sp (mPa)"] = standardized_df["sp"] / 10**3
	standardized_df["tp (mm)"] = standardized_df["tp"] * 10**3
	standardized_df["wind_speed (m/s)"] = np.sqrt(standardized_df["u10"]**2 + standardized_df["v10"]**2)

	standardized_df.drop(["t2m", "d2m", "sp", "u10", "v10", "tp", "time", "step"], axis=1, inplace=True)
	
	# Split into train, validation, and test subsets
	train_len = int(np.ceil(df.shape[0]) * 0.8)
	val_len = train_len + int(np.ceil(df.shape[0]) * 0.1)

	train_df, val_df, test_df = df[:train_len], df[train_len:val_len], df[val_len:]

	lag_time = 4 * 8
	forecast_horizon = 1 
	window = lag_time + forecast_horizon
	x_train = []
	y_train = []
	x_val = []
	y_val = []
	x_test = []
	y_test = []

	for i in range(train_df.shape[0]-window):
		x_train.append(train_df[i:i+lag_time])
		y_train.append(train_df[i+lag_time:i+window]["t2m (degF)"])

	for i in range(val_df.shape[0]-window):
		x_val.append(val_df[i:i+lag_time])
		y_val.append(val_df[i+lag_time:i+window]["t2m (degF)"])

	for i in range(test_df.shape[0]-window):
		x_test.append(test_df[i:i+lag_time])
		y_test.append(test_df[i+lag_time:i+window]["t2m (degF)"])

	# Convert data sets to numpy arrays 
	x_train, y_train = np.array(x_train), np.array(y_train)
	x_val, y_val = np.array(x_val), np.array(y_val)
	x_test, y_test = np.array(x_test), np.array(y_test)

	# Fit training mean and std scores to standardize validation and test features to avoid data leakage
	scaler = StandardScaler()
	scaled_X_train = scaler.fit_transform(x_train)
	scaled_X_val = scaler.transform(x_val)
	scaled_X_test = scaler.transform(x_test)

	# Save StandardScaler() model for transforming incoming data


	# Concatenate data back to a single dataset for portability



	concatenated_df = pd.concat([scaled_train_df, scaled_val_df, scaled_test_df])
	return concatenated_df

def outlier_detection(df):
	reduced_outlier_df = df

	# Drop any null values
	reduced_outlier_df.dropna(how="any", inplace=True)

	# The IsolationForest ‘isolates’ observations by randomly selecting a feature and then randomly selecting a split value between the maximum and minimum values of the selected feature. 
	# Outliers are higher in the tree.
	iforest = IsolationForest(random_state=0, n_estimators = 100, contamination = 0.005, max_samples ='auto')
	prediction = iforest.fit_predict(reduced_outlier_df)
	reduced_outlier_df['anomaly'] = prediction
	outliers = reduced_outlier_df[reduced_outlier_df["anomaly"] < 0]

	# Impute the current outlier with the average of the last X days
	# Window should be small enough to not be affected by trend and large enough to take advantage of the series stationarity
	for timestep, series in outliers.iterrows():
		imputation_window = pd.date_range(start=pd.to_datetime(timestep) - pd.Timedelta(days=4, hours=3), end=pd.to_datetime(timestep) - pd.Timedelta(hours=3), freq="3h")
		reduced_outlier_df.loc[timestep, :] = reduced_outlier_df.loc[imputation_window, :].mean()

	reduced_outlier_df.drop(["anomaly"], axis=1, inplace=True)
	return reduced_outlier_df

def preprocess(input_file, output_file, cnn_flag):

	xr_dataset = []
	try:
		xr_dataset = xr.open_dataset(input_file)
	except Exception as e:
		print(f"An error happened opening the dataset file: {e}") 

	df = []
	if cnn_flag is False:
		xr_dataset["t2m"] = xr_dataset["t2m"][:,:,2,2]
		xr_dataset["d2m"] = xr_dataset["d2m"][:,:,2,2]
		xr_dataset["sp"] = xr_dataset["sp"][:,:,2,2]
		xr_dataset["tp"] = xr_dataset["tp"][:,:,2,2]
		xr_dataset["u10"] = xr_dataset["u10"][:,:,2,2]
		xr_dataset["v10"] = xr_dataset["v10"][:,:,2,2]
		xr_dataset = xr_dataset.drop_vars(["latitude", "longitude"])

	df = xr_dataset.to_dataframe()

	df.reset_index(inplace=True)
	df["timestep"] = df["time"] + df["step"]
	df.set_index("timestep", inplace=True)

	reduced_outlier_df = outlier_detection(df)
	standardized_df = standardize(reduced_outlier_df)

	return standardized_df


if __name__ == "__main__":

	parser = argparse.ArgumentParser()
	parser.add_argument("-i", "--input-file", type=str)
	parser.add_argument("-o", "--output-file", type=str)
	parser.add_argument("-c", "--cnn", type=bool)

	args = parser.parse_args()

	input_file = ""
	output_file = ""
	cnn_flag = False

	if args.input_file:
		input_file = args.input_file
	if args.output_file:
		output_file = args.output_file
	if args.cnn:	
		cnn_flag = args.cnn

	preprocessed_df = preprocess(input_file, output_file, cnn_flag)



	# $ python preprocessor.py --input-file C:/Users/sguti/OneDrive/Documents/Scorched-Earth/modeling/scripts/input.txt --output-file C:/Users/sguti/OneDrive/Documents/Scorched-Earth/modeling/scripts/output.txt --cnn True
	# $ python preprocessor.py -i C:/Users/sguti/OneDrive/Documents/Scorched-Earth/modeling/scripts/input.txt -o C:/Users/sguti/OneDrive/Documents/Scorched-Earth/modeling/scripts/output.txt -c True
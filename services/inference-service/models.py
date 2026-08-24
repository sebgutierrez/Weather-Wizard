import os
import logging

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
from tensorflow import keras

logger = logging.getLogger(__name__)

class Model():

	def __init__(self, region_name: str, model_name: str, model):
		self.region_name = region_name
		self.model_name = model_name
		self.model = model

	def get_model_name(self):
		return self.model_name
	
	def get_region_name(self):
		return self.region_name

	def get_predictions(self, input_data: list):
		""" Calls predict on the model and returns a list of floats."""

		# predict() returns a NumPy array of type float32
		predictions = self.model.predict(input_data).tolist()

		return predictions
	
	def get_metrics(self):
		""" Returns all of a model's metric scores as a dictionary."""

		metrics = self.model.get_metrics_result()

		# Round metrics to 3 decimals
		return {"Mean Squared Error (MSE): ": round(metrics['loss'], 3), "Mean Absolute Error (MAE): ": round(metrics['mean_absolute_error'], 3)}

def load_models():
	"""
		Loads all .keras files in the "server/models/" directory and stores them in a dictionary, models, that has the key-value pairs: (region_name, model_name): keras_model.
	"""
	
	logger.info("Loading models...")

	models = dict()

	dir_path = os.path.join(os.getcwd(), "models")
	# os.scandir(): returns an iterator of os.DirEntry objects (i.e. files and directories). Use of the "with" context manager is recommended to explicitly close and free resources
	with os.scandir(path=dir_path) as iterator:
		# iterator returns string
		for file in iterator:
			file_name = file.name
			if file_name.endswith(".keras"):
				k_model = []
				file_path = os.path.join(dir_path, file_name)
				try:
					k_model = keras.models.load_model(file_path)
				except Exception:
					logger.exception(f"Error in load_models(): Failed to load the {file_name} model!")

				# I'm using the file naming convention "{region_name}_{model_name}.keras", so this should return: [region_name, model_name]
				region_model_pair = file_name.rstrip(".keras").split("_")

				region_name = region_model_pair[0]
				model_name =  region_model_pair[1]

				models[(region_name, model_name)] = Model(region_name, model_name, k_model)

	logger.info("Finished loading models.")
	return models

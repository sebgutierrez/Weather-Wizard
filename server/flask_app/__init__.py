from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
import os

def create_app():
	"""Application Factory where the Flask instance is created"""
	
	app = Flask(__name__)

	load_dotenv()

	# Look at ../config.py to see all config settings
	config_type = os.environ.get('CONFIG_TYPE', default='config.development_config')
	app.config.from_object(config_type)

	CORS(app)

	return app
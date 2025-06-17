from flask import request, jsonify
import logging
from flask_app import create_app
from models import load_models
from form import validate

# To be changed with SQLite DB is set up
LAST_24HR_DATA = []

app = create_app()

@app.route('/predict', methods=['POST'])
def predict():
    predictions = dict()
    form = request.json
    if form.validate():
        region_name = form.get("region")
        model_name = form.get("model")
        model = models[(region_name, model_name)]

        # Currently placeholder data until weather api is integrated. Assumes the data is a NumPy array that has already been normalized.
        predictions = model.get_predictions(LAST_24HR_DATA)
        return jsonify({"Predictions": predictions})
    else:
        return jsonify({"Error": "Invalid form data."})
    
if __name__ == "__main__":
    logger = logging.getLogger(__name__)
    logging.basicConfig(filename="server.log", filemode='w', level=logging.DEBUG, format='%(asctime)s : %(levelname)s : %(name)s : %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')
    # Ignore Werkzeug logs
    flask_logger = logging.getLogger('werkzeug')
    flask_logger.setLevel(logging.ERROR)

    models = load_models()
    app.run()
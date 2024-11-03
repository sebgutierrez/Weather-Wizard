def validate(form: dict):
	""" 
		Checks that the form fields are in the lists of valid inputs (short enough to enumerate).

		Returns a boolean indicating if the form is valid
	"""

	valid_keys = ["region", "model"]
	valid_regions = ["mongolia"]
	valid_models = ["lstm"]

	for key, value in form.items():
		if key not in valid_keys:
			return False
		else:
			if key == 'region' and value not in valid_regions:
				return False
			if key == 'model' and value not in valid_models:
				return False
		
	return True
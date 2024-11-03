import sqlite3

def create_table():
	conn = sqlite3.connect('weather.db')
	c = conn.cursor()
	c.execute(
		"""
			CREATE TABLE IF NOT EXISTS weather (
				record INTEGER PRIMARY KEY,
				timestamp TEXT,
				region TEXT, 
				t2m REAL, 
				d2m REAL, 
				sp REAL
			)
		"""
	)
	conn.commit()
	conn.close()

def get_data(region: str):
	# Get the last 24 hours of data
	conn = sqlite3.connect('weather.db')
	c = conn.cursor()
	c.execute(
		"""
			SELECT timestamp, t2m, d2m, sp 
			FROM weather
			WHERE region=:region
			ORDER BY timestamp DESC
			LIMIT 24;
		"""
		, {'region': region}
	)
	data = c.fetchall()
	conn.close()
	return data

def insert_data(region: str, timestamp: str, t2m: float, d2m: float, sp: float):
	# Inserting new weather data row by row
	conn = sqlite3.connect('weather.db')
	c = conn.cursor()
	c.execute(
		"""
			INSERT INTO weather (region, timestamp, t2m, d2m, sp)
			VALUES (:region, :timestamp, :t2m, :d2m, :sp)
		"""
		, {'region': region, 'timestamp': timestamp, 't2m': t2m, 'd2m': d2m, 'sp': sp}
	)
	conn.commit()
	conn.close()
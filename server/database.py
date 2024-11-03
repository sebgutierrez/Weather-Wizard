import sqlite3

conn = sqlite3.connect('weather.db')

c = conn.cursor()

def create_table():
	with conn:
		c.execute(
			"""
				CREATE TABLE weather (
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

def get_data(region: str):
	# Get the last 24 hours of data
	with conn:
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
	return c.fetchall() 

def insert_data(region: str, timestamp: str, t2m: float, d2m: float, sp: float):
	# Inserting new weather data row by row
	with conn:
		c.execute(
			"""
				INSERT INTO weather (region, timestamp, t2m, d2m, sp)
				VALUES (:region, :timestamp, :t2m, :d2m, :sp)
			"""
			, {'region': region, 'timestamp': timestamp, 't2m': t2m, 'd2m': d2m, 'sp': sp}
		)
	conn.commit()

conn.close()
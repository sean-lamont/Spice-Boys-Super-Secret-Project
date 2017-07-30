from geopy.geocoders import Nominatim

import csv

geolocator = Nominatim()

with open('bus_stop_lat_lng_wo_530.csv', 'rb') as f:
	reader = csv.reader(f)
	lat_lng_list = list(reader)

for row in lat_lng_list:
	destination = geolocator.reverse(row[0] + ', '+row[1])
	print destination	

# Creates a bulk file for elastic
# save by `python import_json_suburb.py > file.json` on terminal

import json


with open('boundaries.geojson') as data_file:
    data = json.load(data_file)
    suburbs = data["features"]
    for i, suburb in enumerate(suburbs):
        prop             = suburb["properties"]
        area             = prop["shape_area"]
        name             = prop["division_name"]
        division_code    = prop["division_code"]
        last_update_date = prop["last_update_date"]
        shape_length     = prop["shape_length"]
        geometry         = suburb["geometry"]
        geo_type         = geometry["type"]
        coordinates      = geometry["coordinates"]

        geometry_str     = '"geometry": {' + '"type": "{}", "coordinates": {}'\
                           .format(geo_type, coordinates) + "}"

        json_str = '"area": {}, "name": "{}", "division_code": "{}", "last_update_date": "{}", "shape_length": {}, {}'\
                   .format(area, name, division_code, last_update_date, shape_length, geometry_str)

        print "{ \"create\": {\"_index\" : \"suburb\", \"_type\" : \"suburb\", \"_id\" : \"" + str(i) + "\" }}"
        print "{" + json_str + "}"

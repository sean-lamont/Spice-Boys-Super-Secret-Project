# Creates a bulk file from csv for elasticserach
# save by `python import_csv.py > file.json` on terminal

import csv

file_name = 'suburb-detail.csv'
field_name = 'suburb-detail'

csv_file = open(file_name, "rb")
reader = csv.reader(csv_file)

rownum = 0
# print "{\"data\": ["

for row in reader:

    rownum += 1
    if rownum == 1:
        header = row
        continue

    colnum = 0
    # if rownum >= 3:
    #     print ","
    print "{ \"create\": {\"_index\" : \"" + field_name + "\", \"_type\" : \"" + field_name + "\", \"_id\" : \"" + str(rownum) + "\" }}"
    print "{",

    for i, (key, value) in enumerate(zip(header, row)):
        if key == "Suburb.1":
            continue
        if i > 0:
            print ",",
        if key == "Location":
            key = "location"
            value = value[1:-2]  # remove parenthesis

        try:
            float(value)
            print "\"{}\": {}".format(key.lower(), value),
        except:
            print "\"{}\": \"{}\"".format(key.lower(), value),


    print "}"

    # if rownum > 4:
    #     break


csv_file.close()
# print "]}"

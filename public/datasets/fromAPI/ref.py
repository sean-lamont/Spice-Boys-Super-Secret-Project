import urllib.request, json 
with urllib.request.urlopen("https://maps.googleapis.com/maps/api/directions/json?&origin=City%20Bus%20Station,%20Canberra,%20Australia&destination=Woden%20Bus%20Station,%20Canberra,%20Australia&transit_mode=bus&key=AIzaSyAvswb5DlqTkEcVJN_BTYWosiVroHaamI4") as url:
    data = json.loads(url.read().decode())
    print(data['routes'])
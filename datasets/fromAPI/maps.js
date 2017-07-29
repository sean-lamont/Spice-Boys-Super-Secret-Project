require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);
});


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};



const url = "https://maps.googleapis.com/maps/api/directions/"
const example = "json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key="
const key = "AIzaSyAvswb5DlqTkEcVJN_BTYWosiVroHaamI4"

const origin = "City Bus Station, Canberra, Australia"
const destination = "Woden Bus Station, Canberra, Australia"
const transit_mode = "bus"
var full_url = url + "json?" + "&origin=" + encodeURI(origin) + "&destination=" + encodeURI(destination) + "&transit_mode=" + encodeURI(transit_mode) + "&key=" + encodeURI(key)

console.log (full_url)

var d = jQuery.getJSON(full_url)
console.log(d);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
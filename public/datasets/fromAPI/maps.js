var https = require('https');


const url = "https://maps.googleapis.com/maps/api/directions/"
const example = "json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key="
const key = "AIzaSyAvswb5DlqTkEcVJN_BTYWosiVroHaamI4"

const origin = "City Bus Station, Canberra, Australia"
const destination = "Woden Bus Station, Canberra, Australia"
const transit_mode = "bus"
var full_url = url + "json?" + "&origin=" + encodeURI(origin) + "&destination=" + encodeURI(destination) + "&transit_mode=" + encodeURI(transit_mode) + "&key=" + encodeURI(key)

console.log (full_url)

/*function getCall() {
    //initialize options values, the value of the method can be changed to POST to make https post calls
    var options = {
        host :  'https://maps.googleapis.com/maps/api/directions',
        //port : 443,
        path : '/json?&origin=City%20Bus%20Station,%20Canberra,%20Australia&destination=Woden%20Bus%20Station,%20Canberra,%20Australia&transit_mode=bus&key=AIzaSyAvswb5DlqTkEcVJN_BTYWosiVroHaamI4',
        method : 'GET'
    }
 
    //making the https get call
    var getReq = https.request(options, function(res) {
        console.log("\nstatus code: ", res.statusCode);
        res.on('data', function(data) {
            console.log( JSON.parse(data) );
        });
    });
 
    //end the request
    getReq.end();
    getReq.on('error', function(err){
        console.log("Error: ", err);
    }); 
}

getCall();*/
var result = '';

var req = https.get('https://maps.googleapis.com/maps/api/directions/json?&origin=City%20Bus%20Station,%20Canberra,%20Australia&destination=Woden%20Bus%20Station,%20Canberra,%20Australia&transit_mode=bus&key=AIzaSyAvswb5DlqTkEcVJN_BTYWosiVroHaamI4'
    , (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    //process.stdout.write(d);
    result += d;
  });

}).on('end', () => {
  console.log(result);
})
.on('error', (e) => {
  console.error(e);
});

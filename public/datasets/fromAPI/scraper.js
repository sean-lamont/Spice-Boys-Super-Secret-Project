
function get_stat(){

    // var name = (suburb_name.toLowerCase()).charAt(0).toUpperCase();
    var url_string = "https://maps.googleapis.com/maps/api/directions/json?&origin=City%20Bus%20Station,%20Canberra,%20Australia&destination=Woden%20Bus%20Station,%20Canberra,%20Australia&transit_mode=bus&key=AIzaSyAvswb5DlqTkEcVJN_BTYWosiVroHaamI4";

    var json;

    $.ajax({
        url: url_string,
        dataType: 'text',
        async: false,
        success: function(data){
            json = data;
        }
    });

    // console.log(json);
}

get_stat();
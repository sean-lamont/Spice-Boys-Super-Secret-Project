var CENSUS_URL_BASE     = 'http://stat.data.abs.gov.au/sdmx-json/data/';
var CENSUS_URL_SUFFIX   = '/all?detail=Full&dimensionAtObservation=AllDimensions';

var QUERIES = {
    SUBURB_POPULATION:      1,
    RENT_BY_SUBURB:         2,
    INCOME_BY_HOUSEHOLD:    3,
};

var CENSUS_CODES = {
    1:  "ABS_C16_T01_SA",
    2:  "ABS_C16_T26_SA",
    3:  "ABS_C16_T21_SA"
};

var QUERY_TYPE = {
    1:  '/3.TT.8.SA2.',
    2:  '/TOT.TOT.8.SA2.',
    3:  '/TOT.TOT.8.SA2.'
};

var SUBURBS = SuburbCodes;

var ACT_POPULATION              = 397397;
var ACT_AVG_HOUSEHOLD_INCOME    = 2070;
var ACT_AVG_RENT                = 380;

function get_code(name){
    for (i in SUBURBS){
        if (SUBURBS[i].name == name){
            return SUBURBS[i].code;
        }
    }
    return null;
}

function get_stat(query, suburb_name){

    // var name = (suburb_name.toLowerCase()).charAt(0).toUpperCase();
    var url_string = CENSUS_URL_BASE + CENSUS_CODES[query] + QUERY_TYPE[query] + get_code(suburb_name) + CENSUS_URL_SUFFIX;

    var json;

    $.ajax({
        url: url_string,
        dataType: 'json',
        async: false,
        success: function(data){
            json = data;
        }
    });

    return json.dataSets[0].observations["0:0:0:0:0:0"][0];
}


console.log(get_stat(QUERIES.INCOME_BY_HOUSEHOLD, "Garran"));

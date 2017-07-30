/* Functions to build the queries to interact with the Elastic Stack DB */

/*
 * Takes the json response from wit as input
 * Creates a query for Elastic Stack DB
 * Using the response from the DB, display the information.
 *
 * Possible display methods:
 *	- Location pin
 *	- heatmap (coloured suburb areas)
 *	- Textbox overlay (text info)
 */
import SuburbData from '../data/SuburbCodes.js'
import {getAllSuburbs, getSuburb} from '../helpers/Query.js'

function check_valid_place(place) {

	var p_in = place.toLowerCase();
	var valid_places = SuburbData.data;
	valid_places.push({"name": "Canberra"});

	for (var i = 0; i < valid_places.length; i++) {
		if (p_in === valid_places[i].name.toLowerCase())
			return valid_places[i].name;
	}

	console.log("name: "+ p_in);
	return "";
}

function displayData(data, suburb, fields) {

	console.log(data);
	console.log(fields);
	console.log(data[suburb]);
	console.log(data[suburb][fields]);
	return""+suburb+" "+fields+": "+ data[suburb][fields.toLowerCase()];
}

/* fields form single suburb */
function singleSuburb(suburb, fields, map_callback, print_callback) {
	getSuburb({"match": {"suburb": suburb[0]}}, 
				(data) => {
					if (map_callback !== null){
						map_callback(query2map(data, fields));
					}
					print_callback(displayData(data, suburb[0], fields));	
				});
}
/* fields from multiple suburbs*/
function multiSuburb(suburbs, fields, map_callback) {
	let query = {
	    "filtered" : {
            "filter" : {
                "terms" : { 
                    "suburb" : suburbs
                }
            }
        }
    }
  
  	getAllSuburbs((data) => {
  		if (map_callback !== null){
  			let new_data = {}
  			for (var key in data){
  				if (suburbs.indexOf(key) !== -1){
  					new_data[key] = data[key]
  				}
  			}
			map_callback(query2map(new_data, fields));
		}
  	})


}
/* Aggregate data for canberra overview */
function totalSuburb(fields) {}


var chatbot_response_context;

/* Work out the DB query */
export default function query_transform(wit_obj, map_callback, bot_print) {
	/*
	 * Possible wit object fields:
	 *	- statistics
	 *	- place
	 *	- proximity
	*/
	var stats, suburb, place, prox, valid, graph;
	var data;
	chatbot_response_context = bot_print;

	if (!wit_obj) {
		console.log("Invalid query - Null object");
		return false;
	}

	var ent = wit_obj.entities;

	console.log(wit_obj);
	console.log(ent);


	if (wit_obj.entities.hasOwnProperty('statistic')) {
		stats = wit_obj.entities.statistic;
		console.log("Stats: "+stats);
	}
	if (wit_obj.entities.hasOwnProperty('suburb')) {
		suburb = wit_obj.entities.suburb;
		console.log("Suburb: "+suburb);

	}
	if (wit_obj.entities.hasOwnProperty('proximity')) {
		prox = wit_obj.entities.proximity;
		console.log("Proximity: "+prox);
	}
	if (wit_obj.entities.hasOwnProperty('place')) {
		place = wit_obj.entities.place;
		console.log("Place: "+place);
	}
    if (wit_obj.entities.hasOwnProperty('graph')) {
        graph = true
        console.log("Graph");
    }

/*	if (suburb)
		suburb = check_valid_place(suburb);

	if (suburb === "")
		console.log("Not a valid location");
*/
	/*
	 * Query examples:
	 *	- What is the population of Red Hill?
	 *		==> stat = population, place = Red Hill
	 *	-
	 */
	console.log(JSON.stringify(suburb));
	console.log(JSON.stringify(stats));

	if (suburb != null && (stats != null || place != null)) {

		var sub_len = suburb.length;
		var sub_list = [];
	        var stat_len;
		var stat_list = [];
		var place_len;
		var place_list = [];
		var field_list = [];

		if (place != null) {
			place_len = place.length;
			for (var i = 0; i < place_len; i++)
				place_list[i] = place[i].value;

			field_list = place_list;
		}

		if (stats != null) {
			stat_len = stats.length;
			for (var i = 0; i < stat_len; i++)
				stat_list[i] = stats[i].value;

			field_list += stat_list;
		}

		for (var i = 0; i < sub_len; i++)
			sub_list[i] = suburb[i].value;

		if (sub_len > 1) {
			var str = "Here's the information about "+field_list+" in the following suburbs; "+sub_list;
			bot_print(str);
			data = multiSuburb(sub_list, field_list, map_callback);
			return;
		}
		else {
			if (suburb[0].value === "Canberra") {
				data = totalSuburb(field_list);
				var str = "Here's the information about "+field_list+" in Canberra";
				bot_print(str);
				return;
			}
			else {
				data = singleSuburb(sub_list, field_list, map_callback, bot_print);
				var str = "Here's the information about "+field_list+" in "+suburb[0].value;
				bot_print(str);
				return;
			}
		}

	}

	/* if we have a suburb name but no stats, display all info about suburb */
	else if (suburb != null) {
		var suburb_vals = [];

		for (var i = 0; i < suburb.length; i++)
			suburb_vals[i] = suburb[i].value;

		if (suburb_vals.length > 1) {
			data = multiSuburb(suburb_vals, []);
			var str = "Here is an overview for the following suburbs: "+suburb_vals;
			bot_print(str);
			return;
		}
		else {
			data = singleSuburb(suburb_vals, [], bot_print);
			var str = "Here is an overview for "+suburb_vals;
			bot_print(str);
			return;
		}

	}

	else if (stats != null && graph != null) {
		var data = {};
		const stat_name = stats[0].value.toLowerCase();
		getAllSuburbs(function(data) {
			// console.log(data);
			var allSuburbs = {};
			var max_val = 0;
			for (var key in data) {
				max_val = Math.max(max_val, data[key][stat_name.replace(/ /g, "_")])
			}
			var scaling_val = 10000 /max_val;
			for (var key in data) {
				allSuburbs[key.toUpperCase()] = scaling_val * data[key][stat_name.replace(/ /g, "_")];
				// console.log(key + ": "+ data[key][stat_name.replace(/ /g, "_")]);
			}
			map_callback(allSuburbs);
			//for
			//stats.value
            //map_callback(data);
		});
        return "I will display the " + stat_name + " data.";
	}

	/*  transport, jobs, education, recreation, crime, population, livability */
	console.log("Invalid query - does not match any structures");
	return "I'm sorry, I didn't understand that. You can look for certain statistics or an overview for each suburb. Use 'help' for more information.";
}

// converts query dictionary to map dictionary
function query2map(data, stat_name){
	var allSuburbs = {};
	for (var suburb in data) {
		let field = stat_name.replace(/ /g, "_");
		allSuburbs[suburb.toUpperCase()] = data[suburb][field];
	}
	return allSuburbs;
} 

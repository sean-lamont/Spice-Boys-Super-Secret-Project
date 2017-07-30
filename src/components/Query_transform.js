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

/* fields form single suburb */
function singleSuburb(suburb, fields) {
	getSuburb({"match": {"suburb": suburb[0]}}, 
				(data) => console.log(data));
}
/* fields from multiple suburbs*/
function multiSuburb(suburbs, fields) {}
/* Aggregate data for canberra overview */
function totalSuburb(fields) {}

/* Work out the DB query */
export default function query_transform(wit_obj, map_callback, this_context) {
	/*
	 * Possible wit object fields:
	 *	- statistics
	 *	- place
	 *	- proximity
	*/
	var stats, suburb, place, prox, valid, graph;
	var data;

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
			data = multiSuburb(sub_list, field_list);
			console.log(JSON.stringify(data));
			this_context(data);
			var str = "Here's the information about "+field_list+" in the following suburbs; "+sub_list;
			return {respond : str,
			       	record : data,
			        fields : field_list};
		}
		else {
			if (suburb[0].value === "Canberra") {
				data = totalSuburb(field_list);
				console.log(JSON.stringify(data));
				this_context(data);
				var str = "Here's the information about "+field_list+" in Canberra";
			return {respond : str,
			       	record : data,
			        fields : field_list};
			}
			else {
				data = singleSuburb(sub_list, field_list);
				console.log(JSON.stringify(data));
				this_context(data);
				var str = "Here's the information about "+field_list+" in "+suburb[0].value;
			return {respond : str,
			       	record : data,
			        fields : field_list};
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
			console.log(JSON.stringify(data));
			this_context(data);
			var str = "Here is an overview for the following suburbs: "+suburb_vals;
			return {respond : str,
				record : multiSuburb(suburb_vals, []),
				fields : null};

		}
		else {
			data = singleSuburb(suburb_vals, []);
			var str = "Here is an overview for "+suburb_vals;
			console.log(JSON.stringify(data));
			this_context(data);
			return {respond : str,
				record : singleSuburb(suburb_vals, []),
				fields : null};
		}
		
	}

	else if (stats != null && graph != null) {
		var data = {};
		const stat_name = stats[0].value.toLowerCase();
		getAllSuburbs(function(data) {
			console.log(data);
			var allSuburbs = {};
			for (var key in data) {
				allSuburbs[key.toUpperCase()] = data[key][stat_name.replace(/ /g, "_")];
				console.log(key + ": "+ data[key][stat_name.replace(/ /g, "_")]);
			}
			map_callback(allSuburbs);
			//for
			//stats.value
            //map_callback(data);
		});
	var str = "I will display the " + stat_name + " data.";
	return {respond : str,
		record : null,
		fields : null};
	}


	/*  transport, jobs, education, recreation, crime, population, livability */
	console.log("Invalid query - does not match any structures");
	return {respond : "I'm sorry, I didn't understand that. You can look for certain statistics or an overview for each suburb. Use 'help' for more information."};
}

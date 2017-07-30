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


/* Work out the DB query */
export default function query_transform(wit_obj) {
	/*
	 * Possible wit object fields:
	 *	- statistics
	 *	- place
	 *	- proximity
	*/
	var stats, suburb, place, prox, valid;
	if (!wit_obj) {
		console.log("Invalid query - Null object");	
		return false;
	}

	var ent = wit_obj.entities;

	console.log(wit_obj);
	console.log(ent);


	if (wit_obj.entities.hasOwnProperty('statistic')) {
		stats = wit_obj.entities.statistic[0].value;
		console.log("Stats: "+stats);
	
	}
	if (wit_obj.entities.hasOwnProperty('suburb')) {
		suburb = wit_obj.entities.suburb[0].value;
		console.log("Suburb: "+suburb);
	
	}
	if (wit_obj.entities.hasOwnProperty('proximity')) {
		prox = wit_obj.entities.proximity[0].value;
		console.log("Proximity: "+prox);	
	}
	if (wit_obj.entities.hasOwnProperty('place')) {
		place = wit_obj.entities.place[0].value;
		console.log("Place: "+place);
	}

	if (suburb)
		suburb = check_valid_place(suburb);

	if (suburb === "")
		console.log("Not a valid location");

	/*
	 * Query examples:
	 *	- What is the population of Red Hill?
	 *		==> stat = population, place = Red Hill
	 *	- 
	 */	   

	if (suburb === "Canberra" && stats === "population") {
		/* Special case, show heatmap of population distrubution */
		console.log("Finding population in Canberra");
		return;
	
	}
	else if (suburb !== "" && stats === "population") {	
		/* Query = find population of $place */
		
		console.log("Finding population in "+ place);
		return;		
	}





	console.log("Invalid query - does not match any structures");
	return false;
}

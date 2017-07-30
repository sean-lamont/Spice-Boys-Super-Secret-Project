import elasticsearch from 'elasticsearch'


let client = new elasticsearch.Client({
  host: [
    {
      host: 'c9eb3dcc4c763654ee55087b8c4cd9d2.ap-southeast-2.aws.found.io',
      auth: 'elastic:bxwsqK27L3524M60bSupAbeI',
      protocol: 'https',
      port: 9243
    }
  ]
})

var error_handler = function (err) {
  console.trace(err.message);
}


export default function singleSub(suburb) {

  let printer = function(result) {
    let objs = result["hits"]["hits"];
    console.log("Query result", objs);
};

  console.log(suburb.toLowerCase());
  getSuburb({"match": {"suburb": suburb.toLowerCase()}}, printer);
  console.log("Ran singleSub function");

}

function example(){
  let printer = function(result) {
    let objs = result["hits"]["hits"]
    console.log("Query result", objs);
    // objs[<index>]["_source"] to access individual data
 //   objs["_source"]["livability"]
  }

  // get red hill information (case insensitive)
  getSuburb({"match": {"suburb": "red hill"}}, printer);

  // multiple terms
  /*{"query" : {
        "filtered" : {
            "filter" : {
                "terms" : { 
                    "price" : [20, 30]
                }
            }
        }
    }
  }*/

  // get 50 livability data in descending order
  getSuburbSorted({"match_all": {}}, 
    [{"livability": {
      "order": "asc"
      }
    }], printer, 50)
}


//example();
//console.log("ran example()");

function getAll(success_handler){
  getSuburb({"match_all": {}}, success_handler, 300);
}



/*Returns suburn data. See below for constraints*/
function getSuburb(constraint, success_handler, count = 10){

  let converter = function(result) {
    let objects = result["hits"]["hits"]
    var obj_dict = {}
    
    objects.forEach(function(object) {
      let values = object["_source"];
      obj_dict[values["suburb"]] = values;
    });
    success_handler(obj_dict);
  }

  getSuburbSorted(constraint, [], converter, count);
}

/** constraint example
* {"match": { "id": 2, ... }}
* {"match_all": {}}
*
* sort: array of sort terms
* { <term> : { "order": <"asc"|"desc">}}
*
* sort_terms example
* [ { "id" : {"order" : "asc"}}, ... ]
* 
*/

function getSuburbSorted(constraints, sort_terms, success_handler, count = 10){
  let data_name = 'suburb-detail'
  let query = {
    "size" : count,
    "sort" : sort_terms,
    "query": constraints
  }
  performQuery(data_name, query, success_handler);
}



function performQuery(data_name, query, success_handler) {


  client.search({
    index: data_name,
    type: data_name,
    body: query
  }).then( success_handler, error_handler);
}


/** database fields
"sport_grounds": {
  "type": "long"
},
"fitness_sites": {
  "type": "long"
},
"recreation&fitness": {
  "type": "float"
},
"education": {
  "type": "float"
},
"closest_hospital": {
  "type": "text",
  "fields": {
    "keyword": {
      "ignore_above": 256,
      "type": "keyword"
    }
  }
},
"time_to_hospital": {
  "type": "float"
},
"crimes": {
  "type": "long"
},
"skate_parks": {
  "type": "long"
},
"transport": {
  "type": "float"
},
"closest_tc": {
  "type": "text",
  "fields": {
    "keyword": {
      "ignore_above": 256,
      "type": "keyword"
    }
  }
},
"bus_to_tc": {
  "type": "float"
},
"population": {
  "type": "long"
},
"basketball_courts": {
  "type": "long"
},
"schools": {
  "type": "long"
},
"crimespp": {
  "type": "float"
},
"livability": {
  "type": "float"
},
"unemployment": {
  "type": "float"
},
"suburb": {
  "type": "text",
  "fields": {
    "keyword": {
      "ignore_above": 256,
      "type": "keyword"
    }
  }
},
"playgrounds": {
  "type": "long"
},
"bus_stops": {
  "type": "long"
}
*/

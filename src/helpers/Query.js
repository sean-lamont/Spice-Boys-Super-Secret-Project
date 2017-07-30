import $ from 'jquery'; 
import elasticsearch from 'elasticsearch'

let client = new elasticsearch.Client({
  host: [
    {
      host: 'c9eb3dcc4c763654ee55087b8c4cd9d2.ap-southeast-2.aws.found.io',
      auth: 'elastic:bxwsqK27L3524M60bSupAbeI',
      protocol: 'https',
      port: 9243
    }
  ],
  log: 'trace'
})

var error_handler = function (err) {
  console.trace(err.message);
}


/*Returns suburn data. See below for constraints*/
function getSuburb(constraint, success_handler, count = 10){
  getSuburbSorted(constraint, [], count);
}

/** constraint example
* { "id": 2, ... }
* 
* sort: array of sort terms
* { <term> : { "order": <"asc"|"desc">}}
*
* sort_terms example
* [ { "id" : {"order" : "asc"}}, ... ]
* 
*/

function getSuburbSorted(constraint, sort_terms, success_handler, count = 10){
  let data_name = 'suburb-detail'
  let query = {
    "size" : count,
    "sort" : sort_terms,
    "query": {
      match: constraint
    }
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

var request = require('request');

// A function to simplify the database requests
function db_request(path, method, json, callback)
{
    var options = {
	url: "http://localhost:5555/" + path + "/",
	method: method,
	headers: {
	    'User-Agent':       'Super Agent/0.0.1',
	    'Content-Type':     'application/json; charset=utf-8'
	},
	json: json
    }
    request(options, (error, response, body) => {
	if(error) {
	    console.log(error);
	}
	else {
	    console.log("Status: ", response.statusCode);
	    callback(body);
	}
    });
}

/*
  Example calls:

  Creating a user:
  
  db_request("create_user", "POST", {    
  'username': 'jondoe',
  'fullname': 'Jon Doe',
  "age" : 21,
  "gender" : "male",
  "profilepic" : "",
  "city" : "Berlin",
  "languages" : [ "english", "german", "japanese"],
  "phone" : "",    
  "email" : "jonny@doe.com"
  }, console.log);

  
  Creating an event:
  db_request("create_event", "POST", {
  "hostname" : "jondoe",
  "date" : new Date("2017-05-07T01:26:20.201Z"),
  "time_from" : new Date("2017-05-06T10:00:57.240Z"),
  "time_until" : new Date("2017-05-06T11:50:57.240Z"),
  "description" : "awesome vegan food with costumes",
  "isCookingShared" : true,
  "max_guest" : 10
  }, console.log);


  Get all events:
  db_request("events", "GET", {}, console.log);

  
  Get event with id:
  db_request("events/<eventId>, "GET", {}, console.log);


  Get user data
  db_request("user/<username>", "GET", {}, console.log);


  Register user for event:
  db_request("attend/<eventID>/<username>", "POST", {}, console.log);


  Unregister user from event:
  db_request("cancel/<eventID>/<username>", "POST", {}, console.log);
*/




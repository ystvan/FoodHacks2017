var express = require("express"),
    http = require("http"),
    app = express(),
    server = http.createServer(app),
    port = 5555,
    assert = require("assert"),
    parser = require("body-parser"),
    mongoClient = require("mongodb").MongoClient,
    ObjectId = require('mongodb').ObjectID;

let db_url = "mongodb://localhost:27017/foodhack";

function database_request(dbCB)
{
    mongoClient.connect(db_url, function(err, db) {
	assert.equal(null, err);
	dbCB(db);
    });
}

function database_get(db, collectionName, findJson, getCB)
{
    var collection = db.collection(collectionName);
    collection.find(findJson).toArray(function(err, data) {
	assert.equal(err, null);
	getCB(data);
    });
}

function database_insert(db, collectionName, json)
{
    var collection = db.collection(collectionName);
    collection.insertMany([json], (err, res) => {
	assert.equal(err, null);
	assert.equal(1, res.result.n);
	assert.equal(1, res.ops.length);
    });
}

function database_update(db, collectionName, jsonFind, jsonUpdate)
{
    var collection = db.collection(collectionName);
    collection.updateOne(jsonFind, jsonUpdate, (err, res) => {
	console.log(err);
    });
}

function create_user(user, statusCB)
{
    database_request((db) => {
	database_get(db, "users", {$or: [{"username":user.username},{"email":user.email}]}, (data) => {
	    if(data.length != 0)
		statusCB(false, "Username or email already exists");
	    else
	    {
		database_insert(db, "users", user);
		statusCB(true, "OK");
	    }
	    db.close();
	})
    });
    console.log(user.username);
}

function create_event(event, statusCB)
{
    database_request((db) => {
	// Check if host exists
	database_get(db, "users", {"username":event.hostname}, (data) => {
	    if(data.length == 0) {
		statusCB(false, "Host does not exist");
		db.close();
	    } else {
		database_insert(db, "events", event);
		statusCB(true, "OK");
		db.close();
	    }
	})
    });
}

function delete_event(event, statusCB)
{
    
}


// Express methods
server.listen(port);

app.use(parser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/"));
app.use(parser.json());

app.get("/", (req, res) => {
    res.send("Hello Foodhacks");
});

app.get("/events", (req, res) => {
    database_request((db) => {
	database_get(db, "events", {}, (data) => {
	    res.json(data);
	    db.close();
	})
    });
});

app.get("/events/:eventId", (req, res) => {
    database_request((db) => {
	database_get(db, "events", {_id:new ObjectId(req.params.eventId)}, (data) => {
	    if(data.length == 0) {
		res.status(400);
		res.json({});
	    } else {
		res.json(data[0]);
	    }
	    db.close();
	})
    });
});

app.get("/search_events", (req, res) => {
});

app.get("/user/:username", (req, res) => {
    database_request((db) => {
	database_get(db, "users", {username:req.params.username}, (data) => {
	    if(data.length == 0) {
		res.status(400);
		res.json({});
	    } else {
		res.json(data[0]);
	    }
	    db.close();
	})
    });
});

app.post("/attend/:eventId/:username", (req, res) => {
    let sendResponse = (status, message) => { res.json({"status": status, "message": message}) };
    database_request((db) => {
	database_get(db, "events", {_id: new ObjectId(req.params.eventId)}, (data) => {
	    if (data.length === 0){
		sendResponse(false, "Event not found");
		db.close();
	    } else {
		let e = data[0];
		if(e.guests.length === e.max_guest) {
		    sendResponse(false, "Event is full");
		    db.close();
		} else {
		    database_get(db, "users", {username: req.params.username}, (data) => {
			if(data.length === 0) {
			    sendResponse(false, "User not found");
			    db.close();
			} else if(e.guests.includes(req.params.username)) {
			    sendResponse(false, "User already guest");
			    db.close();
			} else {
			    // Everything's fine, update db
			    console.log("Blub");
			    e.guests.push(req.params.username);
			    console.log(e.guests);
			    database_update(db, "events", {_id: new ObjectId(req.params.eventId)}, { $set: {guests:e.guests}});
			    sendResponse(true, "OK");
			    db.close();
			}
		    });
		}
	    }
	});
    });
});

app.post("/cancel/:eventId/:username", (req, res) => {
    let sendResponse = (status, message) => { res.json({"status": status, "message": message}) };
    database_request((db) => {
	database_get(db, "events", {_id: new ObjectId(req.params.eventId)}, (data) => {
	    if (data.length === 0){
		sendResponse(false, "Event not found");
		db.close();
	    } else {
		let e = data[0];
		if(e.guests.length === e.max_guest) {
		    sendResponse(false, "Event is full");
		    db.close();
		} else {
		    database_get(db, "users", {username: req.params.username}, (data) => {
			if(data.length === 0) {
			    sendResponse(false, "User not found");
			    db.close();
			} else if(!e.guests.includes(req.params.username)) {
			    sendResponse(false, "User isn't a guest");
			    db.close();
			} else {
			    // Everything's fine, update db
			    e.guests.splice(e.guests.indexOf(req.params.username), 1);
			    
			    console.log(e.guests);
			    database_update(db, "events", {_id: new ObjectId(req.params.eventId)}, { $set: {guests:e.guests}});
			    sendResponse(true, "OK");
			    db.close();
			}
		    });
		}
	    }
	});
    });
});

app.post("/create_user", (req, res) => { 
    create_user(req.body, (status, msg) => {
	res.json({"status": status, "message": msg});
    });
});

app.post("/create_event", (req, res) => {
    req.body.guests = [];
    create_event(req.body, (status, msg) => {
	res.json({"status": status, "message": msg});
    });
});


console.log("Running on localhost:" + port);

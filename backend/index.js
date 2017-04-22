var express = require("express"),
    http = require("http"),
    app = express(),
    server = http.createServer(app),
    port = 5555,
    assert = require("assert"),
    parser = require("body-parser"),
    mongoClient = require("mongodb").MongoClient;

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
	database_get(db, "users", {}, (data) => {
	    res.json(data);
	    db.close();
	})
    });
});

app.get("/events/:eventId", (req, res) => {
    console.log(req.params.eventId);
});

app.post("/create_user", (req, res) => { 
    create_user(req.body, (status, msg) => {
	res.json({"status": status, "message": msg});
    });
});

app.post("/create_event", (req, res) => {
    
});


console.log("Running on localhost:" + port);

var express = require("express"),
    http = require("http"),
    app = express(),
    server = http.createServer(app),
    port = 5555,
    assert = require("assert"),
    mongoClient = require("mongodb").MongoClient;

let db_url = "mongodb://localhost:27017/foodhacks";



// Express methods
server.listen(port);
app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
    res.send("Hello Foodhacks");
});

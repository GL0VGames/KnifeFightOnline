var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	config = require(__dirname + "/config.js"),
	DeepstreamServer = require("deepstream.io"),
	server = new DeepstreamServer();

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());

app.listen(config.express.port);
console.log("Dial " + config.express.port + " for the website.");

server.set("host", config.deepstream.host);
server.set("port", config.deepstream.port);
server.start();
console.log("Spin up http://" + config.deepstream.host + config.deepstream.port + " for a server connection.");

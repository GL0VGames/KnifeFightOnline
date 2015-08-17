var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	config = require(__dirname + "/config.js");

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());

app.listen(config.express.port);
console.log("Dial " + config.express.port + " for more details");

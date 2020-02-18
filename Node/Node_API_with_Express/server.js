var express = require("express");
var http = require("http");
var app = express();

require('./app.js')(app);
http.createServer(app).listen(3000);
var express = require('express');
var http = require('http');

var hostname = 'localhost';
var port = 8080;

var app = express();

app.use(function (req, res, next) {
    res.writeHead(200, {
        'Content-Type': "text/html"
    });
    res.end("<h1>Response Body</h1>");
});

app.listen(port, hostname, function () {
    console.log("Server is running at http://" + hostname + "/" + port);
});
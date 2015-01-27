// Adapted by Simone Basso from the node.js documentation

/*jslint node: true */

"use strict";

var http = require("http");

http.createServer(function (request, response) {
    console.info("Request Method: %s", request.method);
    console.info("Request URI: %s", request.url);
    for (var key in request.headers) {
        console.info("Header: %s => %s", key, request.headers[key]);
    }

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
}).listen(51337, "127.0.0.1", function(){
	console.info('Server running at http://127.0.0.1:51337/');     
});

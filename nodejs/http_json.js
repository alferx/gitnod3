// Adapted by Giuseppe Futia from the node.js documentation

/*jslint node: true */

"use strict";

var http = require('http');

http.createServer(function (req, res) {
    
    var json,
        body = "";
	
    req.setEncoding('utf8');

    req.on('data', function (data) {
        body += data;
        //console.log('data added');
    });
    
    req.on('end', function () {
        //console.log('req end');
        
        try {
            json = JSON.parse(body);
        } catch (e) {
            console.info('Content-Type is not application/json');
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Error: Invalid Content-Type\n');
            return;
        }
        
        console.info("Sending data");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(body);
    });
}).listen(54000);

console.info('Server running at http://localhost:54000/');

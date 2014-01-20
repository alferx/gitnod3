// Adapted by Giuseppe Futia from the node.js documentation

/*jslint node: true */

"use strict";

require('http').createServer(function (req, res) {

    var json;
    req.setEncoding('utf8'); //If you don't set and encoding you'll get Buffer object
    req.on('data', function (data) {

        try {
            json = JSON.parse(data);
        } catch (e) {
            console.info('Content-Type is not application/json');
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Error: Invalid Content-Type\n');
        }

        if (json != null) {
            console.info("Send ", data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        }
    });
}).listen(54000);

console.info('Server running at http://localhost:54000/');

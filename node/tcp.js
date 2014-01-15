// Adapted by Giuseppe Futia from the node.js documentation

/*jslint node: true */

"use strict";

var server = require('net').createServer();

var port = 4001;

server.on('listening', function () {
    console.info('Server is listening on port', port);
});

server.on('connection', function (socket) {
    console.info('Server has a new connection');
    socket.end();
    server.close();
});

server.on('close', function () {
    console.info('Server in now closed');
});

server.on('error', function (err) {
    console.info('Error occurred:', err.message);
});

server.listen(port);

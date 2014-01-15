// Adapted by Giuseppe Futia from the node.js documentation

/*
 * Running node shares port 8000 between the workers, do
 * the following to see all the messages they exchange:
 *
 *   NODE_DEBUG=cluster node cluster.js
 *
 * NOTE: It does not work on Windows!
 */

/*jslint node: true */

"use strict";

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });

} else {
    // Workers can share any TCP connection
    // In this case it is a HTTP server
    http.createServer(function (req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);
}

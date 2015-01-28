// Adapted by Giuseppe Futia from the node.js documentation

/*jslint node: true */

"use strict";

var http = require('http');

var data = '{"a": 1, "b": 2, "c": 3}';

var options = {
    host: 'localhost',
    port: 4000,
    path: '/',
    method: 'POST',
    headers: {
        'Accept' : 'text/json'
    }
};

var req = http.request(options, function (res) {
    console.info('STATUS:', res.statusCode);
    console.info('HEADERS:', res.headers);
    res.setEncoding('utf8'); 
    res.on('data', function (chunk) {
        console.info('BODY: ', chunk);
    });
});

req.write(data);
req.end();

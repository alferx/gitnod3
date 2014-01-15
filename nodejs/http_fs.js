// Adapted by Giuseppe Futia from the node.js documentation

/*jslint node: true */

"use strict";

var path = require('path');
var fs = require('fs');

require('http').createServer(function (req, res) {
    var file = path.normalize('./http_files/' + req.url);
    console.info('Trying to serve file ' + file + '...');

    function reportError(err) {
        console.error(err);
        res.writeHead(500);
        res.end('Internal Server Error');
    }

    path.exists(file, function (exists) {
        if (exists) {
            fs.stat(file, function (err, stat) {

                if (err) {
                    return reportError(err);
                }

                if (stat.isDirectory()) {
                    res.writeHead(403);
                    res.end('Forbidden');
                } else {
                    var rs = fs.createReadStream(file);

                    rs.on('error', reportError);

                    res.writeHead(200);

                    rs.pipe(res);
                }
            });
        } else {
            res.writeHead('404');
            res.end("File not found");
        }
    });
}).listen(8000);

console.info('Server running at http://localhost:8000/');

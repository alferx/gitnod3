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
        res.end('Internal Server Error\n');
    }

    fs.exists(file, function (exists) {

        if (exists) {
            fs.lstat(file, function (err, stat) {

                if (err) {
                    return reportError(err);
                }
				
                if (stat.isFile()) {
                    var rs = fs.createReadStream(file);
                    rs.on('error', reportError);
                    res.writeHead(200);
                    rs.pipe(res);
                } else {
                    res.writeHead(403);
                    res.end('Forbidden\n');
                }

            });
        } else {
            res.writeHead('404');
            res.end("File not found\n");
        }
    });
}).listen(8000, function () {
    console.info('Server running on port 8000');
});


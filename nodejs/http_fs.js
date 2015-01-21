// Adapted by Giuseppe Futia from the node.js documentation

/*jslint node: true */

"use strict";

var path = require('path');
var fs = require('fs');

require('http').createServer(function (req, res) {
    var file = path.normalize('./http_files/' + req.url);
    console.info('Trying to serve file ' + file + '...');

    //
    // FIXME: here we should guarantee that the path is below
    // the document root (http_files) and that it is not a
    // symbolic link (or, if it is a symbolic link, that it
    // points inside the document root).
    //

    function reportError(err) {
        console.error(err);
        res.writeHead(500);
        res.end('Internal Server Error');
    }

    fs.exists(file, function (exists) {

        if (exists) {
            fs.lstat(file, function (err, stat) {                           

                if (err) {
                    return reportError(err);
                }

                if (stat.isDirectory() || stat.isSymbolicLink()) {          
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


//
// TODO: refactor the code so that this log message is printed
// only when we are actually listening; moreover, note that the
// server is invoked to listen to *:8000 not 127.0.0.1:8000.
//
console.info('Server running at http://localhost:8000/');

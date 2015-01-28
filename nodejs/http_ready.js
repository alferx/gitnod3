// Adapted by Giuseppe Futia from the node.js documentation
// Working copy by Futia-Ferrarin (started @ 2014-01-20)

/*jslint node: true */

"use strict";

var path = require("path");
var fs = require("fs");

var allFiles = [];

function server_response(req, res) {
    var filepath = path.normalize('./' + req.url);
    console.info('Trying to serve filepath ' + filepath + '...');

    function reportError(err) {
        console.error(err);
        res.writeHead(500);
        res.end('Internal Server Error');
    }

    path.exists(filepath, function (exists) {
        
        if (exists) {
            fs.lstat(filepath, function (err, stat) {

                if (err) {
                    return reportError(err);
                }
                
                if (stat.isSymbolicLink()) {
                    res.writeHead(403);
                    res.end('Forbidden');
                }

                if (stat.isDirectory()) {
                    allFiles = [];
                    res.writeHead(200, 
                        { 'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify(d3json('./', getFiles(filepath)), 
                        null, 4));
                } else {
                    var rs = fs.createReadStream(filepath);
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
}

// Returns array of files having { name = xxx; size = yyy }
// Uses global allFiles var
function getFiles(dir) {
    var files = fs.readdirSync(dir);
	
    for (var i in files) {
        
        if(!files.hasOwnProperty(i)) continue;
	    var name = dir + '/' + files[i];

		if(fs.statSync(name).isDirectory()) {
            getFiles(name);
        } else {
            var statFile = {};
            statFile.name = path.normalize(name);
            statFile.size = fs.statSync(name).size;
            allFiles.push(statFile);
        }
    }
    return allFiles;
}

// Returns json formatted data
// files = array of file paths
function d3json(root_dir, files) {
    var json = { 'name':root_dir, 'children':[] };

    for(var i in files) {
        var directories = files[i]['name'].split(path.sep);
        // FIXME: files can have extensions but we assume it not
        if(path.extname(directories[0]) != '') {
            json.children.push(
                { 'name':files[i]['name'], 'size':files[i]['size'] }
            );
        }
    }
    return json;
}


//
// Setup server
//
var server = require('http').createServer(server_response);

var port = 64001;

server.on('listening', function () {
    console.info('Server is listening on port', port);
});

server.on('connection', function (socket) {
    console.info('Server has a new connection');
    //socket.end();
    //server.close();
});

server.on('close', function () {
    console.info('Server is now closed');
});

server.on('error', function (err) {
    console.info('Error occurred:', err.message);
});

server.listen(port);

//
// Setup http server
//
function serverhttp_response(req, res) {
    console.info('Trying to serve request ' + req.url + '...');
	
    fs.readFile('./index.html', function(err, file) {
		
        if(err) {
            res.writeHead(500, {'Content-Type':'text/plain'});
            res.end('Internal error\n');
        } else {
            res.writeHead(200, {'Content-Type':'text/html' });
            res.write(file);
            res.end();
        }
    });
}

var serverhttp = require('http').createServer(serverhttp_response);

var porthttp = 64080;

serverhttp.on('listening', function () {
    console.info('Server is listening on port', porthttp);
});

serverhttp.listen(porthttp);

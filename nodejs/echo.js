// Adapted by Simone Basso from the node.js documentation

/*jslint node: true */

"use strict";

var getopt = require("getopt");
var net = require("net");

var server = net.createServer(function (socket) {
    var remoteAddress = socket.remoteAddress,
        remotePort = socket.remotePort;
    console.info("client connected: %s:%s", remoteAddress, remotePort);
    socket.on("close", function () {
        console.info("connection lost: %s:%s", remoteAddress, remotePort);
    });
    socket.on("data", function (data) {
        socket.pause();
        socket.end(data);                                                               
    });
    socket.on("drain", function () {
        socket.resume();
    });
    // Simpler and more efficient alternative:
    //socket.pipe(socket);
});

var listenAddress = null;
var listenPort = 1337;
var unixSocketPath = null;

try {
    getopt.setopt("A:p:U:");
} catch (error) {
    console.error("usage: nodejs echo.js [-A address] [-p port] [-U socket]");
    process.exit(1);
}

getopt.getopt(function (name, value) {
    switch (name) {
        case "A":
            listenAddress = value[0];                
            break;
        case "p":
            listenPort = value[0];
            break;
        case "U":
            unixSocketPath = value[0];
            break;
    }
});

if (unixSocketPath !== null && listenAddress !== null) {        
    
        console.info("please enter an address OR a socket");
        process.exit();
}

if (unixSocketPath === null) {                          
    
     if (listenAddress === null) {                                                           
        listenAddress = "0.0.0.0";
	}
    
	server.listen(listenPort, listenAddress, function () {
    	console.info("server listening at %s:%s", listenAddress, listenPort);               
	});
} else {
    server.listen(unixSocketPath, function () {
        console.info("listening at %s", unixSocketPath);
    });
}

process.on("SIGINT", function () {
    console.info("Interrupt");
    process.exit(0);
});

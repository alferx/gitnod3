// Adapted by Simone Basso from the node.js documentation

/*jslint node: true */

"use strict";

var getopt = require("getopt");
var net = require("net");
var crypto = require("crypto");

var connectAddress = null;
var connectPort = 1337;
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
        connectAddress = value[0];
        break;
    case "p":
        connectPort = value[0];
        break;
    case "U":
        unixSocketPath = value[0];
        break;
    }
});


if (unixSocketPath !== null && (listenAddress !== null) {                   //not sure this is right here     
    
    console.info("please enter an address OR a socket");
    process.exit();
}

if (unixSocketPath === null) {                                                      
    var client = net.connect(connectPort, connectAddress);
} else {
    var client = net.connect(unixSocketPath);
}

var data = crypto.randomBytes(131072);
var remoteAddress = null;
var remotePort = null;

client.on("connect", function () {
    remoteAddress = client.remoteAddress;
    remotePort = client.remotePort;
    console.info("client connected to %s:%s", remoteAddress, remotePort);
    client.write(data);
});

client.on("drain", function () {
    client.write(data);
});

client.on("error", function (error) {
    console.warn("connection %s:%s (%s)", remoteAddress, remotePort, error);
});

client.on("close", function () {
    console.info("connection lost: %s:%s", remoteAddress, remotePort);
});

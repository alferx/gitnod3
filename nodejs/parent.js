// Adapted by Simone Basso from the node.js documentation

/*jslint node: true */

"use strict";

var child_process = require("child_process");
var child = child_process.fork("child.js");

child.send({ "numeric": 1 });

child.on("message", function (message, handle) {
    console.log("parent: %j", message);
    if (message.numeric >= 5) {
        child.send({ "numeric": 0 });
    } else {
        child.send(message);
    }
});

child.on("exit", function () {
    console.log("The process terminated");
});

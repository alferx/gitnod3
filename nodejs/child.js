// Adapted by Simone Basso from the node.js documentation

/*jslint node: true */

"use strict";

process.on("message", function (message, handle) {
    console.log("child: %j", message);
    if (message.numeric !== 0) {
        message.numeric = message.numeric + 1;
        process.send(message);
    } else {
        process.exit(0);
    }
});

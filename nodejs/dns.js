// Adapted by Simone Basso from the node.js documentation

/*jslint node: true */

"use strict";

var dns = require("dns");

dns.resolve("www.google.com", "A", function (error, addresses) {
    if (error) {
        console.error("%s", error);
        process.exit(1);
    }
    addresses.forEach(function (address) {
        console.log("%s", address);
    });
});

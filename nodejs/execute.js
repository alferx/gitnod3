// Adapted by Simone Basso from the node.js documentation

/*jslint node: true */

"use strict";

var child_process = require("child_process");
var fs = require("fs");

fs.lstat(".git", function (error, stats) {

    if (error !== null && error.code === "ENOENT") {
        child_process.exec("git init", function (error, stdout, stderr) {
            if (error) {
                console.log("git init: %s", error);
                process.exit(1);
            }
            console.log("%s", stdout.trim());
        });
        process.exit(0);

    } else if (error !== null) {
        console.warn("unexpected error: %s", error);
        process.exit(1);
    }

    child_process.exec("git status", function (error, stdout, stderr) {
        if (error) {
            console.log("git status: %s", error);
            process.exit(1);
        }
        console.log("%s", stdout.trim());
    });

});

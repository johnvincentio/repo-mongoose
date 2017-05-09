
/* jshint node: true */
/* jshint esnext: true */

/*
npm install mongoose --save
*/

'use strict';

var mongoose = require("mongoose");
var Bugs = require("./bugs");

mongoose.connect("mongodb://localhost:27017/test");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection succeeded.");
});

var Bug = mongoose.model("Bug", Bugs.bugSchema);

module.exports.Bug = Bug;

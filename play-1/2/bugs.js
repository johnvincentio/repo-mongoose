
/* jshint node: true */
/* jshint esnext: true */

/*
npm install mongoose --save
*/

'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bugSchema = new Schema({
    bugName: String,
    bugColour: String,
    Genus: String
});

module.exports.bugSchema = bugSchema;

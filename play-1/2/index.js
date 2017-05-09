
/* jshint node: true */
/* jshint esnext: true */

/*
npm install mongoose --save
*/

/*
mongo
use test
db.bugs.find( { bugName: “Scruffy” } );
*/

'use strict';

var Models = require("./models");

var Bee = new Models.Bug({
    bugName: "Scruffy",
    bugColour: "Orange",
    Genus: "Bombus"
});

Bee.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});

/* jshint node: true */
/* jshint esnext: true */

/*
npm install mongoose --save
*/

'use strict';

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("stage 1");
    setTimeout(function() {
        mycallback1();
    }, 3000);
//    mycallback1();
    console.log("stage 2");
    setTimeout(function() {
        mycallback2();
    }, 1000);
//    mycallback2();
    console.log("stage 3");
});

var mycallback1 = function() {
    console.log(">>> mycallback1");
    console.log("<<< mycallback1");
};

var mycallback2 = function() {
    console.log(">>> mycallback2");
    console.log("<<< mycallback2");
};

/*
var req1 = new Promise(function(resolve, reject) {
    // A mock async action using setTimeout
    setTimeout(function() {
        resolve('First!');
    }, 4000);
});
var req2 = new Promise(function(resolve, reject) {
    // A mock async action using setTimeout
    setTimeout(function() {
        resolve('Second!');
    }, 3000);
});
Promise.all([req1, req2]).then(function(results) {
    console.log('Then: ', results);
}).catch(function(err) {
    console.log('Catch: ', err);
});
*/

/*
    var kittySchema = mongoose.Schema({
        name: String
    });

    var Kitten = mongoose.model('Kitten', kittySchema);
    var silence = new Kitten({
        name: 'Silence'
    });
    console.log(silence.name);

    kittySchema.methods.speak = function() {
        var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
        console.log(greeting);
    };

    var fluffy = new Kitten({
        name: 'fluffy'
    });
    fluffy.speak();
*/


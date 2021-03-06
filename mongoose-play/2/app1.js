
/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let database = 'mongodb://localhost/blogDB';
mongoose.connect(database);

let dataAccess = new (require('./dataAccess'))();

mongoose.connection.once('open', function () {
    console.info('connected to database blogDB');
});

var req1 = new Promise(function(resolve, reject) {
    const jv = dataAccess.getAll();
    console.log("getAll; "+JSON.stringify(jv));
    resolve(jv);
});

var req2 = new Promise(function(resolve, reject) {
    const jv = dataAccess.getAuthor();
    console.log("getAuthor; "+JSON.stringify(jv));
    resolve(jv);
});

Promise.all([req1, req2]).then(function(results) {
    console.log('Then: ', results);
}).catch(function(err) {
    console.log('Catch: ', err);
});

//function test() {
//    const jv = dataAccess.getAll();
//    console.log("getAll; "+JSON.stringify(jv));
//
//    const jv1 = dataAccess.getAuthor();
//    console.log("getAuthor; "+JSON.stringify(jv1));
//}

setTimeout(function() {
    mongoose.disconnect();
}, 3000);

// If the connection throws an error
mongoose.connection.on("error", function(err) {
    console.error('Failed to connect to DB ' + database + ' on startup ', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection to DB :' + database + ' disconnected');
});

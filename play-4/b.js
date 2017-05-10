/* jshint node: true */
/* jshint esnext: true */

/*
npm install mongoose --save
*/

'use strict';

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/junk1");
mongoose.Promise = global.Promise;

var personSchema = mongoose.Schema({
    _id: Number,
    name: String,
    age: Number,
    stories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    }]
});

var storySchema = mongoose.Schema({
    _creator: {
        type: Number,
        ref: 'Person'
    },
    title: String,
    fans: [{
        type: Number,
        ref: 'Person'
    }]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
    console.log("Connection succeeded.");
    Story.remove().exec()
    .then(() => {
        console.log(`Deleting Story records`);
        Person.remove().exec()
        .then(() => {
            console.log(`Deleting Person records`);
            test2();
        });
    })
    .catch(err => {
        console.error(err);
    });
});

var people = [
{_id: 0, name: "a", age: 1}, {_id: 1, name: "b", age: 2}, {_id: 2, name: "c", age: 3}
];

var req1 = function() {
    return new Promise(function(resolve, reject) {
        console.log(">>> req1");
        Person.create(people)
        .then(item => {
            console.log("created");
            console.log("item "+item);
            resolve("one");
        })
        .catch(() => {
            reject("one rejected");
        });
        console.log("<<< req1");
    });
};

var req2 = function() {
    return new Promise(function(resolve, reject) {
        console.log(">>> req2");
        Person.create({_id: 3, name: "b", age: 20})
        .then(item => {
            console.log("created");
            console.log("item "+item);
            resolve("two");
        })
        .catch(() => {
            reject("two rejected");
        });
        console.log("<<< req2");
    });
};

function test2() {
    console.log(">>> test2");
    req1().then(item => {
        console.log("stage 1");
        console.log("(1) item "+item);
        req2().then(item => {
            console.log("stage 2");
            console.log("(2) item "+item);
        });
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
    console.log("<<< test2");
}

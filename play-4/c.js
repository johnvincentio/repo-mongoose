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
    test2();
});

function test1() {
    console.log(">>> test1");
    req1().then(() => {
        req2().then(() => {
        });
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
    console.log("<<< test1");
}

function test2() {
    console.log(">>> test2");
    clean1().then(() => {
        clean2().then(() => {
            req1().then(() => {
                req2().then(() => {
                });
            });
        });
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
    console.log("<<< test2");
}

var clean1 = function() {
    return new Promise(function(resolve, reject) {
        console.log(">>> clean1");
        Story.remove().exec()
        .then(() => {
            console.log(`Deleting Story records`);
            resolve("cleaned Story");
        })
        .catch(err => {
            console.error(err);
            reject("cleaned Story rejected");
        });
        console.log("<<< clean1");
    });
};

var clean2 = function() {
    return new Promise(function(resolve, reject) {
        console.log(">>> clean2");
        Person.remove().exec()
        .then(() => {
            console.log(`Deleting Person records`);
            resolve("cleaned Person");
        })
        .catch(err => {
            console.error(err);
            reject("cleaned Person rejected");
        });
        console.log("<<< clean2");
    });
};

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
        .catch((err) => {
            console.log("ERROR; "+err);
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
        .catch((err) => {
            console.log("ERROR; "+err);
            reject("two rejected");
        });
        console.log("<<< req2");
    });
};




//var aaron = new Person({
//    _id: 0,
//    name: 'Aaron',
//    age: 100
//});
//
//aaron.save(function(err) {
//    if (err) return handleError(err);
//
//    var story1 = new Story({
//        title: "Once upon a timex.",
//        _creator: aaron._id // assign the _id from the person
//    });
//
//    story1.save(function(err) {
//        if (err) return handleError(err);
//        // thats it!
//    });
//});

/*
function test2() {
    Person.create({_id: 99, name: "b", age: 20})
    .then(item => {
        console.log("created");
        console.log("item "+item);
    })
    .catch(() => {
        console.log("create error");
    });
}
*/

/*
function handleError(err) {
    console.error("ERROR; "+err);
}
*/

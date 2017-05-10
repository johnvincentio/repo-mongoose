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
    test9();
});

function test9() {
    console.log(">>> test9");
    makePromise(Story.remove().exec(), 'Deleting Story records')
    .then(() => {
        makePromise(Person.remove().exec(), 'Deleting Person records')
        .then(() => {
            makePromise(Person.create(people), 'create people')
            .then(() => {
                makePromise(Person.create({_id: 3, name: "b", age: 20}), 'create person')
                .then(() => {
                });
            });
        });
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
    console.log("<<< test9");
}

function makePromise(func, text) {
    return new Promise(function(resolve, reject) {
        console.log(">>> makePromise");
        func.then(() => {
            console.log(text);
            resolve(text);
        })
        .catch(err => {
            console.error(err);
            reject(text+" rejected");
        });
        console.log("<<< makePromise");
    });
}

var people = [
{_id: 0, name: "a", age: 1}, {_id: 1, name: "b", age: 2}, {_id: 2, name: "c", age: 3}
];

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

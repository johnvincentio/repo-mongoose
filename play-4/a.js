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
db.once("open", function(callback) {
    console.log("Connection succeeded.");
});



Story.remove().exec()
.then(() => {
    console.log(`Deleting item`);
})
.catch(err => {
    console.error(err);
});

Person.remove().exec()
.then(() => {
    console.log(`Deleting item`);
})
.catch(err => {
    console.error(err);
});

// Locations1Model.create(LOCATIONS1.create(req.body))

var aaron = new Person({
    _id: 0,
    name: 'Aaron',
    age: 100
});

aaron.save(function(err) {
    if (err) return handleError(err);

    var story1 = new Story({
        title: "Once upon a timex.",
        _creator: aaron._id // assign the _id from the person
    });

    story1.save(function(err) {
        if (err) return handleError(err);
        // thats it!
    });
});


function handleError(err) {
    console.error("ERROR; "+err);
}

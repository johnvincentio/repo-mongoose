/* jshint node: true */
/* jshint esnext: true */

/*
npm install mongoose --save
*/

'use strict';

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/node-catalog");
mongoose.Promise = global.Promise;

const equipmentSchema = mongoose.Schema({
    _id: {type: Number, required: true},
    display_text: {type: String, required: true},
    seo_name: {type: String, required: false},
    image_url: {type: String, required: false},
    image_alt_text: {type: String, required: false},
    seq_no: {type: Number, required: false},
    items: {
        _id: {type: Number, required: true},
        display_text: {type: String, required: true},
        seo_name: {type: String, required: false},
        short_description: {type: String, required: true},
        long_description: {type: String, required: true},
        image_1_url: {type: String, required: false},
        image_1_alt_text: {type: String, required: false},
        image_2_url: {type: String, required: false},
        image_2_alt_text: {type: String, required: false},
        image_3_url: {type: String, required: false},
        image_3_alt_text: {type: String, required: false},
        image_4_url: {type: String, required: false},
        image_4_alt_text: {type: String, required: false},
        image_5_url: {type: String, required: false},
        image_5_alt_text: {type: String, required: false},
        image_6_url: {type: String, required: false},
        image_6_alt_text: {type: String, required: false},
        image_7_url: {type: String, required: false},
        image_7_alt_text: {type: String, required: false},
        image_8_url: {type: String, required: false},
        image_8_alt_text: {type: String, required: false},
        spec_url: {type: String, required: false},
        seq_no: {type: Number, required: false}
    }
}, {collection: 'equipment'});

const equipmentCategorySchema = mongoose.Schema({
    _id: {type: Number, required: true},
    display_text: {type: String, required: true},
    seo_name: {type: String, required: false},
    image_url: {type: String, required: false},
    image_alt_text: {type: String, required: false},
    seq_no: {type: Number, required: false}
}, {collection: 'equipment_categories'});

const equipmentCategoryItemSchema = mongoose.Schema({
    _id: {type: Number, required: true},
    category_id: {type: Number, required: true, ref: 'equipment_categories'},
    display_text: {type: String, required: true},
    seo_name: {type: String, required: false},
    short_description: {type: String, required: true},
    long_description: {type: String, required: true},
    image_1_url: {type: String, required: false},
    image_1_alt_text: {type: String, required: false},
    image_2_url: {type: String, required: false},
    image_2_alt_text: {type: String, required: false},
    image_3_url: {type: String, required: false},
    image_3_alt_text: {type: String, required: false},
    image_4_url: {type: String, required: false},
    image_4_alt_text: {type: String, required: false},
    image_5_url: {type: String, required: false},
    image_5_alt_text: {type: String, required: false},
    image_6_url: {type: String, required: false},
    image_6_alt_text: {type: String, required: false},
    image_7_url: {type: String, required: false},
    image_7_alt_text: {type: String, required: false},
    image_8_url: {type: String, required: false},
    image_8_alt_text: {type: String, required: false},
    spec_url: {type: String, required: false},
    seq_no: {type: Number, required: false},
}, {collection: 'equipment_category_items'});

var Equipment = mongoose.model('equipment', equipmentSchema);

var EquipmentCategory = mongoose.model('equipment_categories', equipmentCategorySchema);
var EquipmentCategoryItem = mongoose.model('equipment_category_items', equipmentCategoryItemSchema);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
    console.log("Connection succeeded.");
    test1();
});

function test1() {
    console.log(">>> test1");
    EquipmentCategory.find()
    .limit(1000)
    .sort({_id: 1})
    .exec()
    .then(doc => {
        doc.forEach(item => {
            console.log(`The EquipmentCategory is ${item._id}, ${item.display_text}`);
            EquipmentCategoryItem.find({category_id: item._id})
            .limit(1000)
            .exec()
            .then(sub1 => {
                item.items = sub1;
                debugger;
//                sub1.forEach(sub2 => {
//                    console.log('The EquipmentCategoryItem is %s, %s', item._id, sub2.display_text);
//                });
            });
        });
        debugger;
        return Equipment.create(doc);
    })
    .then(doc => {
        console.log("doc "+doc);
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
    console.log("<<< test1");
}

function test2() {
    console.log(">>> test2");
    EquipmentCategoryItem.find()
    .exec()
    .then(doc => {
        doc.forEach(item => {
            console.log('The item is %s', item.display_text);
        });
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
    console.log("<<< test2");
}

function test3() {
    console.log(">>> test3");
    EquipmentCategoryItem.find()
    .populate('category_id')
    .exec()
    .then(doc => {
        doc.forEach(item => {
            console.log('The item is %s', item.display_text);
            console.log("item "+item);
        });
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
    console.log("<<< test3");
}

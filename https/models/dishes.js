var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// getting Currency type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// getting User type

// create a comment schema
var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// create a dish schema
var dishSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        min: 0,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

// create model by using Schema
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
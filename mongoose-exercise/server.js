var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leaders = require('./models/leaderships');

var url = 'mongodb://localhost:27017/test';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));

createDish = function (callback) {
    Dishes.create({
        name: "Cheese Pizza",
        image: "/images/cheesepizza.png",
        category: "pizza",
        price: "$15",
        description: "A cheese pizza",
        comments: [
            {
                rating: 3,
                comment: "Initial reaction: too crunchy",
                author: "Food critic"
            }
        ]
    }, function (err, dish) {
        if (err) {
            callback(err);
            return;
        }
        console.log("Dish created!");
        console.log();
            
        Dishes.find({}, function (err, dishes) {
            if (err) {
                callback(err);
                return;
            }
            
            // object of all the dishes
            console.log(dishes);
            
            db.collection('dishes').drop(function () {
                callback(null);
                return;
            });
        });
    });
}

createPromotion = function (callback) {
    Promotions.create({
        name: "Weekend Pizza Sale",
        image: "/images/sale.png",
        label: "New",
        price: "$10",
        description: "Featuring cheese pizza!"
    }, function (err, promotion) {
        if (err) {
            callback(err);
            return;
        }
        console.log("Promotion created!");
        console.log();
        
        Promotions.find({}, function (err, promotions) {
            if (err) {
                callback(err);
                return;
            }
            
            // object of all the dishes
            console.log(promotions);
            
            db.collection('promotions').drop(function () {
                callback(null);
                return;
            });
        });
    });
}

createLeader = function (callback) {
    Leaders.create({
        name: "Mr. Jeffrey",
        image: "/images/jeffrey.png",
        designation: "Chief Executive Officer",
        abbr: "CEO",
        description: "A cool guy."
    }, function (err, leader) {
        if (err) {
            callback(err);
            return;
        }
        console.log("Leader created!");
        console.log();
        
        Leaders.find({}, function (err, leaders) {
            if (err) {
                callback(err);
                return;
            }
            
            // object of all the dishes
            console.log(leaders);
            
            db.collection('leaders').drop(function () {
                callback(null);
                return;
            });
        });
    });
}

db.once('open', function () {
    console.log('Successfully connected to server!\n');
    
    createDish(function (err) {
        if (err)
            throw err;
        createPromotion(function (err) {
            if (err)
                throw err;
            createLeader(function (err) {
                if (err)
                    throw err;
                db.close();
            });
        });
    });
    
});
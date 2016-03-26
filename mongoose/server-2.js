var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes');

// Connection URL
var url = 'mongodb://localhost:27017/test';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', function () {
    console.log("Connected correctly to server");
    
    Dishes.create({
        name: "Cheese Pizza",
        description: "A cheese pizza",
        comments: [
            {
                rating: 3,
                comment: "Initial reaction: too crunchy",
                author: "Food critic"
            }
        ]
    }, function (err, dish) {
        if (err)
            throw err;
        console.log("Dish created!");
        console.log(dish);
        
        var id = dish._id;
        
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: "Updated cheese pizza"
                }
            }, {
                new: true
            })
            .exec(function (err, dish) {
                if (err)
                    throw err;
                console.log("Updated dish!");
                console.log(dish);
                
                dish.comments.push({
                    rating: 5,
                    comment: "This is a very nice pizza",
                    author: "Jeffrey Xiao"
                });
                
                dish.save(function (err, dish) {
                    console.log("Updated dish");
                    console.log(dish);
                    db.collection('dishes').drop(function () {
                        db.close();
                    });
                });
            });
        }, 3000);
    });

});
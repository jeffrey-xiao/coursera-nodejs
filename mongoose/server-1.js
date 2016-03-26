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
    
    // create a new dish
    var newDish = Dishes({
        name: "Pepperoni Pizza",
        description: "A pepperoni pizza",
        comments: [{rating: 3, comment: "Mediocore pizza", author:"Jeffrey"}]
    });
    
    // save the dish
    newDish.save(function (err) {
        if (err)
            throw err;
        
        console.log('Dish created!');
        
        // get all the dishes
        Dishes.find({}, function (err, dishes) {
            if (err)
                throw err;
            
            // object of all the dishes
            console.log(dishes);
            console.log(dishes[0].comments);
            
            db.collection('dishes').drop(function () {
                db.close();
            });
        });
    });
});
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbfunc = require('./functions');

// Connection URL
var url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the Server

MongoClient.connect(url, function (err, db) {
    assert.equal(err, null);
    console.log("Successfully connected to server");
    
    dbfunc.insertDocument(
        db, 
        {
            name: "Pizza", 
            description: "A pepperoni pizza"
        },
        "dishes",
        function (result) {
            console.log(result.ops);
            dbfunc.findDocuments(db, "dishes", function (docs) {
                console.log("Found:");
                console.log(docs);
                
                dbfunc.updateDocument(
                    db, 
                    {name: "Pizza"}, 
                    {description: "A cheese pizza"},
                    "dishes",
                    function (result) {
                        console.log(result.result);
                        
                        dbfunc.findDocuments(db, "dishes", function (docs) {
                            console.log(docs);
                            
                            db.dropCollection("dishes", function (result) {
                                console.log(result);
                                db.close();
                            });
                        });
                    }
                );
            });
        }
    );
});
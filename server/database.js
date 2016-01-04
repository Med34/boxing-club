var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var mongoUrl = "mongodb://localhost:27017/BoxingClub";
var db = null;

exports.connect = function(callback) {
    MongoClient.connect(mongoUrl, function(err, database){
        if (err) {
            throw err;
        }
        console.log("Mongodb connected");
        db = database;
        callback();
    });
};

exports.findAllMembers = function(callback) {
    db.collection("members").find({}, {_id:0}, function(err, cursor){
        cursor.sort({"id":1}).toArray(function(err, items) {
            callback(items);
      });
    });
};

/*
 * Fonctions utilitaires pour la base de donnees mongodb.
 */

var mongodb = require("mongodb");
var config = require("./config");
var MongoClient = mongodb.MongoClient;
var mongoUrl = config.mongodb.url;
var db = null;

/*
 * Connexion a la BD Mongodb.
 */
exports.connect = function(callback) {
    MongoClient.connect(mongoUrl, function(err, database){
        if (err) {
            throw err;
        }
        // Une seule connexion.
        console.log("Mongodb connected");
        db = database;
        callback();
    });
};

/*
 * Recupere tous les membres de la collection Mongodb si aucun paramJSON est
 * renseigne. Sinon recupere ceux correspondant aux criteres.
 */
exports.findAllMembers = function(callback, paramJSON) {
    console.log(paramJSON);
    paramJSON = (typeof paramJSON === 'undefined') ? {} : paramJSON;
    db.collection(config.mongodb.collectionMembers).find(paramJSON, {_id:0}, function(err, cursor){
        cursor.sort({"id":1}).toArray(function(err, items) {
            callback(items);
        });
    });
};

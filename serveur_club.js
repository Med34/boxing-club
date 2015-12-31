// Express.
var express = require("express");
var app = express();

// Locale DB.
var fs = require("fs");
var JSON_PATH_BD = "datas/boxers.min.json";
var json = JSON.parse(fs.readFileSync(JSON_PATH_BD, "UTF-8"));

// DB distante.
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").MongoClient;
var urlMongoDB = "mongodb://localhost:27017/BoxingClub";
var assert = require("assert");

/*
 * Insertion des donnees locales sur la base de donnees MongoDB
 */
var insertMembers = function (db, callback) {
    db.collection('members').insert(json, function (err, result) {
        assert.equal(err, null);
        console.log("Insert datas");
        callback(result);
    });
};

/*
 * Connexion + insertions des donnees
 */
MongoClient.connect(urlMongoDB, function (err, db) {
    assert.equal(null, err);
    insertMembers(db, function(){
        db.close();
    });
});

/*
 * Cherche toutes les cles du document json et toutes les valeurs associees.
 */
function map() {
    var json = JSON.parse(fs.readFileSync(JSON_PATH_BD, "UTF-8"));
    var values = {};
    for(var i = 0; i < json.length; i++) {
        var properties = Object.keys(json[i]);
        for(var prop = 0; prop < properties.length; prop++) {
            var indexProperties = properties[prop];
            var valueProperties = json[i][indexProperties];
            // Creation de l'index.
            if(values[indexProperties] === undefined) {
                values[indexProperties] = [valueProperties];
            } else {
                // Ajout d'une valeur à l'attribut s'il n'existe pas.
                if(values[indexProperties].indexOf(valueProperties) == -1) {
                    values[indexProperties].push(valueProperties);
                }
            }
        }
    }

    return JSON.stringify(values);
}

/*
 * Recherche dans le fichier json tous les elements correspondants aux
 * criteres de recherche.
 */
function find(paramJSON) {
    var listePersonnes = [];
    var listeMembres = JSON.parse(fs.readFileSync(JSON_PATH_BD, "UTF-8"));
    for(var i = 0; i < listeMembres.length; i++) {
        // Compte le nombre de conditions respectees.
        var conditionsCompteur = 0;
        for(var param in paramJSON) {
            if(paramJSON.hasOwnProperty(param)) {
                if(listeMembres[i][param] == paramJSON[param]) {
                    conditionsCompteur++;
                }
            }
        }
        // Si toutes les conditions sont respectees, l'element est rajoute.
        if(conditionsCompteur == Object.keys(paramJSON).length) {
            listePersonnes.push(listeMembres[i]);
        }
    }

    return JSON.stringify(listePersonnes);
}

/*
 * Renvoie la liste des criteres de recherche ainsi que toutes les valeurs
 * possibles.
 * Generation d'un formulaire de recherche dynamique.
 */
app.get("/findMember", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.end(map());
});

/*
 * Renvoie les membres correspondant aux criteres de recherches.
 * req.query contient les criteres de recherche sous format json.
 * Exemple:  "{category:middleweight}".
 */
app.get("/listMembers/", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.end(find(req.query));
})

// App listening.
app.listen(8888);
console.log("App listening on port 8888");

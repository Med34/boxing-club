// Chargement des modules.
var express = require("express");
var app = express();
var serverFunctions = require("./serverFunctions");
var sFunc = new serverFunctions();
var database = require("./database");
var config = require("./config");

database.connect(function(){
    // App listening.
    app.listen(8888);
    console.log("App listening on port 8888");

    /*
     * Renvoie la liste des criteres de recherche ainsi que toutes les valeurs
     * possibles.
     * Generation d'un formulaire de recherche dynamique.
     */
    app.get("/findMember", function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        database.findAllMembers(function(json){
            res.end(sFunc.map(json));
        });
    });

    /*
     * Renvoie les membres correspondant aux criteres de recherches.
     * req.query contient les criteres de recherche sous format json.
     * Exemple:  "{category:middleweight}".
     */
    app.get("/listMembers/", function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        database.findAllMembers(function(json){
            res.json(json);
        }, sFunc.transformQueryParam(req.query));
    })
});

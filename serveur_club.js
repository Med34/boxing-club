// Chargement des modules.
var express = require("express");
var serverFunctions = require("./server/serverFunctions");
var bddFunctions = require("./server/bddFunctions");

// Creation des instances.
var app = express();
var bddFunc = new bddFunctions();
var sFunc = new serverFunctions();
var bddJSON = bddFunc.getJSON();

/*
 * Renvoie la liste des criteres de recherche ainsi que toutes les valeurs
 * possibles.
 * Generation d'un formulaire de recherche dynamique.
 */
app.get("/findMember", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.end(sFunc.map(bddJSON));
});

/*
 * Renvoie les membres correspondant aux criteres de recherches.
 * req.query contient les criteres de recherche sous format json.
 * Exemple:  "{category:middleweight}".
 */
app.get("/listMembers/", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.end(sFunc.find(bddJSON, req.query));
})

// App listening.
app.listen(8888);
console.log("App listening on port 8888");

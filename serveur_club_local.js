// Chargement des modules.
var express = require("express");
var app = express();
var serverFunctions = require("./server/serverFunctions");
var sFunc = new serverFunctions();

// Locale DB.
var fs = require("fs");
var JSON_PATH_BD = "server/datas/boxers.min.json";
var json = JSON.parse(fs.readFileSync(JSON_PATH_BD, "UTF-8"));

/*
 * Renvoie la liste des criteres de recherche ainsi que toutes les valeurs
 * possibles.
 * Generation d'un formulairede recherche dynamique.
 */
app.get("/findMember", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.end(sFunc.map(json));
});

/*
 * Renvoie les membres correspondant aux criteres de recherches.
 * req.query contient les criteres de recherche sous format json.
 * Exemple:  "{category:middleweight}".
 */
app.get("/listMembers/", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.end(sFunc.find(json, req.query));
})

// App listening.
app.listen(8888);
console.log("App listening on port 8888");

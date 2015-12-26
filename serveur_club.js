// Configuration.
var express = require("express");
var fs = require("fs");
var app = express();

// Cherche toutes les clés du document et toutes les valeurs possibles.
function map(json) {
    var values = {};
    for(var i = 0; i < json.length; i++) {
        var properties = Object.keys(json[i]);
        for(var prop = 0; prop < properties.length; prop++) {
            var indexProperties = properties[prop];
            var valueProperties = json[i][indexProperties];
            // Création de l'index.
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

// Renvoie la liste de clés/valeur pour créer le formulaire de recherche.
app.get("/findMember", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    var chaineListeMembres = fs.readFileSync("public/datas/boxers.min.json", "UTF-8");
    var json = JSON.parse(chaineListeMembres);
    var listeMembres = map(json);
    res.end(listeMembres);
});

// App listening.
app.listen(8888);
console.log("App listening on port 8888");

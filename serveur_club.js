// Set the configuration
var express = require("express");
var fs = require("fs");
var app = express();

//Cherche toutes les propriétés du document et toutes les valeurs possibles.
function map(json) {
    //return json;
}

app.get("/listeMembres", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    var chaineListeMembres = fs.readFileSync("public/datas/boxing_clubs.json", "UTF-8");
    var listeMembres = JSON.parse(chaineListeMembres);
    console.log(listeMembres);
    //map(listeMembres);
});

// App listening
app.listen(8888);
console.log("App listening on port 8888");

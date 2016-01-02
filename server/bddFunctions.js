/*
 * Toutes les fonctions liees a la BDD.
 */
var bddFunctions = function() {
    var BDD_TYPE = "LOC";
    var LOCAL_URL = "server/datas/boxers.min.json";

    /*
     * Retourne le fichier JSON selon le type de la BDD.
     */
    this.getJSON = function() {
        if(BDD_TYPE == "LOC") {
            return this.getLocalJSON();
        } else if (BDD_TYPE == "DIST") {
            return this.getDistanteJSON();
        }
    }

    /*
     * Retourne le JSON LOCAL
     */
    this.getLocalJSON = function() {
        var fs = require("fs");
        return JSON.parse(fs.readFileSync(LOCAL_URL, "UTF-8"));
    }
}

module.exports = bddFunctions;

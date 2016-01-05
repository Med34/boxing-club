/*
 * Toutes les fonctions pour le serveur nodejs.
 */
var serverFunctions = function() {
    /*
     * Cherche toutes les cles du document json et toutes les valeurs associees.
     */
    this.map = function(json) {
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
     * Recherche dans le fichier json local tous les elements correspondants aux
     * criteres de recherche.
     */
    this.findLocal = function(json, paramJSON) {
        var listePersonnes = [];
        for(var i = 0; i < json.length; i++) {
            // Compte le nombre de conditions respectees.
            var conditionsCompteur = 0;
            for(var param in paramJSON) {
                if(paramJSON.hasOwnProperty(param)) {
                    if(json[i][param] == paramJSON[param]) {
                        conditionsCompteur++;
                    }
                }
            }
            // Si toutes les conditions sont respectees, l'element est rajoute.
            if(conditionsCompteur == Object.keys(paramJSON).length) {
                listePersonnes.push(json[i]);
            }
        }

        return JSON.stringify(listePersonnes);
    }

    /*
     * Recherche dans la collection de la base mongodb tous les elements
     * correspondants aux criteres de recherche.
     */
    this.findMongo = function(collectionMembers, paramJSON){
        var listePersonnes = [];
        console.log(collectionMembers);
    }
}

module.exports = serverFunctions;

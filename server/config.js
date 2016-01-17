/*
 * Ensemble des configurations nodejs.
 */

var config = {};
config.mongodb = {};
config.local = {};

// Mongodb configuration.
config.mongodb.url = "mongodb://localhost:27017/BoxingClub";
config.mongodb.collectionMembers = "members";

// BDD locale.
config.local.json = "datas/test.json";

module.exports = config;

// Set the configuration
var express = require('express');
var fs = require('fs');
var app = express();
var cors = require("cors");

app.use(cors()); // Support for CROSS-ORIGN



// App listening
app.listen(8888);
console.log("App listening on port 8888");

var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.setHeader('Content-Type', 'text/plain');
  res.end('Bonjour nodeJS');
});

app.listen(8888);

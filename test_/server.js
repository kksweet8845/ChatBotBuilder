var express = require('express');

var app = express();

var port = 11023;

app.use(express.static(__dirname + '/public'));

app.listen(port,()=>{
  console.log(`Listening on port: ${port}`);
});


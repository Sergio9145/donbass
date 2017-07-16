var http = require('http');
var path = require('path');

var express = require('express');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

router.get('/', function(req, res){
  console.log('client requests root');
  res.sendFile(path.join(__dirname, 'client','index.html'));
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Donbass ready");
});

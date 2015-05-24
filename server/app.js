var express = require('express');
var bodyParser = require('body-parser');
var helper = require('./models/helpers.js');
var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../app'));


//path for when users are created
// app.get('/api/hello', function(req, res){
//   console.log(req.body);
//   helper.hello(req.body);
// });

// app.get('/', function(req, res){
//   res.sendFile(path.join(__dirname+'../app/index.html'));
// });

app.listen(9000, function() {
  console.log(__dirname);
});
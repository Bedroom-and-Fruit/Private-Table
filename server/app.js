var express = require('express');
var bodyParser = require('body-parser');
var helper = require('./models/helpers.js');
var port = process.env.PORT || 9000;
var stripe = require('stripe')('pk_test_rT3gR317GZZ9QOG0D5uMaQWy');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../app'));


//path for when users are created
app.get('/api/searchResults?', function(req, res){
  helper.getSearchResults(req.query, res);
});

app.post('/api/payments', function(req, res){
  var stripeToken = req.body;
  var charge = stripe.charges.create({
    amount: 1000,
    currency: "usd",
    source: stripeToken,
    description: "Payment for venue booking"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log(JSON.stringify(err, null, 2));
    }
  });
  res.send(201);
});

app.listen(port);

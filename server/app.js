var express = require('express');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var helper = require('./models/helpers.js');
var fs = require('fs');
var port = process.env.PORT || 9000;
var stripe = require('stripe')('pk_test_rT3gR317GZZ9QOG0D5uMaQWy');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../app'));

if (process.env.S1_SECRET) {
  var secret = process.env.S1_SECRET;
} else {
  var secret = String(fs.readFileSync(__dirname + '/config/secret'));
}

//refactor this to explicitly protect certain routes
app.use('/api/users/bookings', expressJwt({secret: secret}));
app.use('/api/users/favorites', expressJwt({secret: secret}));


//path for when users are created
app.post('/api/users', function(req, res){
  helper.searchOrMake(req.body.username, req.body.email, req.body.password, res, secret);
});

//path for user's profile
app.get('/api/users/me', function(req, res){
  var decoded = jwt.decode(req.headers.authorization);
  helper.findAllInfo(decoded.username, res);
});

// path for when users are logging in
app.post('/auth/local', function(req, res) {
  helper.authenticate(req.body.username, req.body.password, res, secret);
});

//path for obtaining menus for a selected room
app.get('/api/menu/eventType?', function(req, res){
  helper.serveMenus(req.query, res);
});

//path for obtaining courses for a selected menu
app.get('/api/menu/menuID?', function(req, res){
  helper.serveCourses(req.query.menuID, res);
});

// path for obtaining search results
app.get('/api/searchresults?', function(req, res){
  helper.getSearchResults(req.query, res);
});

//path for obtaining detailed room info
app.get('/api/room/:roomID', function(req, res){
  helper.findRoom(req.params.roomID, res);
});

//path for searching for available times
app.get('/api/dates?', function(req, res){
  helper.findDates(req.query.roomID, req.query.startTime, req.query.endTime, res);
});

//path for adding a room to favorites
app.post('/api/users/addfavorites', function(req, res){
  helper.addFavorite(req.params.userID, req.params.roomID, res);
});

//path for fetching a user's favorites
app.post('/api/users/:userID/favorites', function(req, res){
  helper.getFavorites(req.params.userID, res);
});

//path for deleting a room from favorites
app.post('/api/users/deletefavorites', function(req, res){
  var decoded = jwt.decode(req.headers.authorization);
  helper.deleteFavorite(decoded.userID, req.params.roomID, res);
});

//path for viewing a user's bookings
app.get('/api/users/bookings', function(req, res){
  helper.viewBookings(req,res);
});

//path for processing payments
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

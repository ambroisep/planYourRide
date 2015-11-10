var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var Gmaps = require('./../GMapsAPI/itinerary');
var Strava = require('./../StravaAPI/strava');
var map = {};

module.exports = function (app, express) {

  app.use(bodyParser.json());
  app.use(favicon(__dirname + '/../../client/assets/favicon.ico'));
  app.use(express.static(__dirname + '/../../client'));

  app.get('/map', function (req, res) {
    Gmaps.getMap(map)
      .then(function(googleMap) {
        res.send(googleMap);
      });
  });

  app.post('/trip', function (req, res) {
    map.origin = req.body.startPoint;
    map.destination = req.body.endPoint;
    res.send();
  });

  app.get('/trip', function (req, res) {
    Gmaps.getItinerary(map)
      .then(function (itinerary) {
        res.send(itinerary);
      })
      .catch(function (err) {
        res.send(err);
      });
  });

  app.get('/segments', function (req, res) {
    Strava.getSegments()
      .then(function (segments) {
        res.send(segments);
      })
      .catch(function (err) {
        res.send(err);
      });
  });
  
};

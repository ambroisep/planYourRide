var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var Gmaps = require('./../GMapsAPI/itinerary');
var Strava = require('./../StravaAPI/strava');
var itinerary = {};

module.exports = function (app, express) {

  app.use(bodyParser.json());
  app.use(favicon(__dirname + '/../../client/assets/favicon.ico'));
  app.use(express.static(__dirname + '/../../client'));

  // app.get('/map', function (req, res) {
  //   Gmaps.getMap(itinerary)
  //     .then(function(googleMap) {
  //       res.send(googleMap);
  //     });
  // });

  app.post('/trip', function (req, res) {
    itinerary.origin = req.body.startPoint;
    itinerary.destination = req.body.endPoint;
    itinerary.duration = req.body.hours + req.body.minutes / 60;
    res.send();
  });

  app.get('/trip', function (req, res) {
    Strava.getSegments(itinerary.origin, itinerary.duration)
      .then(function (segments) {
        
      })
    Gmaps.getItinerary(itinerary)
      .then(function (itinerary) {
        res.send(itinerary);
      })
      .catch(function (err) {
        res.send(err);
      });
  });

  app.get('/segments', function (req, res) {
    Strava.getSegments({lat: 37.6879083, lng: -122.4702074}, 1, [0,1,1,0])
      .then(function (segments) {
        res.send(segments);
      })
      .catch(function (err) {
        res.send(err);
      });
  });

};

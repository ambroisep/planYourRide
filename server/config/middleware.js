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

var getDistanceAndDuration = function (googleItinerary) {
  return googleItinerary.routes.reduce(function (timeDistObj, route) {
    return route.legs.reduce(function(miniTimeDistObj, leg) {
      miniTimeDistObj.duration+= leg.duration.value;
      miniTimeDistObj.distance+= leg.distance.value;
      return miniTimeDistObj;
    }, timeDistObj)
  }, {distance: 0, duration: 0});
};

var findBestItinerary = function (stravaSegments) {
  itinerary.waypoints = [];
  itinerary.waypoints.push(stravaSegments.segments[0].start_latlng.toString());
  itinerary.waypoints.push(stravaSegments.segments[0].end_latlng.toString());
  itinerary.waypoints.push(stravaSegments.segments[1].start_latlng.toString());
  itinerary.waypoints.push(stravaSegments.segments[1].end_latlng.toString());
  return Gmaps.getItinerary(itinerary)
    .then(function (resp) {
      var dd = getDistanceAndDuration(resp);
      if (dd.duration / 3600 < itinerary.duration * 1.1) {
        resp.dd = dd;
        console.log(dd)
        return resp;
      } else {console.log('too long', dd)};
    })
}

  app.post('/trip', function (req, res) {
    Gmaps.getCoords(req.body.startPoint)
      .then(function (coordsStart) {
        itinerary.origin = coordsStart.results[0].geometry.location;
        itinerary.destination = itinerary.origin;
        itinerary.duration = req.body.hours + req.body.minutes / 60;
        itinerary.waypoints = [];
        itinerary.directions = JSON.parse(req.body.directions);
        res.send();
      })
  });

  app.get('/trip', function (req, res) {
    Strava.getSegments(itinerary.origin, itinerary.duration, itinerary.directions)
      .then(function (resp) {
        return findBestItinerary(resp);
      })
      .then(function (resp) {
        resp.dd = 
        res.send(resp);
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

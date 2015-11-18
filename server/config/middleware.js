var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var Gmaps = require('./../GMapsAPI/itinerary');
var Strava = require('./../StravaAPI/strava');
var Promise = require('bluebird');
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
  return new Promise(function(resolve, reject) {
    var itineraries = [];
    var asked = 0;
    var maxRoutesTestedToCapAPICalls = 6// stravaSegments.segments.length
    for (var i = 0; i < maxRoutesTestedToCapAPICalls - 1; i++) {
      itinerary.waypoints = [];
      itinerary.waypoints.push(stravaSegments.segments[i].end_latlng.toString());
      itinerary.waypoints.push(stravaSegments.segments[i].start_latlng.toString());
      for (var j = i + 1; j < maxRoutesTestedToCapAPICalls; j++) {
        itinerary.waypoints.push(stravaSegments.segments[j].start_latlng.toString());
        itinerary.waypoints.push(stravaSegments.segments[j].end_latlng.toString());
        asked++;
        Gmaps.getItinerary(itinerary)
          .then(function(response) {
            itineraries.push(response);
            if (itineraries.length === asked) {
              var dds = itineraries.map(function (el) {
                return getDistanceAndDuration (el);
              })
              var bestId = dds.reduce(function (ind, dd, index) {
                var delta = Math.abs(dd.duration - (itinerary.duration * 3600) / (itinerary.duration * 3600));
                if (delta < ind[1]) {
                  ind[1] = delta;
                  ind[0] = index;
                }
                return ind;
              }, [1, 1]);
              itineraries[bestId[0]].dd = dds[bestId[0]];
              resolve(itineraries[bestId[0]]);
            }
          })
          .catch(function(err) {
            reject(err);
          });
      }
    }
  });

  // itinerary.waypoints = [];
  // itinerary.waypoints.push(stravaSegments.segments[0].end_latlng.toString());
  // itinerary.waypoints.push(stravaSegments.segments[0].start_latlng.toString());
  // itinerary.waypoints.push(stravaSegments.segments[1].start_latlng.toString());
  // itinerary.waypoints.push(stravaSegments.segments[1].end_latlng.toString());
  // return Gmaps.getItinerary(itinerary)
  //   .then(function (resp) {
  //     var dd = getDistanceAndDuration(resp);
  //     if (dd.duration / 3600 < itinerary.duration * 1.1) {
  //       resp.dd = dd;
  //       console.log(dd)
  //       return resp;
  //     } else {
  //       console.log('too long', dd)
  //       resp.dd = dd;
  //       return resp;
  //     }
  //   });
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
        console.log(resp);
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

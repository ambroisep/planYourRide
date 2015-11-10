var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var Gmaps = require('./../GMapsAPI/itinerary');

module.exports = function (app, express) {

  app.use(bodyParser.json());
  app.use(favicon(__dirname + '/../../client/assets/favicon.ico'));
  app.use(express.static(__dirname + '/../../client'));

  app.get('/map', function (req, res) {
    Gmaps.getItinerary({origin: 'San Frncisco, CA',
      destination: 'Los Angeles, CA'})
      .then(function(itinerary) {
        console.log(itinerary);
        res.send(itinerary);
      });
  });

  var map;
  app.post('/trip', function (req, res) {
    map.startPoint = req.body.startPoint;
    map.endPoint = req.body.endPoint;
    res.send();
    // origin='San Francisco'&destination='Los Angeles'
  })
};

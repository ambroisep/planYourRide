var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var Gmaps = require('./../GMapsAPI/itinerary');

module.exports = function (app, express) {

  app.use(bodyParser.json());
  app.use(favicon(__dirname + '/../../client/assets/favicon.ico'));
  app.use(express.static(__dirname + '/../../client'));

  app.get('/test', function (req, res) {
    Gmaps.getItinerary({origin: 'San Frncisco, CA',
      destination: 'Los Angeles, CA'})
      .then(function(itinerary) {
        console.log(itinerary);
        res.send(itinerary);
      });
  });

  var map;
  app.post('/trip', function (req, res) {
    console.log(req.body);
    res.send();
    // origin='San Francisco'&destination='Los Angeles'
  })
};

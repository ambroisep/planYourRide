var httpAsynch = require('request-promise');

var url = 'https://maps.googleapis.com/maps/api/directions/json';

exports.getItinerary = function(params) {
  var parameters = {
    uri: url,
    qs: {
      origin: params.origin,
      destination: params.destination,
      waypoints: 'daly city',
      mode: 'bicycling',
      key: 'AIzaSyBQs4N37ZBvQGPqcYdZVKUPTvfHS-AKLZQ'
    },
    json: true
  }
  return httpAsynch(parameters);
};

exports.getMap = function(params) {
  var parameters = {
    uri: 'https://www.google.com/maps/embed/v1/directions',
    qs: {
      origin: params.origin,
      destination: params.destination,
      mode: 'bicycling',
      key: 'AIzaSyD23psOeUzyr1lGl2pPZDc0vBxPgW0lsPY'
    },
    json: true
  }
  return httpAsynch(parameters);
};

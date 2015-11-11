var httpAsynch = require('request-promise');

exports.getItinerary = function(params) {
  var parameters = {
    uri: 'https://maps.googleapis.com/maps/api/directions/json',
    qs: {
      origin: params.origin.lat + ',' + params.origin.lng,
      destination: params.destination.lat + ',' + params.destination.lng,
      waypoints: params.waypoints.reduce(function (concat, wypt, i) {
        if (i < params.waypoints.length) { 
          concat+= (wypt + '|');
        } else {
          concat+= wpt;
        }
        return concat;
      }, ''),
      mode: 'bicycling',
      key: 'AIzaSyBQs4N37ZBvQGPqcYdZVKUPTvfHS-AKLZQ'
    },
    json: true
  }
  return httpAsynch(parameters);
};

// exports.getMap = function(params) {
//   var parameters = {
//     uri: 'https://www.google.com/maps/embed/v1/directions',
//     qs: {
//       origin: params.origin,
//       destination: params.destination,
//       mode: 'bicycling',
//       key: 'AIzaSyD23psOeUzyr1lGl2pPZDc0vBxPgW0lsPY'
//     },
//     json: true
//   }
//   return httpAsynch(parameters);
// };

exports.getCoords = function(string) {
  var parameters = {
    uri: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {
      address: string || '944 Market Street, San Francisco, CA',
      key: 'AIzaSyBQs4N37ZBvQGPqcYdZVKUPTvfHS-AKLZQ'
    },
    json: true
  }
  return httpAsynch(parameters);
};

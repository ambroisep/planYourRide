var httpAsynch = require('request-promise');

var url = 'https://maps.googleapis.com/maps/api/directions/json';

exports.getItinerary = function(params, callback) {
  var parameters = {
    uri: url,
    qs: {
      origin: params.origin,
      destination: params.destination,
      mode: 'bicycling',
      key: 'AIzaSyBQs4N37ZBvQGPqcYdZVKUPTvfHS-AKLZQ'
    },
    json: true
}
  return httpAsynch(parameters);
};

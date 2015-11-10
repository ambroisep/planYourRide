var httpAsynch = require('request-promise');

var url = 'https://www.strava.com/api/v3/segments/explore'

exports.getSegments = function(params) {
  var parameters = {
    uri: url,
    qs: {
      bounds: '37.821362,-122.505373,37.842038,-122.465977'
    },
    headers: {
      'Authorization': 'Bearer 7aa2fb38d2fbeb45ae3997b1a6b6c2b99a348356'
    },
    json: true
  }
  return httpAsynch(parameters);
};

var httpAsynch = require('request-promise');

var oneDegreeLat = 110.574; //km
var oneDegreeLng = function(lat) {
  return 111.320 * Math.cos(lat * 2 * Math.PI / 360);
};
var calculate_boundries = function (startPoint, direction, duration) {
  var speed = 20; //km/h
  var distance = speed * duration;
  return [startPoint.lat - direction[0] * distance / oneDegreeLat,
          startPoint.lng - direction[1] * distance / oneDegreeLng(startPoint.lat),
          startPoint.lat + direction[2] * distance / oneDegreeLat,
          startPoint.lng + direction[3] * distance / oneDegreeLng(startPoint.lat)]
};

var url = 'https://www.strava.com/api/v3/segments/explore'

exports.getSegments = function(startPoint, duration, direction) {
  direction = direction || [0.6, 0.6, 0.6, 0.6]; //NB : [South, West, North, East]
  var bounds = calculate_boundries(startPoint, duration, direction);
  console.log(bounds);
  var parameters = {
    uri: url,
    qs: {
      bounds: bounds.toString()
    },
    headers: {
      'Authorization': 'Bearer 7aa2fb38d2fbeb45ae3997b1a6b6c2b99a348356'
    },
    json: true
  }
  return httpAsynch(parameters);
};

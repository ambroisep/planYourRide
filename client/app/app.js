angular.module('planYourRide', [
  'planYourRide.tripPlanner',
  'planYourRide.directionRenderer',
  'planYourRide.services',
  'ngRoute'
])
  
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/tripPlanner/tripPlanner.html',
      controller: 'TripPlanner'
    })
    .when('/direction', {
      templateUrl: 'app/directionRenderer/directionRenderer.html',
      controller: 'DirectionRenderer'
    })
    .otherwise({
        redirectTo: '/'
    });
});

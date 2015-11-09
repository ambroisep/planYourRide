angular.module('planYourRide', ['planYourRide.tripPlanner', 'ngRoute'])
  
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/tripPlanner/tripPlanner.html',
      controller: 'TripPlanner'
    })
    .otherwise({
        redirectTo: '/'
    });
});

angular.module('planYourRide', ['planYourRide.tripPlanner'])
  
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

angular.module('planYourRide.tripPlanner', [])

.controller('TripPlanner', function ($scope, $location,Directions) {

  $scope.tripData = {};
  $scope.submitTrip = function () {
    Directions.postDemand($scope.tripData)
      .then(function (resp) {
        $location.path('/direction');
      });
  };

});

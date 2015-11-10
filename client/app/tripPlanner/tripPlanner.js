angular.module('planYourRide.tripPlanner', [])

.controller('TripPlanner', function ($scope, $location, Directions) {

  $scope.tripData = {};
  $scope.submitTrip = function () {
    $scope.tripData.startPoint = $scope.tripData.startPoint || '944 Market Street, San Francisco, CA';
    $scope.tripData.endPoint = $scope.tripData.startPoint;
    $scope.tripData.hours = $scope.tripData.hours || 1;
    $scope.tripData.minutes = $scope.tripData.minutes || 0;
    Directions.postDemand($scope.tripData)
      .then(function (resp) {
        $location.path('/direction');
      });
  };

});

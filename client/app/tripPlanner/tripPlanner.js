angular.module('planYourRide.tripPlanner', [])

.controller('TripPlanner', function ($scope, $location,Directions) {

  $scope.tripData = {};
  $scope.submitTrip = function () {
    $scope.tripData.startPoint = $scope.tripData.startPoint || 'San Francisco';
    $scope.tripData.endPoint = $scope.tripData.endPoint || 'Sausalito';
    Directions.postDemand($scope.tripData)
      .then(function (resp) {
        $location.path('/direction');
      });
  };

});

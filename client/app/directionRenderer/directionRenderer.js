angular.module('planYourRide.directionRenderer', [])

.controller('DirectionRenderer', function ($scope, $sce, Directions) {
  $scope.directionData = '/map';
  $scope.retrieveDirection = function () {
    Directions.getDirections()
      .then(function(resp) {
        console.log(resp);
        var mapOptions = {
            zoom: 4,
            center: 'san francisco'
        };
        var backgroundMap = new google.maps.Map(document.getElementById('map'), mapOptions);
        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: backgroundMap
        });
        var request = {
          destination: 'sausalito',
          origin: 'san francisco',
          waypoints: [{location: 'Golden Gate Bridge'}, {location: 'Tiburon'}],
          travelMode: google.maps.TravelMode.BICYCLING,
          optimizeWaypoints: true
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });

        $scope.map = backgroundMap;
      });
  };


  $scope.retrieveDirection();

});

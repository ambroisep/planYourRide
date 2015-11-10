angular.module('planYourRide.directionRenderer', [])

.controller('DirectionRenderer', function ($scope, $sce, Directions) {
  $scope.directionData = '/map';
  $scope.retrieveDirection = function () {
    Directions.getDirections()
      .then(function(resp) {
        console.log(resp);
        var mapOptions = {
            zoom: 4,
            center: resp.routes[0].legs[0].start_location
        };
        var backgroundMap = new google.maps.Map(document.getElementById('map'), mapOptions);
        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: backgroundMap
        });
        var waypts = resp.routes[0].legs.reduce(function (wypts, newPoint, index) {
          if (index > 0) { wypts.push({location: newPoint.start_location}); }
          return wypts;
        }, []);
        var request = {
          destination: resp.routes[0].legs[resp.routes[0].legs.length - 1].end_location,
          origin: resp.routes[0].legs[0].start_location,
          waypoints: waypts,
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

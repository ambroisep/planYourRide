angular.module('planYourRide.directionRenderer', [])

.controller('DirectionRenderer', function ($scope, $sce, Directions) {
  $scope.directionData = '/map';
  $scope.retrieveDirection = function () {
    Directions.getDirections()
      .then(function(resp) {
        $scope.directionData = resp;
        console.log($scope.directionData);
      });
  };

  var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(40.0000, -98.0000),
      mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // var directionsDisplay = new google.maps.DirectionsRenderer({
    //   map: map
    // });

    // // Set destination, origin and travel mode.
    // var request = {
    //   destination: indianapolis,
    //   origin: chicago,
    //   travelMode: google.maps.TravelMode.DRIVING
    // };

    // // Pass the directions request to the directions service.
    // var directionsService = new google.maps.DirectionsService();
    // directionsService.route(request, function(response, status) {
    //   if (status == google.maps.DirectionsStatus.OK) {
    //     // Display the route on the map.
    //     directionsDisplay.setDirections(response);
    //   }

  // $scope.initMap();

  // $scope.retrieveDirection();

});

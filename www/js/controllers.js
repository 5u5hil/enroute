angular.module('app.controllers', [])

        .controller('EnrouteCtrl', function ($scope, $localstorage, $ionicPopup, $ionicLoading) {
            $scope.base = 'http://mobitrash.cruxservers.in/operator/';

            $scope.isLogin = function () {
                if ($localstorage.uid()) {
                    return true;
                } else {
                    return false;
                }
            }

            $scope.alert = function (title, message, type) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: message
                });
            };

            $scope.showLoading = function (text) {
                if (text) {
                    $ionicLoading.show({
                        template: '<ion-spinner icon="android"></ion-spinner>' + text
                    });
                } else {
                    $ionicLoading.show({template: '<ion-spinner icon="android"></ion-spinner>'});
                }
            };

            $scope.hideLoading = function () {
                $ionicLoading.hide();
            };

            $scope.ajaxErrorMessage = function () {
                $scope.alert('Connection Error', 'Unable to Connect');
            }

        })

        .controller('planYourTripCtrl', function ($scope) {

        })

        .controller('trackBusByRouteNumberCtrl', function ($scope) {

        })

        .controller('busesAroundMeCtrl', function ($scope, $ionicPlatform) {
            var marker;
            var startCoord = [];
            var icon = {
                path: "M79.292,14.002l-0.063,0.061c0.172-0.721,0.272-1.469,0.272-2.241c0-5.354-4.354-9.708-9.706-9.708    c-0.291,0-0.585,0.015-0.887,0.045c-0.501-0.205-1.032-0.306-1.578-0.316c-1.133-0.629-2.374-1.087-3.688-1.342    C62.882,0.179,62.034,0,61.154,0c-0.914,0-1.788,0.195-2.57,0.542c-1.26,0.267-2.446,0.724-3.536,1.335    c-0.438,0.043-0.871,0.131-1.275,0.302c-0.376-0.042-0.754-0.065-1.13-0.065c-5.352,0-9.706,4.354-9.706,9.708    c0,0.772,0.101,1.521,0.272,2.244l-0.064-0.063c-10.675,11.134-6.021,18.803-4.342,20.888c2.268,2.813,5.74,4.383,9.477,4.633    v25.651c0,1.321,0.257,2.552,0.705,3.685c-0.034,0.254-0.058,0.514-0.058,0.777l0.002,46.999c0,3.203,2.598,5.8,5.802,5.8    s5.801-2.598,5.801-5.801l-0.003-40.334c0.229,0.011,0.459,0.029,0.691,0.029c0.045,0,0.089-0.006,0.135-0.006l-0.001,40.311    c0,3.203,2.597,5.801,5.8,5.801c3.204,0,5.801-2.598,5.801-5.801l0.002-46.71c0.76-1.408,1.201-3.003,1.201-4.75V39.523    c3.735-0.251,7.21-1.82,9.478-4.633C85.312,32.805,89.966,25.136,79.292,14.002z M52.569,3.83c0.519,0,1.031,0.056,1.532,0.16    c0.365-0.274,0.815-0.44,1.308-0.44h2.395c0.524-1.086,1.776-1.835,3.279-1.835c1.502,0,2.756,0.749,3.279,1.835h2.811    c0.47,0,0.9,0.149,1.26,0.399c0.419-0.073,0.849-0.119,1.288-0.119c4.123,0,7.477,3.354,7.477,7.477s-3.354,7.476-7.477,7.476    c-4.122,0-7.476-3.353-7.476-7.476c0-1.207,0.293-2.343,0.805-3.354h-3.798c0.514,1.024,0.793,2.165,0.793,3.354    c0,4.123-3.354,7.476-7.476,7.476s-7.477-3.353-7.477-7.476C45.093,7.185,48.446,3.83,52.569,3.83z M61.247,54.471h-0.06    l-3.049-4.172l3.049-20.38h0.06l3.05,20.38L61.247,54.471z M75.99,28.73c-0.865,1.072-3.771,1.616-6.362,0.026l-0.007,0.01    c-1.562-1.177-3.387-2.028-5.254-2.486l-3.147,3.17l-3.054-3.205c-0.012,0.004-0.021,0.004-0.033,0.006    c-1.894,0.453-3.744,1.312-5.324,2.507v-0.001c-2.593,1.59-5.499,1.047-6.364-0.026c-0.842-1.045,0.104-3.974,3.483-7.606    c0.652,0.188,1.331,0.32,2.033,0.37c2.309,2.488,5.595,4.052,9.259,4.052c3.66,0,6.947-1.563,9.257-4.052    c0.701-0.05,1.38-0.182,2.032-0.37C75.887,24.756,76.833,27.685,75.99,28.73z M52.569,15.215c2.153,0,3.906-1.753,3.906-3.908c0-1.34-0.675-2.572-1.806-3.295C54.045,7.611,53.316,7.4,52.568,7.4    c-2.155,0-3.908,1.752-3.908,3.907C48.66,13.462,50.413,15.215,52.569,15.215z M69.72,15.215c2.155,0,3.908-1.753,3.908-3.908c0-2.155-1.753-3.907-3.908-3.907c-2.153,0-3.907,1.752-3.907,3.907    C65.812,13.462,67.566,15.215,69.72,15.215z",
                fillColor: '#D80027',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 0.5
            };

            var bus = {
                path: "M453.5,78c-3.333-14-9-24.667-17-32s-19.667-14-35-20c-15.333-6.667-37.333-12.667-66-18    S280.666,0,257,0c-23.667,0-49.833,2.667-78.5,8s-50.667,11.333-66,18c-15.333,6-27,12.667-35,20s-13.333,18-16,32l-20,160v223h31    v20c0,13.333,4.167,22.667,12.5,28s16.833,5.333,25.5,0s13-14.667,13-28v-20h256v20c0,13.333,5.167,22.667,15.5,28    s20.5,5.333,30.5,0s15-14.667,15-28v-20h31V238L453.5,78z M150.5,38.5c2.667-5,7.334-7.5,14-7.5h205v30h-205    c-6.667,0-11.333-2.5-14-7.5S147.833,43.5,150.5,38.5z M77.5,234l17-122c1.333-6.667,7-10,17-10h293c10,0,15.667,3.333,17,10    l17,124c0.667,2,1,3.333,1,4c0,4.667-1.667,8.5-5,11.5s-7.667,4.5-13,4.5h-327c-5.333,0-9.667-1.667-13-5s-5-7.667-5-13    C76.5,236.667,76.833,235.333,77.5,234z M130.5,383.5c-6.667,6.333-14.5,9.5-23.5,9.5s-16.833-3.167-23.5-9.5s-10-14-10-23    s3.333-16.667,10-23c6.667-6.333,14.5-9.5,23.5-9.5s16.833,3.167,23.5,9.5s10,14,10,23S137.167,377.167,130.5,383.5z M432.5,383.5    c-6.667,6.333-14.5,9.5-23.5,9.5s-16.833-3.167-23.5-9.5s-10-14-10-23s3.333-16.667,10-23S400,328,409,328s16.833,3.167,23.5,9.5    s10,14,10,23S439.167,377.167,432.5,383.5z",
                fillColor: '#006DF0',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 0.05
            };

            $ionicPlatform.ready(function () {



                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12

                });



                if (navigator.geolocation) {

                    var numDeltas = 100;
                    var delay = 10; //milliseconds
                    var i = 0;
                    var deltaLat;
                    var deltaLng;


                    navigator.geolocation.getCurrentPosition(function (position) {

                        var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        startCoord = [position.coords.latitude, position.coords.longitude];
                        map.setCenter(initialLocation);

                        var rendererOptions = {
                            map: map,
                            suppressMarkers: true
                        }


                        new google.maps.Marker({
                            position: new google.maps.LatLng(position.coords.latitude + 0.05, position.coords.longitude),
                            map: map,
                            icon: bus
                        });

                        new google.maps.Marker({
                            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude + 0.05),
                            map: map,
                            icon: bus
                        });

                        new google.maps.Marker({
                            position: new google.maps.LatLng(position.coords.latitude + 0.05, position.coords.longitude + 0.05),
                            map: map,
                            icon: bus
                        });

                        new google.maps.Marker({
                            position: new google.maps.LatLng(position.coords.latitude - 0.05, position.coords.longitude - 0.05),
                            map: map,
                            icon: bus
                        });

                        marker = new google.maps.Marker({
                            position: initialLocation,
                            map: map,
                            icon: icon
                        });


                    });

                    setInterval(function () {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            var result = [position.coords.latitude, position.coords.longitude];
                            if (!map.getBounds().contains(marker.getPosition())) {
                                map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                            }
                            transition(result);
                        });

                    }, 3000);




                    function transition(result) {
                        i = 0;
                        deltaLat = (result[0] - startCoord[0]) / numDeltas;
                        deltaLng = (result[1] - startCoord[1]) / numDeltas;
                        moveMarker();
                    }

                    function moveMarker() {

                        startCoord[0] += deltaLat;
                        startCoord[1] += deltaLng;
                        var latlng = new google.maps.LatLng(startCoord[0], startCoord[1]);
                        marker.setPosition(latlng);
                        if (i != numDeltas) {
                            i++;
                            setTimeout(moveMarker, delay);
                        }
                    }
                }

            });


        })

        .controller('busTrackerCtrl', function ($scope) {

        })

        .controller('busDetailsCtrl', function ($scope) {

        })


function transition(result) {
    i = 0;
    deltaLat = (result[0] - startCoord[0]) / numDeltas;
    deltaLng = (result[1] - startCoord[1]) / numDeltas;
    moveMarker();
}

function moveMarker() {

    startCoord[0] += deltaLat;
    startCoord[1] += deltaLng;
    var latlng = new google.maps.LatLng(startCoord[0], startCoord[1]);
    marker.setPosition(latlng);
    if (i != numDeltas) {
        i++;
        setTimeout(moveMarker, delay);
    }
}
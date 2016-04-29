angular.module('app.routes', ['ionicUIRouter'])

        .config(function ($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider



                    .state('enroute.planYourTrip', {
                        url: '/plan-trip',
                        views: {
                            'tab2': {
                                templateUrl: 'templates/planYourTrip.html',
                                controller: 'planYourTripCtrl'
                            }
                        }
                    })

                    .state('enroute.trackBusByRouteNumber', {
                        url: '/track-bus',
                        views: {
                            'tab3': {
                                templateUrl: 'templates/trackBusByRouteNumber.html',
                                controller: 'trackBusByRouteNumberCtrl'
                            }
                        }
                    })

                    .state('enroute.busesAroundMe', {
                        url: '/around-me',
                        views: {
                            'tab1': {
                                templateUrl: 'templates/busesAroundMe.html',
                                controller: 'busesAroundMeCtrl'
                            }
                        }
                    })

                    .state('enroute', {
                        url: '/enroute',
                        templateUrl: 'templates/enroute.html',
                        abstract: true,
                        controller: 'EnrouteCtrl'

                    })

                    /* 
                     The IonicUIRouter.js UI-Router Modification is being used for this route.
                     To navigate to this route, do NOT use a URL. Instead use one of the following:
                     1) Using the ui-sref HTML attribute:
                     ui-sref='enroute.busTracker'
                     2) Using $state.go programatically:
                     $state.go('enroute.busTracker');
                     This allows your app to figure out which Tab to open this page in on the fly.
                     If you're setting a Tabs default page or modifying the .otherwise for your app and
                     must use a URL, use one of the following:
                     /enroute/tab2/bus-tracker
                     /enroute/tab3/bus-tracker
                     */
                    .state('enroute.busTracker', {
                        url: '/bus-tracker',
                        views: {
                            'tab2': {
                                templateUrl: 'templates/busTracker.html',
                                controller: 'busTrackerCtrl'
                            },
                            'tab3': {
                                templateUrl: 'templates/busTracker.html',
                                controller: 'busTrackerCtrl'
                            }
                        }
                    })

                    .state('enroute.busDetails', {
                        url: '/bus-details',
                        views: {
                            'tab2': {
                                templateUrl: 'templates/busDetails.html',
                                controller: 'busDetailsCtrl'
                            }
                        }
                    })

            $urlRouterProvider.otherwise('/enroute/around-me')



        });
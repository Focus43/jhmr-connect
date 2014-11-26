/* global FastClick */

;(function( window, angular, undefined ){ 'use strict';

    angular.module('jhmrc', [
        'jhmrc.common',
        'jhmrc.login',
        'jhmrc.participant',
        'jhmrc.reportcard'
    ]).

        config([
            function(){

            }
        ]).

        // value('gaId', 'UA-xxxxx').
        // value('apiEndpoint', 'http://someurl.com'). // TODO: factory

        run([
            function(  ){

            }
        ]);

})( window, window.angular );

var Portal = {};
Portal.apiEndPoints = {
      authentication: "https://vista.vertservices.net/token?",
      library:        "https://maven.vertservices.net/guest/guests/",
      reportCard:     ""
  };

angular.module('jhmrc.common', ['angularLocalStorage'])

.config(['$httpProvider', function( $httpProvider ) {
    $httpProvider.defaults.withCredentials = true;
    // $httpProvider.defaults.headers.get = true;
    // $httpProvider.defaults.headers.get_auth['Authorization'] = storage.get('vstoken');
}]);

angular.module('jhmrc.common', ['ngRoute', 'ngResource', 'ngCookies', 'angularLocalStorage']).
    config(['$locationProvider', '$httpProvider', '$routeProvider', function( $locationProvider, $httpProvider, $routeProvider ) {
        
        $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $locationProvider.html5Mode(true);

        // routes
        $routeProvider.when('/', { templateUrl: '/login.tpl.html', controller: 'LoginCtrl' })
            .when('/participant/:id', { templateUrl: '/participant.tpl.html', controller: 'ParticipantCtrl' })
            .when('/reportcard/:id', { templateUrl: '/reportcard.tpl.html', controller: 'ReportCardCtrl' })
            .otherwise({redirectTo: '/'});

            // console.log(this);
}]);

angular.module('jhmrc.login', ['ngMessages', 'ngRoute']);

angular.module('jhmrc.participant', []);
angular.module('jhmrc.reportcard', ['mgcrea.ngStrap.collapse', 'ngAnimate']);

angular.module('jhmrc.common').
    factory("Authentication", ['$resource', '$http', 'storage', function ( $resource, $http, storage ) {

        var _this = this;
        _this.isAuthenticated = false;

        _this.setHttpAuthHeaders = function () {
            $http.defaults.headers.common['Authorization'] = 'VsToken ' + storage.get('vstoken');
        };

        _this.doAuthenticate = function( credentials, redirect ) {
            if ( credentials ) {
                storage.set('mesaId', credentials.mesaId);
                storage.set('vstoken', credentials.token);
                _this.isAuthenticated = true;
            }
            _this.setHttpAuthHeaders();
        };

        _this.authenticateInterceptor = function () {
                return {
                        'response': function ( response ) {
                            _this.doAuthenticate(response.data);
                            return response;
                        },
                        'responseError': function ( rejection ) {
                            alert(rejection.statusText);
                        }
                };
        };

        var Authentication = $resource( Portal.apiEndPoints.authentication, {}, {
            authenticate: { method: "GET", interceptor: _this.authenticateInterceptor() },
            resetPassword: { } // not in use yet
        });

        Authentication.isAuthenticated = function () {
            return _this.isAuthenticated;
        };

        Authentication.completeLogout = function(){
            delete $http.defaults.headers.common['Authorization'];
            storage.set('vstoken', "");
            Authentication.isAuthenticated = false;
        };

        return Authentication;
    }]);

/* global google */
/* global ga */
/* global _gaq */

/**
 * displaying maps
 */
angular.module('jhmrc').config(function($provide) {
    $provide.factory('displayMap', function() {
        return function (elem, attrs) {
            var mapOptions,
                latitude = (attrs && attrs.location) ? attrs.location.latitude : null,
                longitude = (attrs && attrs.location) ? attrs.location.longitude : null,
                address = (attrs && attrs.address1) ? attrs.address1 + " " + attrs.address2 : null,
                map;
            // first create a 'default' map (regardless if lat/long is avail)
            latitude = latitude && parseFloat(latitude, 10) || 43.654832;
            longitude = longitude && parseFloat(longitude, 10) || -110.716465;

            mapOptions = {
                zoom: 15,
                center: new google.maps.LatLng(latitude, longitude)
            };

            map = new google.maps.Map(elem[0], mapOptions);
            // if no lat/long was sent in try geocoding the address
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        };
    });
});

/**
 * update $analyticsProvider to support multiple GA accounts
 */
// angular.module('jhmrc').config(function($analyticsProvider) {
//
//     $analyticsProvider.registerPageTrack(function (path) {
//         if (window._gaq) { _gaq.push(['_trackPageview', path]); }
//         if (window.ga) {
//             ga(function() {
//                 angular.forEach(ga.getAll(),function(t){
//                     ga(t.get('name') + '.send', 'pageview', path);
//                 });
//             });
//         }
//     });
//
//     $analyticsProvider.registerEventTrack(function (action, properties) {
//
//         if (!properties || !properties.category) {
//             return;
//         }
//
//         if(properties.value) {
//           var parsed = parseInt(properties.value, 10);
//           properties.value = isNaN(parsed) ? 0 : parsed;
//         }
//
//         if (window._gaq) {
//           _gaq.push(['_trackEvent', properties.category, action, properties.label, properties.value, properties.noninteraction]);
//         } else if (window.ga) {
//               if (properties.noninteraction) {
//                 angular.forEach(ga.getAll(),function(t) {
//                     ga(t.get('name')+'.send', 'event', properties.category, action, properties.label, properties.value, {nonInteraction: 1});
//                 });
//               } else {
//                 angular.forEach(ga.getAll(),function(t) {
//                     ga(t.get('name')+'.send', 'event', properties.category, action, properties.label, properties.value);
//                 });
//             }
//         }
//       });
// });

/**
 * @note toggles up/down arrow on panle collapse
 */
angular.module('jhmrc').directive('toggleOpenClosed', function(){
    return {
        restrict : "A",
        link : function(scope, element, attrs) {
            element.on('click', function () {
                var _icon = element.find("i");
                if ( _icon.hasClass("fa-toggle-up") ) {
                    _icon.removeClass("fa-toggle-up").addClass("fa-toggle-down");
                } else {
                    _icon.removeClass("fa-toggle-down").addClass("fa-toggle-up");
                }
            });
        }
    };
});

/**
 * @note toggles nav vis
 */
angular.module('jhmrc').directive('toggleNav', function(){
    return {
        restrict : "A",
        link : function(scope, element, attrs) {
            element.on('click', function (evt) { 
                if ( evt.target.tagName === "LI" ) return;
                var _nav = angular.element(document.querySelectorAll("nav.main"));
                _nav.toggleClass("blindUp");
            });
        }
    };
});

/**
 * @note toggles sibling elments' active state
 */
angular.module('jhmrc').directive('toggleSiblingActiveClass', function(){
    return function(scope, element, attr){
        element.on('click', function(){
            var _myself = angular.element(element);
            var _siblings = _myself.parent().parent().children().children();
            _siblings.removeClass('active');
            _myself.addClass('active');
        });
    };
});

/**
 * @note shows 'loading' element
 */
angular.module('jhmrc').directive("loading", function() {
    return {
        restrict : "A",
        link : function(scope, element, attrs) {
            scope.reqCount = 0;
            scope.respCount = 0;

            scope.$on("loading-started", function(e) {
                scope.reqCount ++;
                element.removeClass("hide");
            });
            scope.$on("loading-complete", function(e) {
                scope.respCount ++;
                if (scope.respCount >= scope.reqCount) {
                    element.addClass("hide");
                }
            });
            scope.$on("request-error", function(e) {
                console.log("-------- request-error -------------");
            });
            scope.$on("response-error", function(e) {
                console.log("---------- response-error -------------");
            });
        }
    };
});

/**
 * @note sticky bar
 * Thanks to https://github.com/d-oliveros/angular-sticky
 */
angular.module('jhmrc').directive('sticky', ['$timeout', function($timeout){
        return {
            restrict: 'A',
            scope: {
                offset: '@'
            },
            link: function($scope, $elem, $attrs){
                $timeout(function(){
                    var offsetTop = $scope.offset || 0,
                        $window = angular.element(window),
                        doc = document.documentElement,
                        initialPositionStyle = $elem.css('position'),
                        stickyLine,
                        scrollTop;

                    // Set the top offset
                    $elem.css('top', offsetTop+'px');

                    // Get the sticky line
                    function setInitial(){
                        stickyLine = $elem[0].offsetTop - offsetTop;
                        checkSticky();
                    }

                    // Check if the window has passed the sticky line
                    function checkSticky(){
                        scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

                        if ( scrollTop >= stickyLine ){
                            $elem.css('position', 'fixed');
                        } else {
                            $elem.css('position', initialPositionStyle);
                        }
                    }

                    // Handle the resize event
                    function resize(){
                        $elem.css('position', initialPositionStyle);
                        $timeout(setInitial);
                    }

                    // Attach our listeners
                    $window.on('scroll', checkSticky);
                    $window.on('resize', resize);

                    setInitial();
                });
            }
        };
    }]);



    /**
     * @note display content in modal
     */
    // angular.module('jhmrc').directive("showModalContent", [ "displayMap", "$http", "$compile", function(displayMap, $http, $compile) {
    //     return {
    //         restrict : "A",
    //         link : function(scope, element, attrs) {
    //             element.bind("click", function() {
    //                 angular.element( document.querySelectorAll("#modal-overlay #modal-content #dynamic-content")).html("");
    //                 angular.element( document.querySelectorAll("#modal-overlay #modal-content #dynamic-content")).removeClass("map");
    //                 angular.element( document.querySelectorAll("#modal-overlay") ).toggleClass('hide');
    //
    //                 if ( attrs["showModalContent"] === "map" ) {
    //                     if (scope.item.hotel) {
    //                         var _dynCont = angular.element( document.querySelectorAll("#modal-overlay #modal-content #dynamic-content"));
    //                         var _mapDiv = angular.element("<div class='wrapper'></div>");
    //                         _dynCont.addClass("map");
    //                         _dynCont.append(_mapDiv);
    //
    //                         displayMap( _mapDiv, scope.item.hotel);
    //                     } else {
    //                         angular.element( document.querySelectorAll("#modal-overlay #modal-content #dynamic-content") ).html("Sorry, no map is available for this hotel.");
    //                     }
    //                 } else if ( attrs["includePath"] ) {
    //                     $http({method: 'GET', url: attrs["includePath"]}).
    //                         success(function(data, status, headers, config) {
    //                             var _modal = angular.element( document.querySelectorAll("#modal-overlay #modal-content #dynamic-content") );
    //                             var _element;
    //
    //                             if (attrs["preCompile"] === 'true') {
    //                                 var _html = data;
    //                                 _element = $compile( _html )( scope );
    //                             } else {
    //                                 _element = data;
    //                             }
    //
    //                             _modal.append(_element);
    //                         }).
    //                         error(function(data, status, headers, config) {
    //                             angular.element( document.querySelectorAll("#modal-overlay #modal-content #dynamic-content") ).html("Sorry, no data avilable.");
    //                         });
    //                 } else {
    //                     angular.element( document.querySelectorAll("#modal-overlay #modal-content #dynamic-content") ).html(attrs["showModalContent"]);
    //                 }
    //             });
    //         }
    //     };
    // }]);
    //
    // /**
    //  * @note adds google map
    //  */
    // angular.module('jhmrc').directive("googleMap", [ "displayMap", function(displayMap) {
    //     return {
    //         restrict : "A",
    //         link : function(scope, element, attrs) {
    //             if ( scope.hotel && ( (scope.hotel.address1 && scope.hotel.address1) || (scope.hotel.latitude && scope.hotel.longitude) ) )  {
    //                 displayMap(element, scope.hotel);
    //             } else {
    //                 // detect outside changes and update map
    //                 scope.$on('i-haz-latlong', function () {
    //                     displayMap(element, scope.hotel);
    //                 });
    //             }
    //         }
    //     };
    // }]);

/**
 * Turn a string a handle format ("Any*909234!thing L*./,Ke This" -> anything-like-this")
 */
angular.module('jhmrc').filter('dasherize', function(){
    return function(input){
        return (input || '').replace(/[^a-z0-9\s]/gi,'').replace(' ', '-').toLowerCase();
    };
});

angular.module('jhmrc.common').
    controller('LoginCtrl', ['$scope', '$http', '$location', '$rootScope', 'storage', 'Authentication', function( $scope, $http, $location, $rootScope, storage, Authentication ){

        $scope.submit = function(valid) {
            if ( !valid ) return;
            this.form.submitting = true;
            Authentication.authenticate( angular.extend(this.form.data, {'realm': 'JhmrProCard'}), function ( response ) {
                if ( response.resource.$resolved ) {
                    $location.path("/participant/jclegg");
                }
            });
        };
        
    }]);

angular.module('jhmrc.participant').
    factory("Participant", ['$resource', '$rootScope', 'storage', function ($resource, $rootScope, storage) {

        var Participant = $resource('https://maven.vertservices.net/guest/guests/:mesaId/libraries', { 'mesaId': storage.get('mesaId') }, {
            getLibrary: {
                method: 'GET',
                isArray: true,
                withCredentials: true,
                headers:{'Authorization':'VsToken ' + storage.get('vstoken')}
            }
        });

        // Participant.prototype.getLibrary = function (params, cb) {
        //     // if changes to params are needed do it here
        //     return Participant.getLibrary(params, angular.extend({}, this, {}), cb);
        // };

        return Participant;

    }]);

angular.module('jhmrc.participant').
    controller('ParticipantCtrl', ['$scope', '$http', '$location', 'Participant', 'Authentication', 'storage', function( $scope, $http, $location, Participant, Authentication, storage ){

        // Check if logged in
        if ( !Authentication.isAuthenticated() ) {
            console.log("not logged in");
        }

        $scope.participant = {
            "vistaId": "8ff320d5-8413-4beb-a3e2-9afe0c6d7246",
            "lastName": "Miller",
            "firstName": "Griffin",
            "middleName": "",
            "nickname": "Griff",
            "commonFirstName": "Griff",
            "reportCards": [
              {
                "reportCardId": "08B15088-AF10-4709-A49F-9E15C1D9A958",
                "participantId": "50b8a3a2-e7f6-4787-b433-3169a2eff819",
                "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
                "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
                "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
                "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
                "resort": "Jackson Hole Mountain Resort",
                "resortShortName": "Jackson Hole",
                "resortAcronym": "JHMR",
                "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
                "school": "Jackson Hole Mountain Sports School",
                "schoolShortName": "Mountain Sports School",
                "schoolAcronym": "MSS",
                "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
                "activity": "Jackson Hole Mountain Rippers",
                "activityStartDate": "2014-02-15T09:00:00",
                "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
                "disciplineType": "Ski",
                "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
                "discipline": "Explorer Alpine",
                "disciplineShortName": "Explorer Alp",
                "disciplineAcronym": "ALP-Y",
                "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
                "level": "Wolves",
                "levelShortName": "Level 8",
                "levelAcronym": "L8",
                "levelRank": 8
              },
              {
                "reportCardId": "017dd151-d6cc-4a5f-97d9-0315db6c1234",
                "participantId": "50b8a3a2-e7f6-4787-b433-3169a2ef1234",
                "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
                "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
                "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
                "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
                "resort": "Jackson Hole Mountain Resort",
                "resortShortName": "Jackson Hole",
                "resortAcronym": "JHMR",
                "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
                "school": "Jackson Hole Mountain Sports School",
                "schoolShortName": "Mountain Sports School",
                "schoolAcronym": "MSS",
                "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
                "activity": "Jackson Hole Mountain Rippers",
                "activityStartDate": "2014-02-22T09:00:00",
                "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
                "disciplineType": "Ski",
                "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
                "discipline": "Explorer Alpine",
                "disciplineShortName": "Explorer Alp",
                "disciplineAcronym": "ALP-Y",
                "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
                "level": "Wolves",
                "levelShortName": "Level 8",
                "levelAcronym": "L8",
                "levelRank": 8
              },
              {
                "reportCardId": "017dd151-d6cc-4a5f-97d9-0315db6c6789",
                "participantId": "50b8a3a2-e7f6-4787-b433-3169a2ef6789",
                "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
                "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
                "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
                "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
                "resort": "Jackson Hole Mountain Resort",
                "resortShortName": "Jackson Hole",
                "resortAcronym": "JHMR",
                "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
                "school": "Jackson Hole Mountain Sports School",
                "schoolShortName": "Mountain Sports School",
                "schoolAcronym": "MSS",
                "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
                "activity": "Jackson Hole Mountain Rippers",
                "activityStartDate": "2014-03-01T09:00:00",
                "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
                "disciplineType": "Ski",
                "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
                "discipline": "Explorer Alpine",
                "disciplineShortName": "Explorer Alp",
                "disciplineAcronym": "ALP-Y",
                "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
                "level": "Eagles",
                "levelShortName": "Level 9",
                "levelAcronym": "L9",
                "levelRank": 9
              }
            //   ,
            //   {
            //     "reportCardId": "017dd151-d6cc-4a5f-97d9-0315db6c1111",
            //     "participantId": "50b8a3a2-e7f6-4787-b433-3169a2ef1111",
            //     "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
            //     "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
            //     "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
            //     "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
            //     "resort": "Aspen Snowmass",
            //     "resortShortName": "Aspen",
            //     "resortAcronym": "ASPEN",
            //     "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
            //     "school": "Aspen Ski and Snowboard School",
            //     "schoolShortName": "Aspen Ski School",
            //     "schoolAcronym": "ASS!",
            //     "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
            //     "activity": "XTreme Piping",
            //     "activityStartDate": "2014-02-20T09:00:00",
            //     "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
            //     "disciplineType": "Snowboard",
            //     "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
            //     "discipline": "Park N Pipe",
            //     "disciplineShortName": "P & P",
            //     "disciplineAcronym": "PNP",
            //     "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
            //     "level": "Master",
            //     "levelShortName": "Level 6",
            //     "levelAcronym": "L6",
            //     "levelRank": 6
            //   }
            ],
            connections: [
                {
                  "vistaId": "8ff320d5-8413-4beb-a3e2-9afe0c6d7246",
                  "lastName": "Miller",
                  "firstName": "Riley",
                  "middleName": "",
                  "nickname": "Roo",
                  "commonFirstName": "Roo",
                  "reportCards": [
                    {
                      "reportCardId": "017dd151-d6cc-4a5f-97d9-0315db6c0fad",
                      "participantId": "50b8a3a2-e7f6-4787-b433-3169a2eff819",
                      "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
                      "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
                      "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
                      "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
                      "resort": "Jackson Hole Mountain Resort",
                      "resortShortName": "Jackson Hole",
                      "resortAcronym": "JHMR",
                      "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
                      "school": "Jackson Hole Mountain Sports School",
                      "schoolShortName": "Mountain Sports School",
                      "schoolAcronym": "MSS",
                      "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
                      "activity": "Locals Wednesday Group",
                      "activityStartDate": "2014-02-10T09:00:00",
                      "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
                      "disciplineType": "Ski",
                      "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
                      "discipline": "Rough Rider",
                      "disciplineShortName": "Rough Rider",
                      "disciplineAcronym": "RR",
                      "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
                      "level": "Skye",
                      "levelShortName": "Level 5",
                      "levelAcronym": "L5",
                      "levelRank": 5
                    },
                    {
                      "reportCardId": "017dd151-d6cc-4a5f-97d9-0315db6c1234",
                      "participantId": "50b8a3a2-e7f6-4787-b433-3169a2ef1234",
                      "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
                      "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
                      "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
                      "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
                      "resort": "Jackson Hole Mountain Resort",
                      "resortShortName": "Jackson Hole",
                      "resortAcronym": "JHMR",
                      "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
                      "school": "Jackson Hole Mountain Sports School",
                      "schoolShortName": "Mountain Sports School",
                      "schoolAcronym": "MSS",
                      "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
                      "activity": "Locals Wednesday Group",
                      "activityStartDate": "2014-02-03T09:00:00",
                      "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
                      "disciplineType": "Ski",
                      "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
                      "discipline": "Explorer Alpine",
                      "disciplineShortName": "Explorer Alp",
                      "disciplineAcronym": "ALP-Y",
                      "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
                      "level": "Wolves",
                      "levelShortName": "Level 8",
                      "levelAcronym": "L8",
                      "levelRank": 8
                    }
                  ]
                }
            ]
          };

        $scope.fullName = $scope.participant.firstName + " " + $scope.participant.lastName;

        // $http({
        //     method: 'GET',
        //     withCredentials: true,
        //     url: PortalService.apiEndPoints.library + storage.get('mesaId') + "/libraries",
        //     headers: {
        //         // 'Accept':'application/json',
        //         // 'Content-Type':'application/json; charset=utf-8',
        //         'Authorization':'VsToken ' + storage.get('vstoken')
        //     },
        //     responseType: 'json'
        // })
        // .success(function(data, status, headers, config) {
        //     console.log(data);
        //     // $scope.participant(data);
        // });

        $scope.goToParticipant = function (id) {
            $location.path("/participant/" + id);
        };

        $scope.goToReportCard = function (id) {
            $location.path("/reportcard/" + id);
        };

    }]);

angular.module('jhmrc.participant').
    factory("Participant", ['$resource', '$rootScope', 'storage', function ($resource, $rootScope, storage) {

        var Participant = $resource('https://maven.vertservices.net/guest/guests/:mesaId/libraries', { 'mesaId': storage.get('mesaId') }, {
            getLibrary: {
                method: 'GET',
                isArray: true,
                withCredentials: true,
                headers:{'Authorization':'VsToken ' + storage.get('vstoken')}
            }
        });

        // Participant.prototype.getLibrary = function (params, cb) {
        //     // if changes to params are needed do it here
        //     return Participant.getLibrary(params, angular.extend({}, this, {}), cb);
        // };

        return Participant;

    }]);

angular.module('jhmrc.reportcard').
    factory("ReportCard", ['$resource', function ($resource) {

        return $resource('somepath');

    }]);

angular.module('jhmrc.reportcard').
    controller('ReportCardCtrl', ['$scope', '$http', '$location', '$rootScope', 'ReportCard', function( $scope, $http, $location, $rootScope, ReportCard ){

        $scope.reportcard = {
              "guestReportCardId": "08b15088-af10-4709-a49f-9e15c1d9a958",
              "participantId": "50b8a3a2-e7f6-4787-b433-3169a2eff819",
              "mesaId": "963d7e5f-1e18-4a17-b3c5-a8db0bebe780",
              "vistaId": "8ff320d5-8413-4beb-a3e2-9afe0c6d7246",
              "lastName": "Miller",
              "firstName": "Griffin",
              "middleName": "",
              "nickname": "Griff",
              "commonFirstName": "Griff",
              "ageAsOfActivity": 7,
              "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
              "activity": "Jackson Hole Mountain Rippers",
              "activityStartDate": "2014-02-15T09:00:00",
              "activityEndDate": "2014-02-15T15:30:00",
              "activityDuration": 6.5,
              "activityDescription": "Skiers and snowboarders who are beginners or novices have an ability to excel with kids their own age and ability level, developing their skills and exploring Jackson Hole's versatile terrain.    This program is designed as an alternative for lower level skiers and riders who want to eventually participate in the TVR program.",
              "activityObjectives": "Today we wanted to work on building confidence on skiing steeper terrain with a possible trip up the Gondola, making 'french fry' turns and having FUN!",
              "activityRecap": "In the morning we did fun ski drills intended to bring skis together for French fry turns, like thumper turns, jumping after turns (being rabbits), practiced hockey stops, side slipping and side stepping uphill, squishing a bag of cookies in between our legs.  We alternated drill runs and then animal trail runs as the reward.  After lunch, the kids who seemed ready and wanted to go up the Gondola went up the Gondola.  The kids not ready stayed inside and played games.  We took the cat track all the way down to Ampitheater, skied the Ampitheater roll over...the hardest part, to the bottom of Thunder, where we took South Pass Traverse all the way down to Teewinot.  We took a break and skied animal trails again as the big reward!",
              "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
              "disciplineType": "Ski",
              "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
              "discipline": "Explorer Alpine",
              "disciplineShortName": "Explorer Alp",
              "disciplineAcronym": "ALP-Y",
              "level": "Wolves",
              "levelShortName": "Level 8",
              "levelAcronym": "L8",
              "levelRank": 8,
              "levelProficiencyId": "e05bc5c3-ff37-4357-b15e-830ef0071a38",
              "levelProficiency": "Developing Skills",
              "levelProficiencyShortName": "Developing",
              "levelProficiencyAcronym": "2",
              "levelProficiencyRank": 2,
              "attendanceStatusId": "abcde7a7-4706-4468-9b89-cbae8e8fd555",
              "attendanceStatus": "Attended",
              "attendanceStatusShortName": "Attended",
              "attendanceStatusDescription": "Participated fully in the session.",
              "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
              "resort": "Jackson Hole Mountain Resort",
              "resortShortName": "Jackson Hole",
              "resortAcronym": "JHMR",
              "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
              "school": "Jackson Hole Mountain Sports School",
              "schoolShortName": "Mountain Sports School",
              "schoolAcronym": "MSS",
              "instructors": [
                {
                  "instructorId": "0600bf44-af23-4249-99ee-475bb5fab991",
                  "lastName": "Moe",
                  "firstName": "Thomas",
                  "middleName": "",
                  "nickname": "Tommy",
                  "commonFirstName": "Tommy"
                }
              ],
              "lifts": [
                {
                  "liftId": "bc0a1e78-2284-4d67-aa2e-2f8448ae341c",
                  "name": "Aerial Tram",
                  "shortName": "Tram",
                  "acronym": "TRAM",
                  "description": "2.4 miles long. 9 minutes. Serving...",
                  "baseElevation": 0,
                  "summitElevation": 0,
                  "elevationGain": 4139
                },
                {
                  "liftId": "bc0a1e78-2284-4d67-aa2e-2f8448ae341c",
                  "name": "Aerial Tram",
                  "shortName": "Tram",
                  "acronym": "TRAM",
                  "description": "2.4 miles long. 9 minutes. Serving...",
                  "baseElevation": 0,
                  "summitElevation": 0,
                  "elevationGain": 4139
                },
                {
                  "liftId": "ddf89ca8-6fda-459e-9e48-0819d05ab9ab",
                  "name": "Sweetwater",
                  "shortName": "Sweetwater",
                  "acronym": "SWEET",
                  "description": "2,517 feet long. 6 minutes. Serving...",
                  "baseElevation": 0,
                  "summitElevation": 0,
                  "elevationGain": 1065
                },
                {
                  "liftId": "bc0a1e78-2284-4d67-aa2e-2f8448ae341c",
                  "name": "Aerial Tram",
                  "shortName": "Tram",
                  "acronym": "TRAM",
                  "description": "2.4 miles long. 9 minutes. Serving...",
                  "baseElevation": 0,
                  "summitElevation": 0,
                  "elevationGain": 4139
                },
                {
                  "liftId": "353eca17-eded-49af-bc71-1ada1a714101",
                  "name": "Marmot",
                  "shortName": "Marmot",
                  "acronym": "MARM",
                  "description": "3,281 feet long. 7 minutes. Serving...",
                  "baseElevation": 0,
                  "summitElevation": 0,
                  "elevationGain": 1208
                }
              ],
              "terrains": [
                {
                  "terrainId": "39989d6a-8178-4af8-8a3b-d7da37d2e540",
                  "name": "Chutes",
                  "shortName": "Chutes",
                  "acronym": "CHU",
                  "description": "Chutes"
                },
                {
                  "terrainId": "39989d6a-8178-4af8-8a3b-d7da37d2e540",
                  "name": "Bumps",
                  "shortName": "Bumps",
                  "acronym": "BMP",
                  "description": "Bumps"
                },
                {
                  "terrainId": "39989d6a-8178-4af8-8a3b-d7da37d2e540",
                  "name": "Double Black Diamond",
                  "shortName": "Double Black",
                  "acronym": "BD2",
                  "description": "Double Black Diamond"
                },
                {
                  "terrainId": "39989d6a-8178-4af8-8a3b-d7da37d2e540",
                  "name": "Trees",
                  "shortName": "Trees",
                  "acronym": "TRE",
                  "description": "Trees"
                }
              ],
              "milestones": [
                {
                  "milestoneId": "9717290e-d534-4237-8743-7ecadaf90f69",
                  "sortOrder": 1,
                  "name": "Can link parallel turns on most terrain",
                  "shortName": "Link turns",
                  "acronym": "Link turns",
                  "description": "Can link parallel turns on most terrain",
                  "achievedOn": "2015-06-12T00:00:00",
                  "proficiencyId": "dcf5a043-f01b-45e2-9978-4a3d0ab4b0f9",
                  "proficiency": "Mastered",
                  "proficiencyShortName": "Mastered",
                  "proficiencyAcronym": "MASTER",
                  "proficiencyDescription": "Has mastered the concept or skill.",
                  "percentageComplete": 100,
                  "certifierLastName": "Williams",
                  "certifierFirstName": "Jim",
                  "certifierMiddleName": "",
                  "certifierNickname": "",
                  "certifierCommonFirstName": "Jim"
                },
                {
                  "milestoneId": "9717290e-d534-4237-8743-7ecadaf90f69",
                  "sortOrder": 2,
                  "name": "Can hop turn",
                  "shortName": "Hop turn",
                  "acronym": "Hop turn",
                  "description": "Can hop turn",
                  "achievedOn": "2015-06-12T00:00:00",
                  "proficiencyId": "dcf5a043-f01b-45e2-9978-4a3d0ab4b0f9",
                  "proficiency": "Introduced",
                  "proficiencyShortName": "Introduced",
                  "proficiencyAcronym": "INTRO",
                  "proficiencyDescription": "The concept or skill has been introduced.",
                  "percentageComplete": 25,
                  "certifierLastName": "Moe",
                  "certifierFirstName": "Tommy",
                  "certifierMiddleName": "",
                  "certifierNickname": "Tommy",
                  "certifierCommonFirstName": "Tommy"
                },
                {
                  "milestoneId": "9717290e-d534-4237-8743-7ecadaf90f69",
                  "sortOrder": 3,
                  "name": "Can make carved turns using edging movements",
                  "shortName": "Carved turns",
                  "acronym": "Carved turns",
                  "description": "Can make carved turns using edging movements",
                  "achievedOn": "2015-06-12T00:00:00",
                  "proficiencyId": "dcf5a043-f01b-45e2-9978-4a3d0ab4b0f9",
                  "proficiency": "Accomplishing",
                  "proficiencyShortName": "Accomplishing",
                  "proficiencyAcronym": "ACCOM",
                  "proficiencyDescription": "Accomplishing...",
                  "percentageComplete": 75,
                  "certifierLastName": "Moe",
                  "certifierFirstName": "Tommy",
                  "certifierMiddleName": "",
                  "certifierNickname": "Tommy",
                  "certifierCommonFirstName": "Tommy"
                }
              ],
              "feedback": [
                {
                  "feedbackId": "ca8fc7ff-cce1-4fc7-9ff1-5ae7e5fafc2c",
                  "comment": "Congratulations Griff on your first run down the Rendezvous Bowl from the top of the tram! It's a big step and a great hurdle to overcome. Griff did great today, working to extend the confidence he has on blue groomed runs to black terrain. Technical focus on arm position and incorporating pole plants.\n\nBacon ipsum dolor amet jerky cow esse ball tip dolore. Id commodo eiusmod laborum, kielbasa flank boudin aliquip irure sunt pork chop consectetur ham cupim. ",
                  "commenterLastName": "Moe",
                  "commenterFirstName": "Tommy",
                  "commenterMiddleName": "",
                  "commenterNickname": "Tommy",
                  "commenterCommonFirstName": "Tommy"
              },
              {
                  "feedbackId": "ca8fc7ff-cce1-4fc7-9ff1",
                  "comment": "We know you're dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Wait a minute - you've been declared dead. You can't give orders around here. The game's not big enough unless it scares you a little. You bet I'm agitated! I may be surrounded by insanity, but I am not insane. Mr. Worf, you do remember how to fire phasers?",
                  "commenterLastName": "Kirk",
                  "commenterFirstName": "James",
                  "commenterMiddleName": "",
                  "commenterNickname": "Tommy",
                  "commenterCommonFirstName": "Tommy"
              }
              ],
              "interestedParties": [
                {
                  "interestedPartyId": "9ddeffe4-f765-4f4f-b980-2e6817664f9b",
                  "lastName": "Miller",
                  "firstName": "Ingrid",
                  "middleName": "",
                  "nickname": "",
                  "commonFirstName": "Ingrid",
                  "relationship": "Mother"
                },
                {
                  "interestedPartyId": "9ddeffe4-f765-4f4f-b980-2e6817664f9b",
                  "lastName": "Miller",
                  "firstName": "Daniel",
                  "middleName": "",
                  "nickname": "Dan",
                  "commonFirstName": "Dan",
                  "relationship": "Father"
                },
                {
                  "interestedPartyId": "9ddeffe4-f765-4f4f-b980-2e6817664f9b",
                  "lastName": "Stiegler",
                  "firstName": "Resi",
                  "middleName": "",
                  "nickname": "",
                  "commonFirstName": "Resi",
                  "relationship": "Racing Coach"
                }
              ]
            };

            // Cycle through lifts ridden to get a count of laps
            var _liftReps = {};
            var _lifts = [];
            var _totalVert = 0;
            $scope.reportcard.lifts.forEach(function(obj) {
                var key = JSON.stringify(obj)
                _liftReps[key] = (_liftReps[key] || 0) + 1;
                _totalVert += obj.elevationGain;
            })

            for ( var liftStr in _liftReps ) {
                var _lift = JSON.parse(liftStr);
                _lift.laps = _liftReps[liftStr];
                _lifts.push(_lift);
            }
            $scope.lifts = _lifts;
            $scope.totalVert = _totalVert;
    }]);

angular.module('jhmrc.reportcard').
    factory("ReportCard", ['$resource', function ($resource) {

        return $resource('somepath');

    }]);

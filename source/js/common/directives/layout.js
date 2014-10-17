
/**
 * @note toggles sibling elments' active state
 */
angular.module('obiWan').directive('toggleSiblingActiveClass', function(){
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
angular.module('obiWan').directive("loading", function() {
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
angular.module('obiWan').directive('sticky', ['$timeout', function($timeout){
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
    // angular.module('obiWan').directive("showModalContent", [ "displayMap", "$http", "$compile", function(displayMap, $http, $compile) {
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
    // angular.module('obiWan').directive("googleMap", [ "displayMap", function(displayMap) {
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

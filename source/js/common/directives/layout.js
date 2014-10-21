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

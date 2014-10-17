

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

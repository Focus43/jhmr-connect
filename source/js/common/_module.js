angular.module('jhmrc.common', ['portalService', 'ngCookies'])

.config(['$httpProvider', function( $httpProvider ) {
    $httpProvider.defaults.withCredentials = true;
}]);

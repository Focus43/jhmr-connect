angular.module('jhmrc.common', ['portalService', 'ngCookies', 'ngBiscuit'])

.config(['$httpProvider', function( $httpProvider ) {
    $httpProvider.defaults.withCredentials = true;
}]);

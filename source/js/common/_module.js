angular.module('jhmrc.common', ['angularLocalStorage'])

.config(['$httpProvider', function( $httpProvider ) {
    $httpProvider.defaults.withCredentials = true;
    // $httpProvider.defaults.headers.get = true;
    // $httpProvider.defaults.headers.get_auth['Authorization'] = storage.get('vstoken');
}]);

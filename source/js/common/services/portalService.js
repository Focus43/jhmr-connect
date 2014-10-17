angular.module('portalService', ['ngRoute', 'ngResource']).
    config(['$locationProvider', '$httpProvider', '$routeProvider', function( $locationProvider, $httpProvider, $routeProvider ){

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $locationProvider.html5Mode(true);

        // routes
        $routeProvider.when('/', { templateUrl: '/login.html', controller: 'LoginCtrl' })
            .when('/participant/:name', { templateUrl: '/participant.html', controller: 'ParticipantCtrl' })
            .otherwise({redirectTo: '/'});
    }]);

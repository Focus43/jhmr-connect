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

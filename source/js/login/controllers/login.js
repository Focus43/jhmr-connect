angular.module('jhmrc.login').
    controller('LoginCtrl', ['$scope', '$http', '$location', '$rootScope', '$cookies', 'Login', function( $scope, $http, $location, $rootScope, $cookies, Login ){

        $scope.submit = function(valid) {
            if ( !valid ) return;
            this.form.submitting = true;
            Login.authenticate( angular.extend(this.form.data, {'realm': 'JhmrProCard'}), function ( response ) {
                if ( response.token && response.mesaId ) {
                    $rootScope.mesaId = response.mesaId;
                    document.cookie = "VsToken=" + response.token + ";domain=.vertservices.net";
                    $rootScope.$broadcast("i-haz-success");
                    $location.path("/participant/mememe");
                } else if ( response.error ) {
                    $scope.errorMessage = response.error + ": " + response.error.description;
                    alert($scope.errorMessage);
                    // TODO: replace with:
                    // $rootScope.$broadcast("i-haz-error");
                }
            });
        };
    }]);

angular.module('jhmrc.login').
    controller('LoginCtrl', ['$scope', '$http', '$location', '$rootScope', 'Login', function( $scope, $http, $location, $rootScope, Login ){

        $scope.submit = function(valid) {
            if ( !valid ) return;

            this.form.submitting = true;

            Login.authenticate( self.data, function ( response ) {
                console.log(response);
                if ( response.status && response.status === "success" ) {
                    $rootScope.$broadcast("i-haz-success");
                    $location.path("/participant/mememe");
                } else if ( response.status && response.status === "failure" ) {
                    $scope.errorMessage = response.message;
                    $rootScope.$broadcast("i-haz-error");
                }
            });
        };
    }]);

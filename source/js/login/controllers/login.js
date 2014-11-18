angular.module('jhmrc.common').
    controller('LoginCtrl', ['$scope', '$http', '$location', '$rootScope', 'storage', 'Authentication', function( $scope, $http, $location, $rootScope, storage, Authentication ){
        $scope.submit = function(valid) {
            if ( !valid ) return;
            this.form.submitting = true;
            Authentication.authenticate( angular.extend(this.form.data, {'realm': 'JhmrProCard'}), function ( response ) {
                if ( response.resource.$resolved ) {
                    $location.path("/participant/jclegg");
                }
            });
        };
    }]);

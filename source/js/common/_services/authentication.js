angular.module('jhmrc.common').
    factory("Authentication", ['$resource', '$http', 'storage', function ( $resource, $http, storage ) {

        var _this = this;
        _this.isAuthenticated = false;

        _this.setHttpAuthHeaders = function () {
            $http.defaults.headers.common['Authorization'] = 'VsToken ' + storage.get('vstoken');
        };

        _this.doAuthenticate = function( credentials, redirect ) {
            if ( credentials ) {
                storage.set('mesaId', credentials.mesaId);
                storage.set('vstoken', credentials.token);
                _this.isAuthenticated = true;
            }
            _this.setHttpAuthHeaders();
        };

        _this.authenticateInterceptor = function () {
                return {
                        'response': function ( response ) {
                            _this.doAuthenticate(response.data);
                            return response;
                        },
                        'responseError': function ( rejection ) {
                            alert(rejection.statusText);
                        }
                };
        };

        var Authentication = $resource( Portal.apiEndPoints.authentication, {}, {
            authenticate: { method: "GET", interceptor: _this.authenticateInterceptor() },
            resetPassword: { } // not in use yet
        });

        Authentication.isAuthenticated = function () {
            return _this.isAuthenticated;
        };

        Authentication.completeLogout = function(){
            delete $http.defaults.headers.common['Authorization'];
            storage.set('vstoken', "");
            Authentication.isAuthenticated = false;
        };

        return Authentication;
    }]);

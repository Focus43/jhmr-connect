angular.module('portalService', ['ngResource']).
    factory("Login", ['$resource', function ($resource) {

        var Login = $resource('http://login.com', {}, {
            authenticate: { method: "GET" },
            resetPassword: { }
        });

        Login.prototype.authenticate = function (params, cb) {
            // if changes to params are needed do it here
            return Login.authenticate(params, angular.extend({}, this, {}), cb);
        };

        return Login;
    }]);

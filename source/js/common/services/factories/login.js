angular.module('portalService').
    factory("Login", ['$resource', function ($resource) {

        var Login = $resource('http://authenticate-jhmr.com', {}, {
            authenticate: { method: "GET" },
            resetPassword: { }
        });

        Login.prototype.authenticate = function (params, cb) {
            // if changes to params are needed do it here
            return Login.authenticate(params, angular.extend({}, this, {}), cb);
        };

        return Login;
    }]);

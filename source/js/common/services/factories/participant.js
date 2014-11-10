angular.module('portalService').
    factory("Participant", ['$resource', '$rootScope', function ($resource, $rootScope) {

        var Participant = $resource('https://maven.vertservices.net/guest/guests/:mesaId/libraries', {}, {
            getLibrary: { method: 'GET', params: {}, withCredentials : true }
        });

        Participant.prototype.getLibrary = function (params, cb) {
            // if changes to params are needed do it here
            return Participant.getLibrary(params, angular.extend({}, this, {}), cb);
        };

        return Participant;

    }]);

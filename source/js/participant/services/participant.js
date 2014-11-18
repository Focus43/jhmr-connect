angular.module('jhmrc.participant').
    factory("Participant", ['$resource', '$rootScope', 'storage', function ($resource, $rootScope, storage) {

        var Participant = $resource('https://maven.vertservices.net/guest/guests/:mesaId/libraries', { 'mesaId': storage.get('mesaId') }, {
            getLibrary: {
                method: 'GET',
                isArray: true,
                withCredentials: true,
                headers:{'Authorization':'VsToken ' + storage.get('vstoken')}
            }
        });

        // Participant.prototype.getLibrary = function (params, cb) {
        //     // if changes to params are needed do it here
        //     return Participant.getLibrary(params, angular.extend({}, this, {}), cb);
        // };

        return Participant;

    }]);

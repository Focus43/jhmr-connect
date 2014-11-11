angular.module('portalService').
    factory("Participant", ['$resource', '$rootScope', 'storage', function ($resource, $rootScope, storage) {

        var Participant = $resource('https://maven.vertservices.net/guest/guests/:mesaId/libraries', { 'mesaId': storage.get('mesaId') }, {
            getLibrary: {
                method: 'GET',
                isArray: true,
                withCredentials: true,
                headers:{   'Authorization':'VsToken ' + storage.get('vstoken'),
                            'Accept':'application/json',
                            'Content-Type':'application/json; charset=utf-8', }
            }
        });

        // Participant.prototype.getLibrary = function (params, cb) {
        //     // if changes to params are needed do it here
        //     return Participant.getLibrary(params, angular.extend({}, this, {}), cb);
        // };

        return Participant;

    }]);

angular.module('portalService').
    factory("Participant", ['$resource', function ($resource) {

        return $resource('somepath');

    }]);

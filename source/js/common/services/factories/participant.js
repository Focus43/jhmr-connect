angular.module('portalService', ['ngResource']).
    factory("Participant", ['$resource', function ($resource) {

        return $resource('somepath');

    }]);

angular.module('portalService').
    factory("ReportCard", ['$resource', function ($resource) {

        return $resource('somepath');

    }]);

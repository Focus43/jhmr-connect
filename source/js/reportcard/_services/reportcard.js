angular.module('jhmrc.reportcard').
    factory("ReportCard", ['$resource', function ($resource) {

        return $resource('somepath');

    }]);

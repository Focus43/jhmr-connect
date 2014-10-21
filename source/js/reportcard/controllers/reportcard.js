angular.module('jhmrc.reportcard').
    controller('ReportCardCtrl', ['$scope', '$http', '$location', '$rootScope', 'ReportCard', function( $scope, $http, $location, $rootScope, ReportCard ){

        $scope.reportcard = {
            ParticipantFirstName: "Charlie",
            ParticipantLastName: "Hagen",
            date: "03/05/2014",
            classDescr: "6-9 yr old",
            level: "6",
            lifts: [
                { liftname: "Tram", vert: "800" },
                { liftname: "Gondola", vert: "500" }
            ],
            skills: [
                { skill: "turn", completed: "4" },
                { skill: "hucking", completed: "2" },
                { skill: "backflip", completed: "3" },
                { skill: "method", completed: "1" },
            ]
        };

    }]);

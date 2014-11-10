angular.module('jhmrc.participant').
    controller('ParticipantCtrl', ['$scope', '$http', '$location', '$rootScope', 'Participant', function( $scope, $http, $location, $rootScope, Participant ){

        // $scope.participant = {
        //     ParticipantFirstName: "Charlie",
        //     ParticipantLastName: "Hagen",
        //     level: "6",
        //     connections: [
        //         { ParticipantFirstName: "Tiny", ParticipantLastName: "Hagen", level: "8" },
        //         { ParticipantFirstName: "Martin", ParticipantLastName: "Hagen", level: "7" }
        //     ],
        //     reportCards: [
        //         { ParticipantFirstName: "Charlie", ParticipantLastName: "Hagen", level: "8" },
        //         { ParticipantFirstName: "Charlie", ParticipantLastName: "Hagen", level: "7" },
        //         { ParticipantFirstName: "Charlie", ParticipantLastName: "Hagen", level: "6" }
        //     ]
        // };
        //
        // $scope.fullName = $scope.participant.ParticipantFirstName + " " + $scope.participant.ParticipantLastName;
        $scope.participant = Participant.getLibrary( { mesaId: $rootScope.mesaId }, function (data) {
            console.log(data);
        });

        $scope.goToParticipant = function (id) {
            $location.path("/participant/" + id);
        };

        $scope.goToReportCard = function (id) {
            $location.path("/reportcard/" + id);
        };

    }]);

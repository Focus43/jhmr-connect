angular.module('jhmrc.participant').
    controller('ParticipantCtrl', ['$scope', '$http', '$location', '$rootScope', 'Participant', function( $scope, $http, $location, $rootScope, Participant ){

        $scope.participant = {
            ParticipantFirstName: "Charlie",
            ParticipantLastName: "Hagen",
            level: "6",
            connections: [
                { ParticipantFirstName: "Tiny", ParticipantLastName: "Hagen", level: "8" },
                { ParticipantFirstName: "Martin", ParticipantLastName: "Hagen", level: "7" }
            ]
        };

        $scope.fullName = $scope.participant.ParticipantFirstName + " " + $scope.participant.ParticipantLastName;

        $scope.goToReportCard = function (cardId) {
            $location.path("/reportcard/" + cardId);
        }

    }]);

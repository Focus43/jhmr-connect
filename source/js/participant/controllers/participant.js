angular.module('jhmrc.participant').
    controller('ParticipantCtrl', ['$scope', '$http', '$location', '$rootScope', 'Participant', function( $scope, $http, $location, $rootScope, Participant ){

        $scope.fullName = $scope.participant.ParticipantFirstName + " " + $scope.participant.ParticipantLastName;

        $scope.goToReportCard = function (cardId) {
            $location.path("/reportcard/" + cardId);
        }

    }]);

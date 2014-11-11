angular.module('jhmrc.participant').
    controller('ParticipantCtrl', ['$scope', '$http', '$location', 'Participant', function( $scope, $http, $location, Participant ){

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


        $scope.participant = Participant.getLibrary( { }, function (data) {
            console.log(data);
        });

        Participant.getLibrary()
            .$promise.then(function(lib) {
                $scope.participantLib = lib;
                console.log(lib);
            });


        // $http({
        //     method: 'GET',
        //     withCredentials: true,
        //     url: "https://maven.vertservices.net/guest/guests/58f8f606-41e8-4d22-9e45-32be9af3c5e4/libraries",
            // headers:{
                // 'Accept':'application/json',
                // 'Content-Type':'application/json; charset=utf-8',
            //     'Authorization':'VsToken ' + $rootScope.vstoken
            // }
        // })
        // .success(function(data, status, headers, config) {
        //     // handle data
        //     console.log(data);
        //     console.log(status);
        //     console.log(headers());
        //     console.log(config);
        // })
        // .error(function(data, status, headers, config) {
        //     // handle error
        //     console.log(data);
        //     console.log(status);
        //     console.log(headers);
        //     console.log(config);
        // });

        $scope.goToParticipant = function (id) {
            $location.path("/participant/" + id);
        };

        $scope.goToReportCard = function (id) {
            $location.path("/reportcard/" + id);
        };

    }]);

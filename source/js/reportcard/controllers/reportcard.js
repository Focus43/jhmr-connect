angular.module('jhmrc.reportcard').
    controller('ReportCardCtrl', ['$scope', '$http', '$location', '$rootScope', 'ReportCard', function( $scope, $http, $location, $rootScope, ReportCard ){

        $scope.reportcard = {
            participantFirstName: "Charlie",
            participantLastName: "Hagen",

            date: "03/05/2014",
            classDescr: "6-9 yr old",

            level: {
                discipline: "Alpine",
                rank: "2",
                shortName: "Level 2"
            },

            terrain: [
                { name: "Bumps", acronym: "BMP" },
                { name: "Chutes", acronym: "CHU" },
                { name: "Powder", acronym: "POW" }
            ],

            lifts: [
                { liftId: "bc0a1e78-2284-4d67-aa2e-2f8448ae341c", acronym: "TRAM", name: "Tram", elevationGain: "4800" },
                { liftId: "bc0a1e78-2284-4d67-aa2e-2f8448ae341c", acronym: "SUBL", name: "Sublette", elevationGain: "800" },
                { liftId: "bc0a1e78-2284-4d67-aa2e-2f8448ae341c", acronym: "GONDY", name: "Gondola", elevationGain: "500" }
            ],

            skills: [
                { level: "Making Turns on Green Terrain", levelRank: "4", description: "Pressure management in bumps, powder, trees and the steeps" },
                { level: "hucking", levelRank: "2", description: "Pressure management in bumps, powder, trees and the steeps" },
                { level: "backflip", levelRank: "3", description: "Pressure management in bumps, powder, trees and the steeps" },
                { level: "method", levelRank: "1", description: "Pressure management in bumps, powder, trees and the steeps" },
                { level: "Dynamic Short Radius Parallel", levelRank: "3", description: "Varying turn rhythm and shape for terrain and conditions" }
            ]
        };

    }]);

angular.module('jhmrc.participant').
    controller('ParticipantCtrl', ['$scope', '$http', '$location', 'Participant', 'storage', function( $scope, $http, $location, Participant, storage ){

        $scope.participant = {
            "vistaId": "8ff320d5-8413-4beb-a3e2-9afe0c6d7246",
            "lastName": "Miller",
            "firstName": "Griffen",
            "middleName": "",
            "nickname": "Griff",
            "commonFirstName": "Griff",
            "reportCards": [
              {
                "reportCardId": "08B15088-AF10-4709-A49F-9E15C1D9A958",
                "participantId": "50b8a3a2-e7f6-4787-b433-3169a2eff819",
                "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
                "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
                "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
                "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
                "resort": "Jackson Hole Mountain Resort",
                "resortShortName": "Jackson Hole",
                "resortAcronym": "JHMR",
                "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
                "school": "Jackson Hole Mountain Sports School",
                "schoolShortName": "Mountain Sports School",
                "schoolAcronym": "MSS",
                "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
                "activity": "Jackson Hole Mountain Rippers",
                "activityStartDate": "2014-02-15T09:00:00",
                "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
                "disciplineType": "Ski",
                "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
                "discipline": "Explorer Alpine",
                "disciplineShortName": "Explorer Alp",
                "disciplineAcronym": "ALP-Y",
                "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
                "level": "Wolves",
                "levelShortName": "Level 8",
                "levelAcronym": "L8",
                "levelRank": 8
              },
              {
                "reportCardId": "017dd151-d6cc-4a5f-97d9-0315db6c1234",
                "participantId": "50b8a3a2-e7f6-4787-b433-3169a2ef1234",
                "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
                "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
                "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
                "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
                "resort": "Jackson Hole Mountain Resort",
                "resortShortName": "Jackson Hole",
                "resortAcronym": "JHMR",
                "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
                "school": "Jackson Hole Mountain Sports School",
                "schoolShortName": "Mountain Sports School",
                "schoolAcronym": "MSS",
                "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
                "activity": "Jackson Hole Mountain Rippers",
                "activityStartDate": "2014-02-22T09:00:00",
                "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
                "disciplineType": "Ski",
                "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
                "discipline": "Explorer Alpine",
                "disciplineShortName": "Explorer Alp",
                "disciplineAcronym": "ALP-Y",
                "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
                "level": "Wolves",
                "levelShortName": "Level 8",
                "levelAcronym": "L8",
                "levelRank": 8
              },
              {
                "reportCardId": "017dd151-d6cc-4a5f-97d9-0315db6c6789",
                "participantId": "50b8a3a2-e7f6-4787-b433-3169a2ef6789",
                "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
                "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
                "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
                "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
                "resort": "Jackson Hole Mountain Resort",
                "resortShortName": "Jackson Hole",
                "resortAcronym": "JHMR",
                "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
                "school": "Jackson Hole Mountain Sports School",
                "schoolShortName": "Mountain Sports School",
                "schoolAcronym": "MSS",
                "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
                "activity": "Jackson Hole Mountain Rippers",
                "activityStartDate": "2014-03-01T09:00:00",
                "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
                "disciplineType": "Ski",
                "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
                "discipline": "Explorer Alpine",
                "disciplineShortName": "Explorer Alp",
                "disciplineAcronym": "ALP-Y",
                "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
                "level": "Eagles",
                "levelShortName": "Level 9",
                "levelAcronym": "L9",
                "levelRank": 9
              },
              {
                "reportCardId": "017dd151-d6cc-4a5f-97d9-0315db6c1111",
                "participantId": "50b8a3a2-e7f6-4787-b433-3169a2ef1111",
                "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
                "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
                "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
                "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
                "resort": "Aspen Snowmass",
                "resortShortName": "Aspen",
                "resortAcronym": "ASPEN",
                "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
                "school": "Aspen Ski and Snowboard School",
                "schoolShortName": "Aspen Ski School",
                "schoolAcronym": "ASS!",
                "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
                "activity": "XTreme Piping",
                "activityStartDate": "2014-02-20T09:00:00",
                "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
                "disciplineType": "Snowboard",
                "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
                "discipline": "Park N Pipe",
                "disciplineShortName": "P & P",
                "disciplineAcronym": "PNP",
                "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
                "level": "Master",
                "levelShortName": "Level 6",
                "levelAcronym": "L6",
                "levelRank": 6
              }
            ],
            connections: [
                {
                  "vistaId": "8ff320d5-8413-4beb-a3e2-9afe0c6d7246",
                  "lastName": "Miller",
                  "firstName": "Riley",
                  "middleName": "",
                  "nickname": "Roo",
                  "commonFirstName": "Roo",
                  "reportCards": [
                    {
                      "reportCardId": "017dd151-d6cc-4a5f-97d9-0315db6c0fad",
                      "participantId": "50b8a3a2-e7f6-4787-b433-3169a2eff819",
                      "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
                      "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
                      "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
                      "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
                      "resort": "Jackson Hole Mountain Resort",
                      "resortShortName": "Jackson Hole",
                      "resortAcronym": "JHMR",
                      "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
                      "school": "Jackson Hole Mountain Sports School",
                      "schoolShortName": "Mountain Sports School",
                      "schoolAcronym": "MSS",
                      "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
                      "activity": "Locals Wednesday Group",
                      "activityStartDate": "2014-02-10T09:00:00",
                      "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
                      "disciplineType": "Ski",
                      "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
                      "discipline": "Rough Rider",
                      "disciplineShortName": "Rough Rider",
                      "disciplineAcronym": "RR",
                      "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
                      "level": "Skye",
                      "levelShortName": "Level 5",
                      "levelAcronym": "L5",
                      "levelRank": 5
                    },
                    {
                      "reportCardId": "017dd151-d6cc-4a5f-97d9-0315db6c1234",
                      "participantId": "50b8a3a2-e7f6-4787-b433-3169a2ef1234",
                      "realmId": "593c95cc-21b7-4891-850f-8278cdcf8c0a",
                      "domainId": "cc5c2d52-3190-42e3-a4ab-268168bb1582",
                      "domainParentId": "da6b56d5-2c1c-4316-8778-58550cc67b76",
                      "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
                      "resort": "Jackson Hole Mountain Resort",
                      "resortShortName": "Jackson Hole",
                      "resortAcronym": "JHMR",
                      "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
                      "school": "Jackson Hole Mountain Sports School",
                      "schoolShortName": "Mountain Sports School",
                      "schoolAcronym": "MSS",
                      "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
                      "activity": "Locals Wednesday Group",
                      "activityStartDate": "2014-02-03T09:00:00",
                      "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
                      "disciplineType": "Ski",
                      "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
                      "discipline": "Explorer Alpine",
                      "disciplineShortName": "Explorer Alp",
                      "disciplineAcronym": "ALP-Y",
                      "levelId": "32855a78-5b10-463a-85af-f8420cf10f63",
                      "level": "Wolves",
                      "levelShortName": "Level 8",
                      "levelAcronym": "L8",
                      "levelRank": 8
                    }
                  ]
                }
            ]
          };

        $scope.fullName = $scope.participant.firstName + " " + $scope.participant.lastName;

        $http({
            method: 'GET',
            withCredentials: true,
            url: "https://maven.vertservices.net/guest/guests/"+ storage.get('mesaId') + "/libraries",
            headers: {
                // 'Accept':'application/json',
                // 'Content-Type':'application/json; charset=utf-8',
                'Authorization':'VsToken ' + storage.get('vstoken')
            },
            responseType: 'json'
        })
        .success(function(data, status, headers, config) {
            console.log(data);
            // $scope.participant(data);
        });

        $scope.goToParticipant = function (id) {
            $location.path("/participant/" + id);
        };

        $scope.goToReportCard = function (id) {
            $location.path("/reportcard/" + id);
        };

    }]);

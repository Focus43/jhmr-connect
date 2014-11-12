angular.module('jhmrc.reportcard').
    controller('ReportCardCtrl', ['$scope', '$http', '$location', '$rootScope', 'ReportCard', function( $scope, $http, $location, $rootScope, ReportCard ){

        $scope.reportcard = {
              "guestReportCardId": "08b15088-af10-4709-a49f-9e15c1d9a958",
              "participantId": "50b8a3a2-e7f6-4787-b433-3169a2eff819",
              "mesaId": "963d7e5f-1e18-4a17-b3c5-a8db0bebe780",
              "vistaId": "8ff320d5-8413-4beb-a3e2-9afe0c6d7246",
              "lastName": "Miller",
              "firstName": "Griffen",
              "middleName": "",
              "nickname": "Griff",
              "commonFirstName": "Griff",
              "ageAsOfActivity": 7,
              "activityId": "8e994051-f072-4d92-8408-72e3cc098402",
              "activity": "Jackson Hole Mountain Rippers",
              "activityStartDate": "2014-02-15T09:00:00",
              "activityEndDate": "2014-02-15T15:30:00",
              "activityDuration": 6.5,
              "activityDescription": "Skiers and snowboarders who are beginners or novices have an ability to excel with kids their own age and ability level, developing their skills and exploring Jackson Hole's versatile terrain.    This program is designed as an alternative for lower level skiers and riders who want to eventually participate in the TVR program.",
              "activityObjectives": "Today we wanted to work on building confidence on skiing steeper terrain with a possible trip up the Gondola, making 'french fry' turns and having FUN!",
              "activityRecap": "In the morning we did fun ski drills intended to bring skis together for French fry turns, like thumper turns, jumping after turns (being rabbits), practiced hockey stops, side slipping and side stepping uphill, squishing a bag of cookies in between our legs.  We alternated drill runs and then animal trail runs as the reward.  After lunch, the kids who seemed ready and wanted to go up the Gondola went up the Gondola.  The kids not ready stayed inside and played games.  We took the cat track all the way down to Ampitheater, skied the Ampitheater roll over...the hardest part, to the bottom of Thunder, where we took South Pass Traverse all the way down to Teewinot.  We took a break and skied animal trails again as the big reward!",
              "disciplineTypeId": "00000000-0000-0000-0000-000000000000",
              "disciplineType": "Ski",
              "disciplineId": "cbcdd7a7-4706-4468-9b89-cbae8e8fd555",
              "discipline": "Explorer Alpine",
              "disciplineShortName": "Explorer Alp",
              "disciplineAcronym": "ALP-Y",
              "level": "Wolves",
              "levelShortName": "Level 8",
              "levelAcronym": "L8",
              "levelRank": 8,
              "levelProficiencyId": "e05bc5c3-ff37-4357-b15e-830ef0071a38",
              "levelProficiency": "Developing Skills",
              "levelProficiencyShortName": "Developing",
              "levelProficiencyAcronym": "2",
              "levelProficiencyRank": 2,
              "attendanceStatusId": "abcde7a7-4706-4468-9b89-cbae8e8fd555",
              "attendanceStatus": "Attended",
              "attendanceStatusShortName": "Attended",
              "attendanceStatusDescription": "Participated fully in the session.",
              "resortId": "93d26690-b3a6-415d-93b7-6d37f6e7749b",
              "resort": "Jackson Hole Mountain Resort",
              "resortShortName": "Jackson Hole",
              "resortAcronym": "JHMR",
              "schoolId": "4fe95936-0f73-49f9-9d7c-7be3378ba4e9",
              "school": "Jackson Hole Mountain Sports School",
              "schoolShortName": "Mountain Sports School",
              "schoolAcronym": "MSS",
              "instructors": [
                {
                  "instructorId": "0600bf44-af23-4249-99ee-475bb5fab991",
                  "lastName": "Moe",
                  "firstName": "Thomas",
                  "middleName": "",
                  "nickname": "Tommy",
                  "commonFirstName": "Tommy"
                }
              ],
              "lifts": [
                {
                  "liftId": "bc0a1e78-2284-4d67-aa2e-2f8448ae341c",
                  "name": "Aerial Tram",
                  "shortName": "Tram",
                  "acronym": "TRAM",
                  "description": "2.4 miles long. 9 minutes. Serving...",
                  "baseElevation": 0,
                  "summitElevation": 0,
                  "elevationGain": 4139
                },
                {
                  "liftId": "bc0a1e78-2284-4d67-aa2e-2f8448ae341c",
                  "name": "Aerial Tram",
                  "shortName": "Tram",
                  "acronym": "TRAM",
                  "description": "2.4 miles long. 9 minutes. Serving...",
                  "baseElevation": 0,
                  "summitElevation": 0,
                  "elevationGain": 4139
                },
                {
                  "liftId": "ddf89ca8-6fda-459e-9e48-0819d05ab9ab",
                  "name": "Sweetwater",
                  "shortName": "Sweetwater",
                  "acronym": "SWEET",
                  "description": "2,517 feet long. 6 minutes. Serving...",
                  "baseElevation": 0,
                  "summitElevation": 0,
                  "elevationGain": 1065
                },
                {
                  "liftId": "bc0a1e78-2284-4d67-aa2e-2f8448ae341c",
                  "name": "Aerial Tram",
                  "shortName": "Tram",
                  "acronym": "TRAM",
                  "description": "2.4 miles long. 9 minutes. Serving...",
                  "baseElevation": 0,
                  "summitElevation": 0,
                  "elevationGain": 4139
                },
                {
                  "liftId": "353eca17-eded-49af-bc71-1ada1a714101",
                  "name": "Marmot",
                  "shortName": "Marmot",
                  "acronym": "MARM",
                  "description": "3,281 feet long. 7 minutes. Serving...",
                  "baseElevation": 0,
                  "summitElevation": 0,
                  "elevationGain": 1208
                }
              ],
              "terrains": [
                {
                  "terrainId": "39989d6a-8178-4af8-8a3b-d7da37d2e540",
                  "name": "Chutes",
                  "shortName": "Chutes",
                  "acronym": "CHU",
                  "description": "Chutes"
                },
                {
                  "terrainId": "39989d6a-8178-4af8-8a3b-d7da37d2e540",
                  "name": "Bumps",
                  "shortName": "Bumps",
                  "acronym": "BMP",
                  "description": "Bumps"
                },
                {
                  "terrainId": "39989d6a-8178-4af8-8a3b-d7da37d2e540",
                  "name": "Double Black Diamond",
                  "shortName": "Double Black",
                  "acronym": "BD2",
                  "description": "Double Black Diamond"
                },
                {
                  "terrainId": "39989d6a-8178-4af8-8a3b-d7da37d2e540",
                  "name": "Trees",
                  "shortName": "Trees",
                  "acronym": "TRE",
                  "description": "Trees"
                }
              ],
              "milestones": [
                {
                  "milestoneId": "9717290e-d534-4237-8743-7ecadaf90f69",
                  "sortOrder": 1,
                  "name": "Can link parallel turns on most terrain",
                  "shortName": "Link turns",
                  "acronym": "Link turns",
                  "description": "Can link parallel turns on most terrain",
                  "achievedOn": "2015-06-12T00:00:00",
                  "proficiencyId": "dcf5a043-f01b-45e2-9978-4a3d0ab4b0f9",
                  "proficiency": "Mastered",
                  "proficiencyShortName": "Mastered",
                  "proficiencyAcronym": "MASTER",
                  "proficiencyDescription": "Has mastered the concept or skill.",
                  "percentageComplete": 100,
                  "certifierLastName": "Williams",
                  "certifierFirstName": "Jim",
                  "certifierMiddleName": "",
                  "certifierNickname": "",
                  "certifierCommonFirstName": "Jim"
                },
                {
                  "milestoneId": "9717290e-d534-4237-8743-7ecadaf90f69",
                  "sortOrder": 2,
                  "name": "Can hop turn",
                  "shortName": "Hop turn",
                  "acronym": "Hop turn",
                  "description": "Can hop turn",
                  "achievedOn": "2015-06-12T00:00:00",
                  "proficiencyId": "dcf5a043-f01b-45e2-9978-4a3d0ab4b0f9",
                  "proficiency": "Introduced",
                  "proficiencyShortName": "Introduced",
                  "proficiencyAcronym": "INTRO",
                  "proficiencyDescription": "The concept or skill has been introduced.",
                  "percentageComplete": 25,
                  "certifierLastName": "Moe",
                  "certifierFirstName": "Tommy",
                  "certifierMiddleName": "",
                  "certifierNickname": "Tommy",
                  "certifierCommonFirstName": "Tommy"
                },
                {
                  "milestoneId": "9717290e-d534-4237-8743-7ecadaf90f69",
                  "sortOrder": 3,
                  "name": "Can make carved turns using edging movements",
                  "shortName": "Carved turns",
                  "acronym": "Carved turns",
                  "description": "Can make carved turns using edging movements",
                  "achievedOn": "2015-06-12T00:00:00",
                  "proficiencyId": "dcf5a043-f01b-45e2-9978-4a3d0ab4b0f9",
                  "proficiency": "Accomplishing",
                  "proficiencyShortName": "Accomplishing",
                  "proficiencyAcronym": "ACCOM",
                  "proficiencyDescription": "Accomplishing...",
                  "percentageComplete": 75,
                  "certifierLastName": "Moe",
                  "certifierFirstName": "Tommy",
                  "certifierMiddleName": "",
                  "certifierNickname": "Tommy",
                  "certifierCommonFirstName": "Tommy"
                }
              ],
              "feedback": [
                {
                  "feedbackId": "ca8fc7ff-cce1-4fc7-9ff1-5ae7e5fafc2c",
                  "comment": "Congratulations Griff on your first run down the Rendezvous Bowl from the top of the tram! It's a big step and a great hurdle to overcome. Griff did great today, working to extend the confidence he has on blue groomed runs to black terrain. Technical focus on arm position and incorporating pole plants.",
                  "commenterLastName": "Moe",
                  "commenterFirstName": "Tommy",
                  "commenterMiddleName": "",
                  "commenterNickname": "Tommy",
                  "commenterCommonFirstName": "Tommy"
                }
              ],
              "interestedParties": [
                {
                  "interestedPartyId": "9ddeffe4-f765-4f4f-b980-2e6817664f9b",
                  "lastName": "Miller",
                  "firstName": "Ingrid",
                  "middleName": "",
                  "nickname": "",
                  "commonFirstName": "Ingrid",
                  "relationship": "Mother"
                },
                {
                  "interestedPartyId": "9ddeffe4-f765-4f4f-b980-2e6817664f9b",
                  "lastName": "Miller",
                  "firstName": "Daniel",
                  "middleName": "",
                  "nickname": "Dan",
                  "commonFirstName": "Dan",
                  "relationship": "Father"
                },
                {
                  "interestedPartyId": "9ddeffe4-f765-4f4f-b980-2e6817664f9b",
                  "lastName": "Stiegler",
                  "firstName": "Resi",
                  "middleName": "",
                  "nickname": "",
                  "commonFirstName": "Resi",
                  "relationship": "Racing Coach"
                }
              ]
            };

            // Cycle through lifts ridden to get a count of laps
            var _liftReps = {};
            var _lifts = [];
            var _totalVert = 0;
            $scope.reportcard.lifts.forEach(function(obj) {
                var key = JSON.stringify(obj)
                _liftReps[key] = (_liftReps[key] || 0) + 1;
                _totalVert += obj.elevationGain;
            })

            for ( liftStr in _liftReps ) {
                var _lift = JSON.parse(liftStr);
                _lift.laps = _liftReps[liftStr];
                _lifts.push(_lift);
            }
            $scope.lifts = _lifts;
            $scope.totalVert = _totalVert;
    }]);

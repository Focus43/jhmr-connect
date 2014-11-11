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


//         $scope.participant = Participant.getLibrary( { mesaId: $rootScope.mesaId }, function (data) {
//             console.log(data);
//         });


        $http({
            method: 'GET',
            withCredentials: true,
            url: "https://maven.vertservices.net/guest/guests/58f8f606-41e8-4d22-9e45-32be9af3c5e4/libraries",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json; charset=utf-8',
                'Authentication':'VsToken ew0KICAidHlwIjogIkpXRSIsDQogICJhbGciOiAiUlNBLU9BRVAiLA0KICAiZW5jIjogIkEyNTZHQ00iLA0KICAiY3R5IjogIkpXUyINCn0.I5vxKvVCsIbazGM6GoTlQVdiC1lSpIKFQLFe3XXk_pxo74jMQwDWKJbK1hNlx3nK48dgdInMzDicbHO2EoJFyDDtGelOtcv6sZBcKOGR7toAbZSfgz1_z0YsmJRBbyamfefz4SwO6N0MrcU7aspjQvY0UOI36RWV_2Ba51N3i7quRRbAlDtNK9HyxguKS-G7TKHpIKb8UUjKXcQx79lmmIPWxnfcvQQm6VL2xdcB3SGXWsQW_5ohMR-WBLUO0Jy4oEGsuuaPeDZpwB-b0mJwEcap-cYyt3lU_4BAlmQ2D8JrSqLzDzzTshzJG3B0Pj69VgxbznI9-ct7ZxVhxpo0DnXC7JIwjMPYIexex9IsqAuPuDs0gsBLh6DH6fYSuULfXVskIrnxt4VDZTL12pNe7OZ2DzA2CDdvYqfu3gxKMe-aHZ4ULTziEsbptcWhrdd0WwdJY5V6B7f6tgA_fcMIxxWOUK8VKwxPHQZgL9XVPh2ZtGAWr4_bNGOG-1vK9K25NKwUJpigA9KkVBZ5lrQnkSk5etRgR_zdl7O9BHp-Bse8wTApcWWIEAT16zXBeaprKjTvMG8PlVpN3pBzK695tgXO5FgO6MvY9hP-yMSo2AVlE85hWkp6Z9Fx3ABLNWPDtcCeHJIeq6sFMMyBg0BRM5GheImW8FIQzGZ-TAv1dvU.ZaA-trjeVdqxVyJY.voejaCFTnjKb0yW18KOzG1gyUCXJ90nVKNW-ckiWzeC9Axvjo6brahgvY2SkOEyHv_r0fNOSCORC6W1KI0UB-fv4el3HuvxuzknODzu38quPrnnjLtsJGQbbzT5zBhLsEyaW5n3aPMbkMtZqczrFpLPazj6wrVQzHko9h4RZ2hJ8rNJ-II8FpHgZOVxFCDO9ji3vnLeXGFxyH1TS4j9ciy47wIe8UQo_1-ib_a9CqgQIUJ7rSq--gCkZPEX4CGlo7FRMuHUGqd2ShJKyhkprjVa3SbmR6e5tHbjZXnjWT14xiAvt5gyEXZpeBoQGX0EABTq9Z48YCy2J6kgGGzmrAZRpJ3pAumfKnkodKu_Mz_nQQEeABVRpU-UpZHzAHL2kMAguNqMOQZxP9Af0kyky2stRLH7pNf-cnJqQ-YAFLpwOn6vovNvIoQDOA_0vi6Aj5TiOyL_5BgZn_94n9r7QGAEn-b1VraE7C87cNz4BN24wqswy1EQ3Y0RMK0P8wpkShSQt-sApD3b0qTWkjeVwDVweFJ2Ti3nGt1YESSNWtLUcpG_EqOl1eFmX5jMbW5-thFjSyK-Qr6U6fqvLoxFpBzos5aUVUCVr1Yvx4VhmVRjQGzbRyJVaPJJNnRzp8PUVhoMK9ftfP643lYLvkbQgnd5ejOtV7objng_fLJGDAmK7c3Z02nsDJFYveODbdLl5fVo5IRIG3wQFNpdZBA71waLlR0cg-hNyIgB4iFXwrjhq3NIJZmX0h9CLyowm6EAzeI6IePfa9-wymYwuavlJTOWF2G7Dii9vXzPADiP9DP-PmvfXeluTb7DC9ozrM6xN8REN4c6wb4DH2T8-JcCCpFKM8Z3aMhWD1WKwAIpCAMhJhAI2As6UutmFstVU5_T1shI67sIyAir_ovBNnrb0PHnbtEAzi81WxCUQV4F26XYcEYfwVGiALdIrQn9yRY0TOtNsgCkn18uxMvPL2JCifMjlH_RUZtHmlv4tcxDw38jeP2AX89SyvqBzAwe1G_qUmlPY37-P_WRYTIcqWhlejvUbonLNhpPZedU-UWPOzO52m-DHyVopzMRUfamhDBsiy209Gw1WU1nJreSUNNTsHaSS1eqtnBz5iNo6Viuse-JvCk-4qv9gJnWalsx7IKIOO2PYRCIn5zuiI1yvq--CiacMq-AuyUDmS7bMCh74ugtGMBiqbVkqswUkCm_eFlXb8LAwXTNPizfJNp8NPj6LMsO8ApTFv6rCrUsDPufkgKpX5rlNPdCfg-X0LfGLulK1kJfgmSMi-rRp9kETtkZi3EkakpP6BzS-O4BNMuslh7jA73E0MLgokkbd369xdaDhXO-cWkYTZGdgX0r4M2Cspz0io6aShh428Xr6m2hpeVSUCOouvva0BlyeSFn5Mz_K7F6HV4FuV_kQRUgiQt1omi_h1yy7haaKK2O2enY0ylwkbAD-_WInH1vT8D6G7XwsUDb3HFFJ1RkXYtNoxFwzFENTHMtoFDOqqlo_FsR8-rWo6hI16AzOTnq0xfE91Jqg57cUSFztBTJRF4RFTC81FMeIG_yODpplr8bHjQeiTzaKh2vHmfGHP1qWiJs_-7-pmQ6tnnccNlDavD-gG61760NVSXXHArfisjWh_SKymJjnaS_yvV8TB_anuw8KJfW3obLHpV-4vKXVdvc83pQzP7oTf4Jx2XS4iq_XW-Q8QEBZhdQvYg1tdAbaquw3VGY8KhclP0P3OVYKPswL_mXN_TptRLFaWqN8hg22Za2V3RjZX27YrNV8SBeh4m8nVGeDXZxbLfFjIT5Ze5lVfTRqJ8GQZD9xRsmJ2LUktEWiq4o2LF_WqHAKOTB13ty1l7mdUXdRGkxlqse03R9R-HJW7BCp1t3gFUond7rdrltRY84zPOb9dLez03lHiAuqAHXl8hDbQgHwxcS2h8deg9FqbTgcOtbo5oBfDvbRd0imUJNqPscWZiWKsNIb_oL_Fpt502loKMimAWy4C-WeIo_g4oGTAthG9IT09jjK-ywICR_y9f7p4SPepioQcO5nNlggcv_0hBmhXprNW48DZgmB6Fm4GeeDe525kD-tGUjRcAjj7dpWZH2c6suPKlLq91unN1fau2XKoQi8SYr4EbReVXZbgUR3j55sUUvfZIO6zN_zkEFlwIfakIIpqNMOUdHvQmjmxMdWmoXmdKJWaYFB0YV7TGXbhG5XDrawGr6VwAbsGD14PM7x8AIzSc_OJ65WilkG2nxeCREMdNLV_iIhp4G7CkUUsTTx4w81KzFH5rqiNhxUyKqhGKRkf5e_m0f0FQjhXSq0LuusBX1dZyNbBE4-h0eyUv9lx-9y7NgFivXyJO-TFIF-roDrhdBt12lKYe-NQI2-Y8OwvnTQjrqMfs6YdbMaqLJXydNqWIYoTuYj4HjiYaxXUNoEfiNBanyKLbWL4AHTFzZQ4tsnjHK2kWHqjTjm9X_qAGitns2-RZ--RWwC17lmBO9jJCe8GpjkoY9RC01N8qYJ3WbZNsBrJLkNlBBwNMyZS_Qyf6-rPhOYb0qQ4_ImHB4jN2-_Vu2-xBNIM7xXt5uVj3RAi3jf6VWw3seNpa9FskbNL2vJ8YM_DMxGwqt3DEaBovA.a8nxgz8MzEbCq3cMRoGi8A'
            }
        })
        .success(function(data, status, headers, config) {
            // handle data
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
        })
        .error(function(data, status, headers, config) {
            // handle error
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
        });

        $scope.goToParticipant = function (id) {
            $location.path("/participant/" + id);
        };

        $scope.goToReportCard = function (id) {
            $location.path("/reportcard/" + id);
        };

    }]);

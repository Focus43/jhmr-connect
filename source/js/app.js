/* global FastClick */

;(function( window, angular, undefined ){ 'use strict';

    angular.module('jhmrc', [
        'jhmrc.common',
        'jhmrc.login',
        'jhmrc.participant',
        'jhmrc.reportcard'
    ]).

        config([
            function(){

            }
        ]).

        // value('gaId', 'UA-xxxxx').
        // value('apiEndpoint', 'http://someurl.com'). // TODO: factory

        run([
            function(  ){

            }
        ]);

})( window, window.angular );

var Portal = {};
Portal.apiEndPoints = {
      authentication: "https://vista.vertservices.net/token?",
      library:        "https://maven.vertservices.net/guest/guests/",
      reportCard:     ""
  };

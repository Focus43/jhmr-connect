/* global FastClick */

;(function( window, angular, undefined ){ 'use strict';

    angular.module('jhmrc', [
        'jhmrc.common',
        'jhmrc.login',
        'jhmrc.participant'
    ]).

        config([
            function(){

            }
        ]).

        value('gaId', 'UA-xxxxx').
        value('apiEndpoint', 'http://someurl.com'). // TODO: factory

        run([
            function(){

            }
        ]);

})( window, window.angular );

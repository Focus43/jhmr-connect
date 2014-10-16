(function( gulp ){ 'use strict';

    /**
     * Really important to get the FULL system path, as gulp-watch can
     * get confused sometimes...
     * @param _path
     * @returns {string}
     */
    function sourcePath(_path){ return __dirname + '/source/' + _path; }

    /**
     * Same sourcePath
     * @param _path
     * @returns {string}
     */
    function buildPath(_path){ return __dirname + '/build/' + _path; }

    /**
     * @var sources JSON Easy way to keep track of shit in one place
     */
    var sources = {
        css: sourcePath('sass/app.scss'),
        js: {
            core: [
                //sourcePath('bower_components/angular/angular.js'),
                //...,
                //...
            ],
            app: [
                sourcePath('js/**/*.js')
            ]
        }
    };

})( require('gulp') );
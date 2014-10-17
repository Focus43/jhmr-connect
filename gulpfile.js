(function( gulp ){ 'use strict';

    /**
     * Really important to get the FULL system path, as gulp-watch can
     * get confused sometimes...
     * @param _path
     * @returns {string}
     */
    // function sourcePath(_path){ return __dirname + '/source/' + _path; }
    // function buildPath(_path){ return __dirname + '/build/' + _path; }
    function sourcePath(_path){ return __dirname + '/source/%s'.replace('%s', _path); }
    function buildPath(_path){ return __dirname + '/build/%s'.replace('%s', _path); }

    /**
     * Task modules.
     */
    var Utils       = require('gulp-util'),
        Bump        = require('gulp-bump'),
        Sass        = require('gulp-ruby-sass'),
        Concat      = require('gulp-concat'),
        Uglify      = require('gulp-uglify'),
        JsHint      = require('gulp-jshint'),
        // Nodemon     = require('gulp-nodemon'),
        Template    = require('gulp-template')
        // HtmlMin     = require('gulp-htmlmin'),
        // Wrapper     = require('gulp-wrapper')
        // Through2    = require('through2'),
        // EventStream = require('event-stream'),
        // QDefer      = require('q');

    /**
     * @var sources JSON Easy way to keep track of shit in one place
     */
    var sources = {
        css: sourcePath('sass/app.scss'),
        js: {
            core: [
                // Basics
                sourcePath('bower_components/angular/angular.js'),
                sourcePath('bower_components/angular-resource/angular-resource.js'),
                sourcePath('bower_components/angular-route/angular-route.js'),
                // Touch
                sourcePath('bower_components/angular-touch/angular-touch.js'),
                // Forms
                sourcePath('bower_components/angular-messages/angular-messages.js')
                
                // sourcePath('bower_components/fastclick/lib/fastclick.js')
                // sourcePath('bower_components/angular-strap/dist/angular-strap.js')
                // sourcePath('bower_components/angularLocalStorage/src/angularLocalStorage.js')
            ],
            app: [
                sourcePath('js/**/*.js')
            ]
        }
    };

    /**
     * Get template settings based on build target
     * @param _target
     * @returns {*}
     */
    function templateVars(_target) {
        switch(_target){
            case 'prod':
                return {
                    apiEndpoint : '',
                    basePath    : '/',
                    assetPath   : function(_path){
                        return this.basePath + 'assets/' + _path;
                    },
                    imagePath   : function(_image){
                        return this.basePath + 'assets/img/' + _image;
                    }
                };

            case 'dev':
                return {
                    apiEndpoint : '',
                    basePath    : '/',
                    assetPath   : function(_path){
                        return this.basePath + 'assets/' + _path;
                    },
                    imagePath   : function(_image){
                        return this.basePath + 'assets/img/' + _image;
                    }
                }
        };
    }

    // TASKS

    // Bump (version)
    function taskBump () {
        return gulp.src('./package.json')
            .pipe(Bump({type:'patch', key:'version'}))
            .pipe(gulp.dest('./'));
    }

    // Sass
    function taskSass ( outputStyle, buildTarget ) {
        return gulp.src(sourcePath('sass/application.scss'))
            .pipe(Sass({ sourcemap:false, compass:true, style:(outputStyle || 'nested') }))
            .on('error', function(err){
                console.log(err.toString());
                this.emit('end');
            })
            .pipe(Template( templateVars(buildTarget || 'dev') ))
            .pipe(gulp.dest( buildPath('assets/css') ))
    }

    // JS concat (and minify)
    function taskJs ( files, fileName, shouldMinify ){
        return gulp.src(files)
            .pipe( Concat(fileName) )
            .pipe( shouldMinify ? Uglify() : Utils.noop() )
            .pipe( gulp.dest(buildPath('assets/js')) );
    }

    // JS linting
    function taskLint(){
        return gulp.src( sourcePath('js/**/*.js') )
            .pipe(JsHint()) // where is jshintrc?
            .pipe(JsHint.reporter('jshint-stylish'))
    }

    // Copy static files
    function taskCopyFiles(){
        // Images
        gulp.src(sourcePath('img/**/*'))
            .pipe(gulp.dest(buildPath('assets/img')));
        // Fonts
        gulp.src(sourcePath('bower_components/font-awesome/fonts/*'))
            .pipe(gulp.dest(buildPath('assets/fonts')));
        // Error.html
        gulp.src(sourcePath('html/error.html'))
            .pipe(gulp.dest(buildPath('')));
    }


    // WATCH TASKS
    gulp.task('watch', function () {
        gulp.watch(sourcePath('sass/**/*.scss'), ['sass:dev']);
        gulp.watch(sourcePath('js/**/*.js'), ['js:app:dev']);
        // gulp.watch(sourcePath('html/**/*.html'), ['html:dev']);
    });

    // DEFAULT TASK
    gulp.task('default', ['watch']);

    /**
     * Individual tasks, callable as dependencies (remember async!)
     */
    gulp.task('bump', function(){ return taskBump(); });
    gulp.task('copy', function(){ return taskCopyFiles(); });
    gulp.task('sass:dev', function(){ return taskSass(); });
    gulp.task('sass:prod', function(){ return taskSass('compressed', 'prod'); });
    gulp.task('js:core:dev', function(){ return taskJs(sources.js.core, 'core.js'); });
    gulp.task('js:core:prod', function(){ return taskJs(sources.js.core, 'core.js', true); });
    gulp.task('lint:app', function(){ return taskLint(); });
    gulp.task('js:app:dev', ['lint:app'], function(){ return taskJs(sources.js.app, 'application.js'); });
    gulp.task('js:app:prod', ['lint:app'], function(){ return taskJs(sources.js.app, 'application.js', true); });
    gulp.task('js:all:dev', ['lint:app'], function(){
        taskJs(jsSource.core, 'core.js');
        taskJs(jsSource.application, 'application.js');
    });
    gulp.task('markup:dev', function(){ taskMarkup(false); });
    gulp.task('markup:prod', function(){ taskMarkup(true, 'prod'); });

    /**
     * Build the entire app for development
     */
    gulp.task('build:dev', ['copy', 'sass:dev', 'js:core:dev', 'js:app:dev'], function(){
        Utils.log(Utils.colors.cyan('Dev build complete!'));
    });

    gulp.task('build:prod', ['copy', 'sass:prod', 'js:core:prod', 'js:app:prod', 'markup:prod'], function(){
        Utils.log(Utils.colors.cyan('Prod build complete!'));
    });


})( require('gulp') );

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


    /**
     * Store locations/paths and such for different build targets (workflows).
     * @param workflow
     * @returns {{apiEndpoint: string, basePath: string, assetPath: assetPath}}
     */
    function getTemplateVars( workflow ){
        switch(workflow){
            case 'prod':
                return {
                    apiEndpoint : '',  // eg. 127.0.0.1:3000
                    basePath    : '/', // ie. asset path if on a cdn
                    assetPath   : function( _path ){ return this.basePath + 'assets/' + _path; }
                };

            default: // ie. "dev"
                return {
                    apiEndpoint : '',  // eg. 127.0.0.1:3000
                    basePath    : '/', // ie. asset path if on a cdn
                    assetPath   : function( _path ){ return this.basePath + 'assets/' + _path; }
                };
        }
    }


    /**
     * Seems silly but couldn't find a good existing gulp plugin to handle injection
     * into another file and return a stream in the way we need it; so this handles
     * it.
     *
     * @todo: install Through2
     */
    function mergeTemplateIntoIndex(){
        var firstFile = null;

        return Through2.obj(function( file, enc, callback ){
            if( ! firstFile ){
                firstFile = file;
                callback();
                return;
            }

            var index = firstFile.contents.toString(),
                vinyl = new Utils.File({
                    path: firstFile.path.replace(firstFile.base, ''), // "index.html"
                    contents: new Buffer(index.replace('<!--__NG_TEMPLATES__-->', file.contents.toString()))
                });

            this.push(vinyl);
            callback();
        });
    }


    /**
     * Takes care of merging all markup into index.html, wrapping any templates
     * in ng-template tags (with the path id mappings by directory from source/html
     * as the ROOT folder), minifying everything (if minify = true), and finally handling
     * variable replacements via Template plugin.
     *
     * @param bool minify : Minify the markup?
     * @param string workflow : Specify a workflow target to pull variables from
     * for templating
     * @return Vinyl | Stream
     *
     * @todo: install gulp plugins for: HtmlMin, Utils, Wrapper, EventStream, Template
     */
    function buildHtml( minify, workflow ){
        var minSettings  = {collapseWhiteSpace:true, removeComments:false, caseSensitive:true};

        var streamIndex = gulp.src(sourcePath('html/index.html')).
            pipe( minify ? HtmlMin(minSettings) : Utils.noop() );

        var streamTemplates = gulp.src([sourcePath('html/**/*.html'), '!'+sourcePath('html/index.html')]).
            pipe( minify ? HtmlMin(minSettings) : Utils.noop() ).
            pipe(Wrapper({
                header: '<script type="text/ng-template" id="/${filename}">',
                footer: '</script>'
            })).
            pipe(Concat('', {newLine:''})); // Concat task works fine w/ html too...

        return EventStream.merge(streamIndex, streamTemplates).
            pipe(mergeTemplateIntoIndex()).
            pipe(Template(getTemplateVars(workflow || undefined))).
            pipe(gulp.dest(buildPath('')));
    }


})( require('gulp') );
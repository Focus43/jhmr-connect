/**
 * Turn a string a handle format ("Any*909234!thing L*./,Ke This" -> anything-like-this")
 */
angular.module('jhmrc').filter('dasherize', function(){
    return function(input){
        return (input || '').replace(/[^a-z0-9\s]/gi,'').replace(' ', '-').toLowerCase();
    };
});

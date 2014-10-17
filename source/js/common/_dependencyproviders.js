
/**
 * displaying maps
 */
angular.module('obiWan').config(function($provide) {
    $provide.factory('displayMap', function() {
        return function (elem, attrs) {
            var mapOptions,
                latitude = (attrs && attrs.location) ? attrs.location.latitude : null,
                longitude = (attrs && attrs.location) ? attrs.location.longitude : null,
                address = (attrs && attrs.address1) ? attrs.address1 + " " + attrs.address2 : null,
                map;
            // first create a 'default' map (regardless if lat/long is avail)
            latitude = latitude && parseFloat(latitude, 10) || 43.654832;
            longitude = longitude && parseFloat(longitude, 10) || -110.716465;

            mapOptions = {
                zoom: 15,
                center: new google.maps.LatLng(latitude, longitude)
            };

            map = new google.maps.Map(elem[0], mapOptions);
            // if no lat/long was sent in try geocoding the address
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        };
    });
});

/**
 * support multiple GA accounts
 */
angular.module('obiWan').config(function($analyticsProvider) {

    $analyticsProvider.registerPageTrack(function (path) {
        if (window._gaq) { _gaq.push(['_trackPageview', path]); }
        if (window.ga) {
            ga(function() {
                angular.forEach(ga.getAll(),function(t){
                    ga(t.get('name') + '.send', 'pageview', path);
                });
            });
        }
    });

    $analyticsProvider.registerEventTrack(function (action, properties) {

        if (!properties || !properties.category) {
            return;
        }

        if(properties.value) {
          var parsed = parseInt(properties.value, 10);
          properties.value = isNaN(parsed) ? 0 : parsed;
        }

        if (window._gaq) {
          _gaq.push(['_trackEvent', properties.category, action, properties.label, properties.value, properties.noninteraction]);
        } else if (window.ga) {
              if (properties.noninteraction) {
                angular.forEach(ga.getAll(),function(t) {
                    ga(t.get('name')+'.send', 'event', properties.category, action, properties.label, properties.value, {nonInteraction: 1});
                });
              } else {
                angular.forEach(ga.getAll(),function(t) {
                    ga(t.get('name')+'.send', 'event', properties.category, action, properties.label, properties.value);
                });
            }
        }
      });
});

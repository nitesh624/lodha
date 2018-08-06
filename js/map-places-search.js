var themeJSON = [{ "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#dadada" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }];
var map;
var infowindow;
var searchtype;

//https://www.taniarascia.com/google-maps-apis-for-multiple-locations/

// var broadway = {
//     info: '<strong>Chamarbaug Sub Post Office</strong><br>\
//               Dr. B. A. Road, Parel Post Office Lane, <br>\Krishna Nagar, Parel East, <br>\Krishna Nagar, Parel, Mumbai, ',
//     lat: 19.0005323,
//     long: 72.8360278,
// };

// var belmont = {
//     info: '<strong>ITC Grand Central</strong><br>\
//               287, Dr Babasaheb Ambedkar Road, Parel,<br>\ Mumbai, Maharashtra 400012',
//     lat: 18.9982897,
//     long: 72.8373766
// };

var myIMg = '<img src="http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="150" width="150">';
var propName = 'Ratan J. Batliboi Consultants Pvt'
var propLocation = 'Lower Parel';
// var propaddres = '233 D, Bharat Rice Mills, Dr S S Rao Road,\
//                   Near Hilla Tower, Lalbaug, Bharat Rice Mills Compound,\
//                   Lal Baug, Parel, Mumbai, Maharashtra 400012';
var propType = 'Residential - Outgoing'
var propLat = 18.9942916
var propLong = 72.8348898;

var propDet = {
    info: '<span class="img">' + myIMg + '</span> <strong>' + propName + '</strong><span>' + propLocation + '</span><span>' + propType + '</span>',
    lat: propLat,
    long: propLong
};

function initMap(searchtype) {
    infowindow = new google.maps.InfoWindow({});

    var locations = [
        [propDet.info, propDet.lat, propDet.long, 0]
        // ,
        // [belmont.info, belmont.lat, belmont.long, 1],
        // [propDet.info, propDet.lat, propDet.long, 2],
    ];
    if (searchtype == 'propLoc') {

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            maptype: 'roadmap',
            size: '480x360',
            styles: themeJSON,
            center: new google.maps.LatLng(propDet.lat, propDet.long),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });


        var marker, i;

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon: 'images/icon-location.gif'
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                    $('#map').addClass('pointerOpen');
                    $('#map').addClass('propMap');
                    $(document).find('.gm-style-iw').next('div').on('click', function() {
                        $('#map').removeClass('pointerOpen');
                        $('#map').removeClass('propMap');

                    })
                }
            })(marker, i));
        }
    } else {
        var locDets = { lat: propDet.lat, lng: propDet.long };

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            maptype: 'roadmap',
            size: '480x360',
            styles: themeJSON,
            center: new google.maps.LatLng(propDet.lat, propDet.long),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: locDets,
            radius: 500,
            type: [searchtype]
        }, callback);
    }

    applyStyleOnMap()
}


// function initSchool(searchType) {
// var locDets = { lat: propDet.lat, lng: propDet.long };

//     map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 13,
//         maptype: 'roadmap',
//         size: '480x360',
//         styles: themeJSON,
//         center: new google.maps.LatLng(propDet.lat, propDet.long),
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     });

//     infowindow = new google.maps.InfoWindow();
//     var service = new google.maps.places.PlacesService(map);
//     service.nearbySearch({
//         location: locDets,
//         radius: 500,
//         type: [searchType]
//     }, callback);
//     applyStyleOnMap()

// }

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: 'images/icon-location.gif'
    });
    var placeName = place.name;
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
        $('#map').addClass('pointerOpen');
        $(document).find('.gm-style-iw').next('div').on('click', function() {
            $('#map').removeClass('pointerOpen');
        })
    });
}

function applyStyleOnMap() {
    if ($('#map .gm-style-pbc').length != 0) {
        $('#map .gm-style-pbc').addClass('__brownShade');
        $('#map .gm-style-pbc').next().find('div').eq(0).find('div:last-child').addClass('mapPopup');

        $('#map .gm-style-pbc').next().find('div').eq(0).append("<span class='brownShade'></span>");
        //$("<span class='brownShade_'></span>").insertAfter("#map .gm-style-pbc");
    } else {
        setTimeout(function() {
            applyStyleOnMap();
        }, 500);
    }
}
initMap('propLoc');
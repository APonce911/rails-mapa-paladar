import GMaps from 'gmaps/gmaps.js';

// // if HTML DOM Element that contains the map is found...
let map = document.getElementById('map')
if (map) {

    // Coordinates to center the map
  var myLatlng = new google.maps.LatLng(41.8874314503,12.4886930452);

    // Other options for the map, pretty much selfexplanatory
  var mapOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  const style = {
      styles: [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#46bcec"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#fbd3d7"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [
              {
                  "color": "#454545"
              },
              {
                  "gamma": "0.00"
              },
              {
                  "weight": "0.25"
              }
          ]
      }
  ]}

  // Attach a map to the DOM Element, with the defined settings
  map = new google.maps.Map(document.getElementById('map'), {
        ...mapOptions,
        ...style,
  })

  // Wait for DOM to load
  // SVG.on(document, 'DOMContentLoaded', function() {
  //   var draw = SVG('drawing')
  // })
  
  // var teste  <%= @teste %>;
  

  // CUSTOM MARKER
  var icon = {
    path: "M0 0V52.231H2.0863C2.36766 52.231 2.59574 52.4576 2.59574 52.7371V61.8042L18.5881 52.5081C18.9003 52.3266 19.2555 52.231 19.6172 52.231H54V0H0Z",
        fillColor: '#DD5A58',
        fillOpacity: .6,
        anchor: new google.maps.Point(0,0),
        // strokeWeight: 0,
        // scale: iconSize
  }
  // var marker = new google.maps.Marker({position: myLatlng, map: map, animation: google.maps.Animation.BOUNCE});
  // NEW MARKER FUNCTION
  var marker = new google.maps.Marker({position: myLatlng,
  icon: icon, map: map, animation: google.maps.Animation.BOUNCE});

  JSPosts.forEach((post) => {
    // console.log(typeof post);
    // console.log(post["lat"]);
    // console.log(post["lng"]);
    var lat = post["lat"];
    var lng = post["lng"];
    var PostMarker = new google.maps.Marker({position:{lat,lng} , map: map});
  });

  }

  // vamos ver se com essa mudança o negócio funciona


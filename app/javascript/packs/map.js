import GMaps from 'gmaps/gmaps.js';

//===========USER SIGN IN CONDITIONALITY FOR MAP SIZE
// console.log(userSignedIn)
let map = document.getElementById('map')
if(userSignedIn){
  map.classList.remove("unlogged-map");
} else {
  map.classList.add("unlogged-map");
};

// if HTML DOM Element that contains the map is found...
if (map) {

  // OLD Coordinates to center the map
  // var myLatlng = new google.maps.LatLng(41.8874314503,12.4886930452);

  // Other options for the map, pretty much selfexplanatory
  var mapOptions = {
        zoom: 16,
        // center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // CUSTOM MARKER
  var icon = {
    path: "M0,2 L0,51.3964714 C-3.8565838e-15,51.9487562 0.44771525,52.3964714 1,52.3964714 L2.0863,52.3964714 C2.36766,52.3964714 2.59574,52.6237893 2.59574,52.9041748 L2.59574,62 L18.5881,52.6744493 C18.9003,52.4923743 19.2555,52.3964714 19.6172,52.3964714 L52,52.3964714 C53.1045695,52.3964714 54,51.5010409 54,50.3964714 L54,5 C54,2.23857625 51.7614237,4.39800865e-15 49,0 L2,0 C0.8954305,2.02906125e-16 -1.3527075e-16,0.8954305 0,2 Z",
        fillColor: '#DD5A58',
        fillOpacity: 0.9,
        anchor: new google.maps.Point(0,10),
        strokeWeight: 0,
        // scale: iconSize
        borderStyle: 'solid'
  }

  // STYLE
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
        disableDefaultUI: true,
        zoomControl:true
  })

  // Wait for DOM to load
  // SVG.on(document, 'DOMContentLoaded', function() {
  //   var draw = SVG('drawing')
  // })


  //==========OLD MARKER FUNCTION ==================== Changed to my location code
  // var marker = new google.maps.Marker({ position: myLatlng, map: map, animation: google.maps.Animation.BOUNCE});
  // NEW MARKER FUNCTION
  // var marker = new google.maps.Marker({position: myLatlng,icon: icon, map: map, animation: google.maps.Animation.BOUNCE});


  //=========PINS FOR POSTS=====================================================

  let i = 0
  JSPosts.forEach((post) => {
    const lat = post["lat"];
    const lng = post["lng"];
    const imageUrl = JSImages[i]["url"]

  // ===========DEFINING IMAGE MARKER ============================================

    let imageMarker = {
      url: imageUrl,
      scaledSize: new google.maps.Size(60, 60)

    }

    const PostMarker = new google.maps.Marker({position:{lat,lng} , map: map, icon:imageMarker});
    i += 1
  });
  // console.log("o i é")
  // console.log(i)

  //==========MY LOCATION CODE=================================================

  const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 4000
  };

  let myMarker = new google.maps.Marker({
    clickable: false,
    map: map,
    animation: google.maps.Animation.BOUNCE
  });
                                                    // watchPosition(botao center not working) or getCurrentPosition or clearWatch
  if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
      var myLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      myMarker.setPosition(myLocation);
      map.setCenter(myLocation)
  }, function(error) {
      window.alert('Hello dear user, please allow us to access your location');
  }, geoOptions);

  // =====CENTER ON ME BUTTOM===================================================
  function addYourLocationButton(map, marker) {
    var controlDiv = document.createElement('div');

    var firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '40px';
    firstChild.style.height = '40px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0px';
    firstChild.title = 'Your Location';
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement('div');
    secondChild.style.margin = '10px';
    secondChild.style.width = '20px';
    secondChild.style.height = '20px';
    secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
    secondChild.style.backgroundSize = '180px 20px';
    secondChild.style.backgroundPosition = '0px 0px';
    secondChild.style.backgroundRepeat = 'no-repeat';
    secondChild.id = 'you_location_img';
    firstChild.appendChild(secondChild);

    google.maps.event.addListener(map, 'dragend', function() {
        $('#you_location_img').css('background-position', '0px 0px');
    });

    firstChild.addEventListener('click', function() {
        var imgX = '0';
        var animationInterval = setInterval(function(){
            if(imgX == '-18') imgX = '0';
            else imgX = '-18';
            $('#you_location_img').css('background-position', imgX+'px 0px');
        }, 500);
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                marker.setPosition(latlng);
                map.setCenter(latlng);
                clearInterval(animationInterval);
                $('#you_location_img').css('background-position', '-144px 0px');
            });
        }
        else{
            clearInterval(animationInterval);
            $('#you_location_img').css('background-position', '0px 0px');
        }
    });

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
  }
  addYourLocationButton(map, myMarker)
};



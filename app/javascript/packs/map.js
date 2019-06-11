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
    path: "M0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 L49,0 C51.7614237,4.39800865e-15 54,2.23857625 54,5 L54,50.3964714 C54,51.5010409 53.1045695,52.3964714 52,52.3964714 L19.6172,52.3964714 C19.2555,52.3964714 18.9003,52.4923743 18.5881,52.6744493 L2.59574,62 L2.59574,52.9041748 C2.59574,52.6237893 2.36766,52.3964714 2.0863,52.3964714 L1,52.3964714 C0.44771525,52.3964714 -3.8565838e-15,51.9487562 0,51.3964714 L0,2 Z M5,4 C4.44771525,4 4,4.44771525 4,5 L4,48 C4,48.5522847 4.44771525,49 5,49 L48,49 C48.5522847,49 49,48.5522847 49,48 L49,5 C49,4.44771525 48.5522847,4 48,4 L5,4 Z",
        fillColor: '#DD5A58',
        fillOpacity: 0.9,
        anchor: new google.maps.Point(26,50),
        strokeWeight: 0,
        // scale: iconSize
        borderStyle: 'solid',
        scale: 1.3
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

  // =====MARKER FOR SINGLE POST================================================
  let markers = []
  let k = 0
  function displayPostMarker(post){
    // console.log(post)
    // console.log("entramos no displayPostMarker")
    const postId = post["id"]
    const lat = post["lat"];
    const lng = post["lng"];
    const imageUrl = JSImages.filter(post => post.id === postId)[0]['url']
    const restarantName = post["restaurant_name"]
    const text = post["text"]
    const date = post["date"]
    const userId = post["user_id"]
    const email = JSUsers.filter(user => user.id === userId)[0]['email']
    const emailRegex = /^.*(?=@)/;
    const nicknameArray = emailRegex.exec(email)

    const nickname = "@" + nicknameArray[0]
    const avatar = JSUsers.filter(user => user.id === userId)[0]['avatar']


    // ===========DEFINING IMAGE MARKER =============================

    let imageMarker = {
      url: imageUrl,
      scaledSize: new google.maps.Size(60, 60)
    }

        
    const UnderMarker = new google.maps.Marker({
      position:{lat,lng},
      map: map,
      animation: google.maps.Animation.DROP,
      icon:icon
    })

    const PostMarker = new google.maps.Marker({
      position:{lat,lng},
      map: map,
      animation: google.maps.Animation.DROP,
      icon:imageMarker
    })


    // =======add PostMarker to markers array
    markers.push(PostMarker);

    //=========POP-UP SECTION============================
    // Body Content
    let contentString =
      '<div class="popup">'+
        `<img class="popup-image" src=${imageUrl} >`+
        '<div>'+
          '<div class="post-info-div">'+
            '<ul class="post-info">'+
              `<li class="post-info-item"><img src=${avatar} class="post-avatar"></li>`+
              `<li class="post-info-item"><strong>${restarantName}</strong></li>`+
              `<li class="post-info-username">${nickname}</li>`+
              `<li class="post-info-username">$${date}</li>`+
            '</ul>'+
          '</div>'+
          `<p>${text}</p>`+
        '</div>'+
      '</div>';
    // Pop Up Window
    const popup = new google.maps.InfoWindow({
      content: contentString,
      // maxWidth: 320
    });

    const postMarkerClick = function () {
      popup.open(map, PostMarker)
    }
    const windowClick = function () {
      popup.close()
    }

    PostMarker.addListener("click", postMarkerClick);
    const useCapture = true;
    window.addEventListener("click", windowClick, useCapture);

    k += 1
  }
  //=========PINS FOR POSTS=====================================================
  function displayAllMarkers() {
    let i = 0
    let array = []
    JSPosts.forEach((post) => {
      // let j = i * 500;
      window.setTimeout(function(){
        displayPostMarker(post)},100 + (i * 300));
      i += 1;
    });
  }

  //==========MY LOCATION CODE=================================================
  const myIcon = require('../../assets/images/marker.png');

  // console.log(myIcon);

  const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 4000
  };

  let myMarker = new google.maps.Marker({
    clickable: false,
    map: map,
    icon: myIcon,
    animation: google.maps.Animation.DROP
  });
  if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
      var myLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      myMarker.setPosition(myLocation);
      map.setCenter(myLocation)
  }, function(error) {
      window.alert('Querido usuário, por favor habilite o serviço de localização do seu aparelho');
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
    firstChild.style.borderRadius = '10px';
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

  // =====CLEAR MARKERS BUTTOM==================================================
  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function clearMarkers() {
    setMapOnAll(null);
  }

  // define JS variable with HTML DOM Element
  // if(userSignedIn&!userShared){
  //   let clearButtom = document.getElementById('clearButtom')
  //   clearButtom.addEventListener("click", clearMarkers);
  // };
  //==========ADD MARKERS BUTTOM==============================================

  // if(userSignedIn&!userShared){
  //   let addButtom = document.getElementById('share-btn')
  //   addButtom.addEventListener("click", displayAllMarkers);
  // };

  // ===========BORDER RADIUS LAYER SETUP=====================================
  displayAllMarkers();
  var myoverlay = new google.maps.OverlayView();
  myoverlay.draw = function () {
    //this assigns an id to the markerlayer Pane, so it can be referenced by CSS
    this.getPanes().markerLayer.id='markerLayer';
  };
  myoverlay.setMap(map);
};





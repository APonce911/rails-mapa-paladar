import "bootstrap";

const form = document.getElementById("form");
console.log(form);
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name");
  console.log(name.value);

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name.value}&key=ENV['GOOGLEMAPS_API_KEY']`)
    .then(response => response.json())
    .then((data) => {
      const lat = data.results[0].geometry.location.lat;
      const lng = data.results[0].geometry.location.lng;
      console.log(typeof lat);

      form.insertAdjacentHTML("beforeend", `<h2>latitude: ${lat}</h2>`);
      form.insertAdjacentHTML("beforeend", `<h2>longitude: ${lng}</h2>`);

    // const map = new GMaps({ el: '#map', lat: lat, lng: lng, zoom: 14 });

    // const marker = { lat: lat, lng: lng };
    // map.addMarkers([ marker ]);

    // console.log(lat);
    // console.log(lng);
    });
});
// insert adjacent html

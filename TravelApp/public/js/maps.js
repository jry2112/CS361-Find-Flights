
// Initialize and add the map
function initMap(location) {
    // The location of Uluru
    const uluru = { lat: 23.3959079, lng: 113.3079699 }
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: location || uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: location || uluru,
      map: map,
    });
  }

window.addEventListener('DOMContentLoaded', (event) => {
    const mapButtons = document.getElementsByClassName("mapButton");
   mapButtons.array.forEach(element => {
     console.log(element.value);
     
   }); 
    
    
});

async function viewOnMap(location) {
  // Get the name of the airport
  await axios.post('http://localhost:4350/locate', body).then((res) => {
    let latlng = res.data;
    console.log(latlng);
  });
};

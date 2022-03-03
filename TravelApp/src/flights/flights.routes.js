let axios = require("axios").default;
var Amadeus = require('amadeus');
var amadeus = new Amadeus({ 
  clientId: process.env["AMADEUS_CLIENT_ID"], 
  clientSecret: process.env["AMADEUS_CLIENT_SECRET"] 
}); 

module.exports =(app) =>{
    const flights = require("./flights.controller.js");
    //Home Page
    app.get("/flights", (req, res) => {
        res.render("flights", {});
      });

    // Search By IATA on Homepage
    app.get("/deals/search", flights.findFlight);



// Load sample on deals page
    app.get("/deals", (req, res) => {
      let sample = [{
        type: 'flight-destination',
        origin: 'MAD',
        destination: 'CUN',
        departureDate: '2022-02-28',
        returnDate: '2022-03-08',
        price: { total: '370.27' },
        links: {
          flightDates: 'https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=CUN&departureDate=2022-02-15,2022-03-01&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION',
          flightOffers: 'https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=CUN&departureDate=2022-02-28&returnDate=2022-03-08&adults=1&nonStop=false'
        }
      }];

      

  let image = "https://images.unsplash.com/photo-1613425653628-23fd58c3c2b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDE2NTB8MHwxfHNlYXJjaHwxMHx8dmFjYXRpb258ZW58MHx8fHwxNjQ2MTAwMjY3&ixlib=rb-1.2.1&q=80&w=1080";
  let airportNames = ["Guangzhou Baiyun International Airport"];
  let url = "";
  getCoord(url).then( (response) => {
    
    console.log(url);
    console.log(response);
    res.render("deals", {flightData: sample, image: image, airportNames: airportNames, src: response});
  })
  

  //src="https://www.google.com/maps/embed/v1/view?zoom=13&center=40.7769,-73.8740&key=AIzaSyA8HYuusyZDjNt1yjXABwqpOpalqL94kEk

      
      
    });

// Amadeus Autocomplete
    app.get("/api/autocomplete", async (request, response) => {
      try {
        const { query } = request;
        const { data } = await amadeus.referenceData.locations.get({
          keyword: query.keyword,
          subType: Amadeus.location.city,
        });
        response.json(data);
      } catch (error) {
        console.error(error.response);
        response.json([]);
      }
    });
}

async function getImages(keyword) {
  let options = {
    method: 'GET',
    url: `http://localhost:3000/api/v1/images/${keyword}`
  }
  try{
    return await axios.request(options);  
  } catch (e) {
    console.log(e);
  }
}

async function getCoord(srcUrl) {
  let body = {'location' : 'Guangzhou Baiyun International Airport, Baiyun, Guangzhou, Guangdong Province, China'};

  await axios.post('http://localhost:4350/locate', body).then((coords) => {
    let latlng = coords.data;
    console.log(latlng);
    srcUrl= `https://www.google.com/maps/embed/v1/view?zoom=13&center=${latlng.lat},${latlng.lng}&key=AIzaSyA8HYuusyZDjNt1yjXABwqpOpalqL94kEk`;
    console.log(srcUrl);

    
    return srcUrl;
  })
  
  
}

function initMap(latlng) {
  // The location of Uluru
  const uluru = { lat: 23.3959079, lng: 1.3079699 }
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
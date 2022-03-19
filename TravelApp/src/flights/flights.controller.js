let axios = require("axios").default;
var XMLHttpRequest = require('xhr2');
var Amadeus = require('amadeus'); 
const res = require("express/lib/response");
let image;

var amadeus = new Amadeus({ 
    clientId: process.env["AMADEUS_CLIENT_ID"], 
    clientSecret: process.env["AMADEUS_CLIENT_SECRET"] 
  }); 


module.exports.findFlight = (req, res) => {
    console.log(req.query);
    let iata = req.query.originIATA;
    let now = new Date();
    let later = new Date(Date.now() + (6.048e+8 * 2) );
    later = later.toISOString().substring(0,10);
    now = now.toISOString().substring(0,10);
    
    amadeus.shopping.flightDestinations.get({ 
        origin: String(iata),  
    }).then(function (data) { 
        let flightData = parseAmadeus(JSON.parse(data.body));    
        
        getImages("vacation").then( (response) => {
          image = response.data.urls;
        });


        
        if (flightData) {
          let airportNames = [];
          flightData.forEach((flight) => {
            valiidateAirport(flightData.destination).then((res) => {
              airportNames.push(res);
            });

          })
          airportNames.slice(5);
          console.log(airportNames);
          res.render('deals', {flightData: flightData, image: image, airportNames: airportNames});
        } else {
          res.redirect("/deals");
        }    
      }).catch(function (responseError) { 
        console.log(JSON.stringify(responseError)); 
      });      
}

async function validateAirport(iata) {
    // Validate 3-letter airport code
let options = {
    method: 'GET',
    url: 'https://airport-info.p.rapidapi.com/airport',
    params: {iata: iata.toUpperCase()},
    headers: {
      'x-rapidapi-host': 'airport-info.p.rapidapi.com',
      'x-rapidapi-key': '27b58ba4eemshf77ab49c98fcbc7p1ed5f4jsn4c81a38ab5de'
    }
  };
  await axios.request(options).then(function (response) {
	  return response.name;

}).catch(function (error) {
	console.error(error);
});
}

function parseAmadeus(flightData) {
  flightData = flightData.data;
  return flightData;
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

async function getLatLong(location) {
  let body = {'location' : 'Terminal B - Ground Level, Queens, NY 11371'};

  const response = await axios.post('http://localhost:4350/locate', body);
  console.log(response.data);  
}

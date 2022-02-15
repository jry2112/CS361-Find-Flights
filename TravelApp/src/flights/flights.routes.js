module.exports =(app) =>{
    const flights = require("./flights.controller.js");
    //Home Page
    app.get("/flights", (req, res) => {
        res.render("flights", {});
      });

    // Search By IATA on Homepage
    app.get("/deals/search", flights.findFlight);

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
      res.render("deals", {flightData: sample});
    });


}
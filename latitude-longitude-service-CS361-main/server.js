const axios = require("axios");
const express = require("express");

// initialize express server
const app = express();
app.use(express.json());
const PORT = 4350;		// default port is set to 4350 but you can change this
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// IMPORTANT: put your google geocode api key here otherwise the requests will not work
const key = "AIzaSyA8HYuusyZDjNt1yjXABwqpOpalqL94kEk";

// given an address or location responds with the latitude and longitude of that location
// simply send a POST request with location in the body.
app.post("/locate", async (req, res) => {
	try {
		const location = req.body.location;
		console.log(req.body);
		console.log(location);

		// send request to google api
		const { data } = await axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${location}}&key=${key}`
		);

		// if the response status is OK return the lat and lng
		if (data.status === 'OK') {
			const lat = data.results[0].geometry.location.lat;
			const lng = data.results[0].geometry.location.lng;
			return res.status(200).json({ lat, lng });
		} else {
			return res.status(400).json({ message: "there was a problem when trying to process your request (check your api key)" })
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: "error" })
	}
});

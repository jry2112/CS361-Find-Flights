const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const axios = require("axios");

const path = require("path");
const port = process.env.PORT || 7473;
const uri = process.env.MONGODB_URI;
const database = process.env.MONGODB_DB;
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

//For use with Google API
const mapCall = ``;

const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.set('layout', 'layouts/layout');

// bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//MongoDB
mongoose.connect(`mongodb+srv://${user}:${password}@travelcluster.qcf2r.mongodb.net/${database}?retryWrites=true&w=majority`,
 {useNewUrlParser: true});

app.listen(port, () => {
  require("./src/main/main.routes.js")(app);
  require("./src/flights/flights.routes.js")(app);
  console.log(`Server started on port ${port}`);
  console.log(`Connected to db ${database}`);
});
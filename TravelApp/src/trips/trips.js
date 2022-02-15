const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const axios = require("axios");

const path = require("path");
const port = process.env.PORT || 7473;
const uri = process.env.MONGODB_URI;
const database = process.env.MONGODB_DB;
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

const app = express();

app.set('view engine', 'ejs');

// bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//MongoDB
mongoose.connect(`mongodb+srv://${user}:${password}@travelcluster.qcf2r.mongodb.net/${database}?retryWrites=true&w=majority`,
 {useNewUrlParser: true});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Connected to db ${database}`);
});
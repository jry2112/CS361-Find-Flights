const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();
const fetch = require('cross-fetch/polyfill');

const PORT = process.env.PORT || 3000;

app.set('port', PORT);
app.use(logger('tiny'));

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Express Server started on Port ${PORT}`);
  require("./images.js")(app);
    app.use((req, res, next) => {
        const err = new Error(`${req.method} ${req.url} Not Found`);
        err.status = 404;
        next(err);
    });
  
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(err.status || 500);
        res.json({
        error: {
            message: err.message,
        },
        });
    });
});

// Endpoint
//GET https://www.ourapi.com/api/v1/images/cars - This will get 5 images for cars
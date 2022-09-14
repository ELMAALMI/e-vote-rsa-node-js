const express = require('express');
const handlebars = require('express-hbs');
const session = require('express-session');
const mongoose = require('mongoose');
const routers = require('./router');
const { initUsers } = require('./src/controller');
const { initVoters } = require('./src/controller/AuthController');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

require('dotenv').config();

//connection database
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        console.log('database connected......');
    })
    .catch((e) => {
        console.log(e);
        console.log('database not connected...');
    });
// app
const app = express();
//configuration session app
const oneDay = 1000 * 60 * 60 * 24;
app.use(
    session({
        secret: process.env.SESSSION_KEY,
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false
    })
);

// filter http headers
app.use(function (request, response, next) {
    //Pour eviter les problemes de CORS/REST
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', '*');
    response.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    next();
});

//
app.use(express.urlencoded({ extended: true, limit: '1kb' }));
app.use(express.json({ limit: '10kb' }));

//

//Sets handlebars configurations (we will go through them later on)
const hbs = handlebars.express4({
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
});
handlebars.registerHelper('compare_dates', function (arg1, options) {
    return new Date() > new Date(arg1);
});
handlebars.registerHelper('formateDate', function (date, options) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
handlebars.registerHelper('slice', function (str, options) {
    return str.slice(0, 100) + ' .....';
});
app.engine('hbs', hbs);
app.set('view engine', 'hbs');

//
//
app.use(express.static('public'));
//
app.use(routers);

// seed data into db
initUsers();
// initVoters();

//server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('the Server is Running at Port ' + port);
});

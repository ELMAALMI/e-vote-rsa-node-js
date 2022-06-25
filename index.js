const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const routers = require('./router');
const { initUsers } = require('./src/controller');
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
//
app.use(express.json({ limit: '10kb' }));
//
app.set('view engine', 'hbs');
//
app.set('views', path.join(__dirname, 'src/views'));
//
app.use(express.static('public'));
//
app.use(routers);

// seed data into db
initUsers();

//server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('the Server is Running at Port ' + port);
});

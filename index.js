const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
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
app.use(express.urlencoded({ extended: true, limit: '1kb' }));
app.use(express.json({ limit: '10kb' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.get('/', (req, res) => {
    return res.render('index');
});

//server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('the Server is Running at Port ' + port);
});

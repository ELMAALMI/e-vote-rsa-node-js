const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//connection database
mongoose
    .connect(process.env.DATABASE, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('database connected......');
    })
    .catch(() => {
        console.log('database not connected...');
    });
// app
const app = express();
app.use(express.urlencoded({ extended: true, limit: '1kb' }));
app.use(express.json({ limit: '10kb' }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('the Server is Running at Port ' + port);
});

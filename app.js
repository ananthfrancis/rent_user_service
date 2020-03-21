require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/index');
const error = require('./common/error'); 
require('dotenv/config');

const app = express();

winston.add(new winston.transports.File({ filename:'logfile.log' }));
winston.add(new winston.transports.MongoDB({ db:process.env.DB_CONNECTION }));

app.use(cors());
app.use(bodyParser.json());
app.use('/userService',  userRoute);
app.use(error);

mongoose.connect(process.env.DB_CONNECTION, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => {
    console.log("Connected to DB");})
.catch((err) => {console.log("Connection to DB was wrong.");})

app.listen(process.env.SERVICE_PORT);
console.log("Listening to the port : " + process.env.SERVICE_PORT);
module.exports = app;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Import routes
const authRoute = require('./routes/auth');
const dbRouth = require('./routes/database');
const utilsRouth = require('./routes/utils');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to DB'));

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/database', dbRouth);
app.use('/api/utils', utilsRouth);

app.listen(3000, () => console.log("Server Up and Runing"));
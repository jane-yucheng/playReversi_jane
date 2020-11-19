const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//create a routea
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post')

dotenv.config();

console.log(process.env.DB_CONNECT)

mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log('connect to DB')
);

//middleware
app.use(express.json());

//Route middleware
// it is going to be /api/user/register
app.use('/api/user', authRoute);
app.use('/api/post',postRoute);


app.listen(8000, () => console.log('up and running'));
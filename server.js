const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//start the app 
const app= express();

const authRouts=require('./routes/auth')


// connecting to database
mongoose.connect(process.env.DATABASE,{useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{
    console.log('connected to database');
}).catch((e)=>{
    console.log(e)
})

app.use('/api',authRouts)

app.listen(process.env.PORT ,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8000

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to bodyParser
app.use(bodyParser.urlencoded({extended:true}));

//set view engine
app.set("view engine","ejs");

// to set view engine in some specific folder or different
// app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));

//load the routers
app.use('/',require('./server/routes/router'));


app.listen(PORT, () => {
    console.log(`Server started in http://localhost:${PORT}`);
})
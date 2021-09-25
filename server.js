'use strict';
// http://localhost:3050/

const express = require('express');
require('dotenv').config()
const server = express();
const cors = require('cors');
server.use(cors());
const PORT = process.env.PORT;
const weather = require('./modules/weather')
const movies = require('./modules/movies')

server.get('/', (req, res) => {
    res.status(200).send('Hi and hello');
});

// /weather?lat=<lat>&lon=<lon>
 server.get('/weather', weather)

// /movie?title=<title>
server.get('/movie', movies)

server.get('/test',(req,res)=>{
    res.send(`API server is working`)
})

server.get('*',(req,res)=>{
    res.status(404).send('Route is not found')
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})
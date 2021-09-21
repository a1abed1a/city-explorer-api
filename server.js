'use strict';

// http://localhost:3050/

// const { request, response} = require('express')

const express = require('express');
require('dotenv').config()

const server = express();

const cors = require('cors');
server.use(cors());

const axios = require('axios');

const data = require('./data/weather.json');

const PORT = process.env.PORT;

server.get('/', (req, res) => {
    res.status(200).send('Hi and hello');
});
// /weather?lat=<lat>&lon=<lon>
 server.get('/weather', async(req, res) => {
    
    let lat = req.query.lat;
    let lon = req.query.lon;

    let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);

    let finalData = weatherData.data.data.map(ele => {
        return{description:`Temperature ${ele.temp}°C with ${ele.weather.description}`, date:ele.datetime}
    })

    res.send(finalData)
});

// /movie?title=<title>
server.get('/movie', async(req, res) => {

    let title = req.query.title;

    let temMovieData = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`);
    let movieData = temMovieData.data.results;
    for (let i = 1; i < 5; i++) {
        temMovieData = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${i+1}`);
        movieData = movieData.concat(temMovieData.data.results);     
    }
    res.send(movieData.filter(ele=> ele.title.toLowerCase().includes(title.toLowerCase())))
});

server.get('/test',(req,res)=>{
    let a =[]
    res.send(`API server is working ${a.length > 0 ? 'yes':'no'}`)
})

server.get('*',(req,res)=>{
    res.status(404).send('Route is not found')
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})
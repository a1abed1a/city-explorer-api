const axios = require('axios');
const { query } = require('express');

// /movie?title=<title>
async function movies(req, res){
    let title = req.query.title;
    let temMovieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${title}`);
    let movieData = temMovieData.data.results;
    res.send(movieData.filter(ele => ele.title.toLowerCase().includes(title.toLowerCase())))
}

module.exports = movies;
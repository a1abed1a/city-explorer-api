const axios = require('axios');
const { query } = require('express');
let cache = {};

// /movie?title=<title>
async function movies(req, res) {
    let title = req.query.title;

    if (cache[title] !== undefined) {
        res.send(cache[title]);
    } else {
        let temMovieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${title}`);
        let movieData = temMovieData.data.results;
        let finalData = movieData.filter(ele => ele.title.toLowerCase().includes(title.toLowerCase()))
        cache[title] = finalData
        res.send(finalData)
    }
}

module.exports = movies;
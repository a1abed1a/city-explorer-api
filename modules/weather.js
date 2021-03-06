const axios = require('axios');
const { query } = require('express');
let cache = {};

// /weather?lat=<lat>&lon=<lon>
async function weather(req, res){
    // let lat = req.query.lat;
    // let lon = req.query.lon;
    let{lat,lon} = req.query;
    let search = lat+lon
    console.log(search)

    if (cache[search] !== undefined) {
        res.send(cache[search]);
    } else {
    let weatherData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
    let finalData = weatherData.data.data.map(ele => {
        return { description: `Low of ${ele.low_temp}, high of ${ele.max_temp} with ${ele.weather.description}`, date: ele.datetime }
    })
    cache[search] = finalData
    res.send(finalData)
    }
}
module.exports = weather;
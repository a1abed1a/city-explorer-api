'use strict';

// const { request, response} = require('express')

const express = require('express');
require('dotenv').config()

const server = express();

const data = require('./data/weather.json');

const PORT = process.env.PORT;

server.get('/', (req, res) => {
    res.status(200).send('Hi and hello');
});

// /weather?locatioName=<locatioName>
server.get('/weather', (req, res) => {
    
    let locatioName = req.query.locatioName;

    let locationData = data.find((item)=>{
        if(item.city_name.toLocaleLowerCase() === locatioName.toLocaleLowerCase()) {
            return item
        }
    })
    let finalData = locationData.data.map(ele => {
        return{description:`Low of ${ele.low_temp}, high of ${ele.max_temp} with ${ele.weather.description}`, date:ele.valid_date}
    })
    res.send(finalData)
});

server.get('/test',(req,res)=>{
    res.send('API server is working')
})

server.get('*',(req,res)=>{
    res.status(404).send('Route is not found')
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})
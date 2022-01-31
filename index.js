//add some code that allows us to create a server and use Express js
const express = require('express')

//use HTTPS module to make api request to the OpenWeather app (make a Get request to external server)
const https = require('https');

//call the get method on the server to use the API endpoint
    https.get('https://api.openweathermap.org/data/2.5/weather?q=Dubai&appid=4d7f1f6171fc173b7dd95c78d126bad0&units=metric', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
        //add this to parse our JSON data and make it readable
        const weatherData = JSON.parse(d);
        console.log(weatherData)
        //get the temperature in Celsius only
        temp = weatherData.main.temp
        console.log(temp);
        //get the name of the city
        city = weatherData.name;
        console.log(city);
        //get the description of the weather 
        desc = weatherData.weather[0].description;
        console.log(desc);
    });

    }).on('error', (e) => {
    console.error(e);
    });


//get the app to use the packages & body parser
const app = express()
const port = 3000

//create a get request that responds with the index.html file
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

//this starts up the localhost 3000 on our local machine
app.listen(port, () => {
    console.log(`Hey Debbie, your new server is listening on ${port}`)
})

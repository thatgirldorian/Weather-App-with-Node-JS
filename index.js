//add some code that allows us to create a server and use Express js
const express = require('express')

//use HTTPS module to make api request to the OpenWeather app (make a Get request to external server)
const https = require('https');

//use bodyParser to fetch the data from the server
const bodyParser = require('body-parser')


//get the app to use the packages & body parser
const app = express()
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 3000

//render this data onto our webpage
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html")
    })

//this sends the data from our form to our server
app.post('/', function(req, res) {

    //call the get method on the server to use the API endpoint
    //create a variable to hold the city name to be typed in
    const cityQuery = req.body.cityName;
    const apiKey = "insert apiKey"
    const unit = "metric"

    https.get('https://api.openweathermap.org/data/2.5/weather?q=' + cityQuery + '&appid=' + apiKey + '&units=' + unit, (response) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    response.on('data', (d) => {
        process.stdout.write(d);
        //add this to parse our JSON data and make it readable
        const weatherData = JSON.parse(d);
        //get the temperature in Celsius only
        const temp = weatherData.main.temp
        //get the name of the city
        const city = weatherData.name;
        //get the description of the weather
        const desc = weatherData.weather[0].description;
        //add corresponding weather icon
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@4x" + ".png"

        res.write(`<p>Hey, the weather is currently ${desc}.</p>`);
        res.write(`<h2>The temperature in ${cityQuery} is ${temp} degrees celsius today.</h2>`);
        res.write("<img src='" + imageUrl + "'>");
        res.send();
        });

    })
})

//this starts up the localhost 3000 on our local machine
app.listen(port, () => {
    console.log(`Hey Debbie, your new server is listening on ${port}`)
})

//add some code that allows us to create a server and use Express js
const express = require('express')

//require body parser
var bodyParser = require('body-parser')

//use HTTPS module to make api request to the OpenWeather app (make a Get request to external server)
const https = require('https');

//call the get method on the server to use the API endpoint
    https.get('https://api.openweathermap.org/data/2.5/weather?q=Dubai&appid=4d7f1f6171fc173b7dd95c78d126bad0&units=metric', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });

    }).on('error', (e) => {
    console.error(e);
    });


//get the app to use the packages
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
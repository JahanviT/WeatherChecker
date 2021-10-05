const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
const query = req.body.cityName;
const apiKey = "f382c6047a7fe9b93f327bec39229421";
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;
https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const weatherDescription = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
    //res.write("<h3>The weather is cuttently " + weatherDescription + "</h3>");
    //res.write("<h1>The temperature in vadodara is " + temp + " degree celcius</h1>");
    res.send("<h3>The weather is cuttently " + weatherDescription + "</h3>" + "<h1>The temperature in "+ query +" is " + temp + " degree celcius</h1>"+ "<img src=" + imageURL + ">")
  })
})
})

app.listen(3000, function() {
  console.log("server is running on port 3000.");
});

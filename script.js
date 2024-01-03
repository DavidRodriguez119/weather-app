// define the API Key
const APIKey = `5b4acd3e0ae2a7e29332200294faf228`;

// Global Variables
let city;
let cityData;

// Fetch Request
const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    cityData = data;
  });


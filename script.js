// define the API Key
const APIKey = `5b4acd3e0ae2a7e29332200294faf228`;

// Global Variables
let city;
let cityData;
const inputField = document.getElementById(`input-field`);
const cityName = document.getElementById(`city-name`);
const currentTemp = document.getElementById(`current-temp`);
const currentWind = document.getElementById(`current-wind`);
const currentHumidity = document.getElementById(`current-humidity`);

// when the search button is clicked do the following:
document.getElementById(`search-button`).addEventListener(`click`, function () {
    // get the input value
    city = inputField.value
    // Fetch Request
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        cityData = data;
        console.log(cityData);
        setCurrentValues();
        });        
})

// Set the values of the current day into the page
const setCurrentValues = () => {
    cityName.innerHTML = cityData.name;
    tempCelcius = cityData.main.temp-273.15;
    currentTemp.innerHTML = `Temp: ${tempCelcius.toFixed(2)}°C`;
    currentWind.innerHTML = `Wind: ${cityData.wind.speed} MPH`;
    currentHumidity.innerHTML = `Humidity: ${cityData.main.humidity}%`
}



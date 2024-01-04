// define the API Key
const APIKey = `5b4acd3e0ae2a7e29332200294faf228`;

// Global Variables
let city;
let cityData;
const forecast = [];
const inputField = document.getElementById(`input-field`);
const searchHistory = document.getElementById(`search-history`);
const cityName = document.getElementById(`city-name`);
const currentTemp = document.getElementById(`current-temp`);
const currentWind = document.getElementById(`current-wind`);
const currentHumidity = document.getElementById(`current-humidity`);
const forecastContainer = document.getElementById(`forecast-container`);

document.addEventListener("DOMContentLoaded", function() {
    const citiesHistoryString = localStorage.getItem(`cities`)
    const citiesHistory = JSON.parse(citiesHistoryString);
    if(citiesHistory){
        createHistory(citiesHistory);
    }
});

const createHistory = (cities) => {
    for(let city of cities){
        const historyButton = document.createElement(`button`);
        historyButton.innerHTML = city;
        searchHistory.appendChild(historyButton);

        historyButton.addEventListener(`click`, function () {
            // reset page
            forecast.length = 0;
            forecastContainer.innerHTML = ``
            // get the input value
            city = historyButton.innerHTML
            // Fetch Request
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
                .then(function (response) {
                return response.json();
                })
                .then(function (data) {
                cityData = data;
                console.log(cityData);
                setCurrentValues();
                getForecastData();
                const citiesHistoryString = localStorage.getItem(`cities`)
                const citiesHistory = JSON.parse(citiesHistoryString);
                if(!citiesHistory){
                    const cities = [cityData.name];
                    const citiesString = JSON.stringify(cities);
                    localStorage.setItem(`cities`, citiesString);
                    createHistory(cities);
                } else {
                    citiesHistory.push(cityData.name);
                    const newCitiesString = JSON.stringify(citiesHistory);
                    localStorage.setItem(`cities`, newCitiesString)
                    const newArray = [cityData.name]
                    createHistory(newArray);
                };
                });        
        })
    };
};

// when the search button is clicked do the following:
document.getElementById(`search-button`).addEventListener(`click`, function () {
    console.log(`hi`);
    // reset page
    forecast.length = 0;
    forecastContainer.innerHTML = ``
    // get the input value
    if(!inputField.value){
        return;
    } else {
        city = inputField.value    
    }     
    // Fetch Request
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        cityData = data;
        console.log(cityData);
        setCurrentValues();
        getForecastData();
        const citiesHistoryString = localStorage.getItem(`cities`)
        const citiesHistory = JSON.parse(citiesHistoryString);
        if(!citiesHistory){
            const cities = [cityData.name];
            const citiesString = JSON.stringify(cities);
            localStorage.setItem(`cities`, citiesString);
            createHistory(cities);
        } else {
            citiesHistory.push(cityData.name);
            const newCitiesString = JSON.stringify(citiesHistory);
            localStorage.setItem(`cities`, newCitiesString)
            const newArray = [cityData.name]
            createHistory(newArray);
        };
        });        
})


// Set the values of the current day into the page
const setCurrentValues = () => {
    const day = dayjs().format('DD/MM/YYYY');
    let emojiHeader;
    if(cityData.weather[0].main === `Clear`){
        emojiHeader = `☀️`;
    } else if (cityData.weather[0].main === `Clouds`){
        emojiHeader = `☁️`;
    } else {
        emojiHeader = `☔`;
    }
    cityName.innerHTML = `${cityData.name} (${day}) ${emojiHeader}`;
    tempCelcius = cityData.main.temp-273.15;
    currentTemp.innerHTML = `Temp: ${tempCelcius.toFixed(2)}°C`;
    currentWind.innerHTML = `Wind: ${cityData.wind.speed} MPH`;
    currentHumidity.innerHTML = `Humidity: ${cityData.main.humidity}%`
};

// get data of 5 day forecast
const getForecastData = () => {
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.coord.lat}&lon=${cityData.coord.lon}&appid=${APIKey}&cnt=40`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            forecast.push(data.list[0]);
            forecast.push(data.list[8]);
            forecast.push(data.list[16]);
            forecast.push(data.list[24]);
            forecast.push(data.list[32]);
            console.log(forecast);
            setForecastValues();
        });
};

const setForecastValues = () => {
    for(let i = 0; i <= 4; i++){        
        const forecastDiv = document.createElement(`div`);
        forecastDiv.classList.add(`forecast-div`);
        // create html elements
        const subTitle = document.createElement(`h3`);
        const emoji = document.createElement(`p`);
        const tempParagraph = document.createElement(`p`);
        const windParagraph = document.createElement(`p`);
        const humidityParagraph = document.createElement(`p`);

        // add content
        subTitle.textContent = dayjs().add(i+1, `day`).format('DD/MM/YYYY');
        if(forecast[i].weather[0].main === `Clear`){
            emoji.textContent = `☀️`;
        } else if (forecast[i].weather[0].main === `Clouds`){
            emoji.textContent = `☁️`;
        } else {
            emoji.textContent = `☔`;
        }
        tempCelcius = forecast[i].main.temp-273.15;
        tempParagraph.textContent = `Temp: ${tempCelcius.toFixed(2)}°C`;
        windParagraph.textContent = `Wind: ${forecast[i].wind.speed}MPH`;
        humidityParagraph.textContent = `Humidity: ${forecast[i].main.humidity}%`;

        // append to the page
        forecastContainer.appendChild(forecastDiv);
        forecastDiv.appendChild(subTitle);
        forecastDiv.appendChild(emoji);
        forecastDiv.appendChild(tempParagraph);
        forecastDiv.appendChild(windParagraph);
        forecastDiv.appendChild(humidityParagraph);
    };
};





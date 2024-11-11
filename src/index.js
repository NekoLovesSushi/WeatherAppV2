function displayWeatherData(response) {
  // Existing temperature display
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;

  // New data for humidity and wind speed
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  // Update humidity and wind speed
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  // Update weather description
  descriptionElement.innerHTML = response.data.condition.description;

  // Update weather icon
  let iconCode = response.data.condition.icon;
  iconElement.innerHTML = `<img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconCode}.png" alt="${response.data.condition.description}" />`;

  //Update Weather Forecast
  getForecast(response.data.city);
}

function getForecast(city) {
  let apiKey = "21e8a41ecb5f3t140bf774eca0oae7aa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
        <div class="forecastDay">
        <div class="weekday">${formatDay(day.time)}</div>
        <div class="forecastIcon">
        <img src= "${day.condition.icon_url}"
        />
        </div>
        <div class="forecastTemps">
        <span class="hiTemp">${Math.round(
          day.temperature.maximum
        )}°</span> <span class="lowTemp">${Math.round(
        day.temperature.minimum
      )}°</span>
        </div>
      </div>
      `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function search(city) {
  let apiKey = "21e8a41ecb5f3t140bf774eca0oae7aa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherData);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#searchInput");
  let city = searchInputElement.value;
  search(city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function initialize() {
  let defaultCity = "North Pole";
  search(defaultCity);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSearch);

let currentDateELement = document.querySelector("#date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

window.addEventListener("load", initialize);

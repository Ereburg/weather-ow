document.addEventListener('DOMContentLoaded', () => {
  // SELECT ELEMENTS
  const iconElement = document.querySelector(".weather__icon");
  const tempElement = document.querySelector(".temperature__value");
  const tempScale = document.querySelector('.temperature__scale');
  const descElement = document.querySelector(".temperature__description");
  const locationElement = document.querySelector(".location__value");
  const notificationElement = document.querySelector(".application__notification");
  

  // App data
  const weather = {};

  weather.temperature = {
    unit: "celsius"
  };

  // APP CONSTS AND VARS
  const KELVIN = 273;
  // API KEY
  const key = "98d3103a9e35f0bf2a7e061087bf6a6e";

  // CHECK IF BROWSER SUPPORTS GEOLOCATION
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    notificationElement.style.display = "block";
    notificationElement.textContent = "Browser doesn't Support Geolocation";
  }

  // SET USER'S POSITION
  function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  }

  // SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
  function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.textContent = `${error.message}`;
  }

  // GET WEATHER FROM API PROVIDER
  function getWeather(latitude, longitude) {
    // const proxy = 'https://cors-anywhere.herokuapp.com/';
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
      .then(function (response) {
        let data = response.json();
        return data;
      })
      .then(function (data) {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
      })
      .then(function () {
        displayWeather();
      });
  }

  // DISPLAY WEATHER TO UI
  function displayWeather() {
    iconElement.setAttribute("src", `icons/${weather.iconId}.png`);
    tempElement.textContent = `${weather.temperature.value}°`;
    descElement.textContent = `${weather.description}`;
    locationElement.textContent = `${weather.city}, ${weather.country}`;
  }

  // C to F conversion
  function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
  }

  // WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
  tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);

      tempElement.textContent = `${fahrenheit}°`;
      tempScale.textContent = `F`;
      weather.temperature.unit = "fahrenheit";
    } else if (weather.temperature.unit != "kelvin") {
      let kelvins = (weather.temperature.value + KELVIN);
      kelvins = Math.floor(kelvins);

      tempElement.textContent = `${kelvins}°`;
      tempScale.textContent = `K`;
      weather.temperature.unit = "kelvin";
    } else {
      tempElement.textContent = `${weather.temperature.value}°`;
      tempScale.textContent = `C`;
      weather.temperature.unit = "celsius";
    }
  });

  const buttonCelsius = document.querySelector('.button--celsius');
  const buttonCFarenh = document.querySelector('.button--farenheights');
  const buttonKelvins = document.querySelector('.button--kelvins');

  buttonCelsius.addEventListener('click', () => {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit != "celsius") {
      tempElement.textContent = `${weather.temperature.value}°`;
      tempScale.textContent = `C`;
      weather.temperature.unit = "celsius";
    }
  });

  buttonCFarenh.addEventListener('click', () => {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit != "fahrenheit") {
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);

      tempElement.textContent = `${fahrenheit}°`;
      tempScale.textContent = `F`;
      weather.temperature.unit = "fahrenheit";
    }
  });

  buttonKelvins.addEventListener('click', () => {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit != "kelvin") {
      let kelvins = (weather.temperature.value + KELVIN);
      kelvins = Math.floor(kelvins);

      tempElement.textContent = `${kelvins}°`;
      tempScale.textContent = `K`;
      weather.temperature.unit = "kelvin";
    }
  });
});
const ApiKey = "653fa41d3df64796ac381c729d4fc434";
const ApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const CityName = document.querySelector(".cityname");
const Temp = document.querySelector(".temperature");
const Humidity = document.querySelector(".humidity");
const WindSpeed = document.querySelector(".windSpeed");
const WeatherIcon = document.querySelector(".weather-icon");
const ErrorMsg = document.querySelector(".error");

const SearchInput = document.querySelector("#search-input");
const SearchBtn = document.querySelector("#serach-btn");

async function checkWeather(city) {
  const response = await fetch(ApiUrl + city + `&appid=${ApiKey}`);

  if (response.status == 404) {
    ErrorMsg.style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);

    CityName.innerHTML = data.name;
    Temp.innerHTML = Math.round(data.main.temp) + "°c";
    Humidity.innerHTML = data.main.humidity + "%";
    WindSpeed.innerHTML = Math.round(data.wind.speed) + " km/h";

    if (data.weather[0].main == "Clouds") {
      WeatherIcon.src = "/assets/img/cloud.png";
    } else if (data.weather[0].main == "Rain") {
      WeatherIcon.src = "/assets/img/rain.png";
    } else if (data.weather[0].main == "Clear") {
      WeatherIcon.src = "/assets/img/sun.png";
    } else if (data.weather[0].main == "Snow") {
      WeatherIcon.src = "/assets/img/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    ErrorMsg.style.display = "none";
  }
}

SearchBtn.addEventListener("click", () => {
  checkWeather(SearchInput.value);
});

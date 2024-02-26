const apiKey = "PFS2YZ8SVYWYCJNVL6R238K5X";

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
// temperatureCelsius = 0;

search.addEventListener("click", () => {
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;

  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}/today?key=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const img = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature ");
      const description = document.querySelector(".weather-box .description ");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      const conditions = data.currentConditions.conditions;
      if (conditions === "Partially cloudy") {
        img.src = "/mist.png";
      } else if (conditions === "Clear") {
        img.src = "/clear.png";
      } else if (conditions === "Rain, Partially cloudy") {
        img.src = "/rain.png";
      } else if (conditions === "Snow, Overcast") {
        img.src = "/snow.png";
      } else if (conditions === "Broken clouds") {
        img.src = "/cloud.png";
      } else {
        img.src = "/cloud.png";
        img.style.transform = "width:50%";
        img.style.transform = "height:50%";
      }

      //   temperatureCelsius = Math.ceil((data.currentConditions.temp - 32) / 1.8);
      temperature.innerHTML = `${parseInt(
        Math.ceil((data.currentConditions.temp - 32) / 1.8)
      )}<span>°C</span>`;

      description.innerHTML = `${data.currentConditions.conditions}`;

      humidity.innerHTML = `${data.currentConditions.humidity}`;

      wind.innerHTML = `${data.currentConditions.windspeed} Km/h`;
    })

    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

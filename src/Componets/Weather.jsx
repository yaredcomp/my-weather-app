import React, { Component } from "react";
import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: 52.52,
  longitude: 13.41,
  hourly: "temperature_2m",
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start, stop, step = 1) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const hourly = response.hourly();

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
  hourly: {
    time: range(
      Number(hourly.time()),
      Number(hourly.timeEnd()),
      hourly.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
    temperature2m: hourly.variables(0).valuesArray(),
  },
};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
for (let i = 0; i < weatherData.hourly.time.length; i++) {
  console.log(
    weatherData.hourly.time[i].toISOString(),
    weatherData.hourly.temperature2m[i]
  );
}

export class Weather extends Component {
  render() {
    return (
      <div>
        <h1>Weather is evreything</h1>
        <li>
          {}
        </li>
<div>
  <h1>Weather is evreything</h1>
  <ul>
    {weatherData.hourly.time.map((time, i) => (
      <li key={i}>
        {time.toLocaleDateString()} {time.toLocaleTimeString()}: {weatherData.hourly.temperature2m[i]} °C
      </li>
    ))}
  </ul>
</div>

         {}
    
      </div>
    );
  }
}


export default Weather;

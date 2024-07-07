import React, { useState, useEffect, FormEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import WeatherCard from "@/components/WeatherCard";
import NextDayWeatherCard from "./NextDayWeatherCard";
import weatherIcons from "@/components/Icons/weatherIcons";
import { ModeToggle } from "@/components/mode-toggle";

interface CurrentWeather {
  temperature: number;
  weathercode: number;
  windspeed: number;
  winddirection: number;
}

interface DailyWeather {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
  time: string[];
}

interface WeatherData {
  current_weather: CurrentWeather;
  daily: DailyWeather;
}

const Today: React.FC = () => {
  const [city, setCity] = useState<string>("Addis Ababa");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchCoordinates(city);
  }, [city]);

  const fetchCoordinates = async (city: string) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`
      );
      const location = response.data[0];
      fetchWeather(parseFloat(location.lat), parseFloat(location.lon));
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=auto`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    fetchCoordinates(city);
  };

  const getWeatherIcon = (code: number) => {
    return (
      (
        weatherIcons as { [key: number]: { description: string; icon: string } }
      )[code] || { description: "Unknown", icon: "path/to/default_icon.png" }
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Weather Forecasting
        </h2>
        <ModeToggle />
      </div>

      <div className="flex justify-end mb-4">
        <form onSubmit={handleSearch} className="mb-4 flex">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 border border-gray-300 rounded"
            placeholder="Enter city"
          />
          <button
            type="submit"
            className="p-2 bg-blue-400 text-white rounded ml-2"
          >
            <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </form>
      </div>

      {weather && (
        <>
          <WeatherCard
            title="Current Weather"
            description={
              getWeatherIcon(weather.current_weather.weathercode).description
            }
            temperature={weather.current_weather.temperature.toString()}
            windSpeed={weather.current_weather.windspeed.toString()}
            windDirection={weather.current_weather.winddirection.toString()}
            icon={getWeatherIcon(weather.current_weather.weathercode).icon}
            size="large"
          />

          <div className="flex flex-wrap gap-2 mt-4">
            {weather.daily.time.slice(2).map((date, index) => (
              <NextDayWeatherCard
                key={index}
                title={new Date(date)
                  .toLocaleDateString(undefined, {
                    weekday: "long",
                  })
                  .replace(/\d{4}/, "")
                  .trim()}
                description={
                  getWeatherIcon(weather.daily.weathercode[index + 1])
                    .description
                }
                temperature={`${
                  weather.daily.temperature_2m_max[index + 1]
                }°C / ${weather.daily.temperature_2m_min[index + 1]}°C`}
                icon={getWeatherIcon(weather.daily.weathercode[index + 1]).icon}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Today;

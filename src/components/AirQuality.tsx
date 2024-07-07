import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Airquality = () => {
  const [airQualityData, setAirQualityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        latitude: 52.52,
        longitude: 13.41,
        hourly: [
          "pm10",
          "pm2_5",
          "carbon_monoxide",
          "nitrogen_dioxide",
          "sulphur_dioxide",
          "ozone",
          "aerosol_optical_depth",
          "dust",
          "uv_index",
        ],
      };

      const url = "https://air-quality-api.open-meteo.com/v1/air-quality";

      try {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();
        const hourly = response.hourly()!;

        const weatherData = {
          hourly: {
            time: range(
              Number(hourly.time()),
              Number(hourly.timeEnd()),
              hourly.interval()
            ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            pm10: hourly.variables(0)!.valuesArray()!,
            pm25: hourly.variables(1)!.valuesArray()!,
            carbonMonoxide: hourly.variables(2)!.valuesArray()!,
            nitrogenDioxide: hourly.variables(3)!.valuesArray()!,
            sulphurDioxide: hourly.variables(4)!.valuesArray()!,
            ozone: hourly.variables(5)!.valuesArray()!,
            aerosolOpticalDepth: hourly.variables(6)!.valuesArray()!,
            dust: hourly.variables(7)!.valuesArray()!,
            uvIndex: hourly.variables(8)!.valuesArray()!,
          },
        };

        setAirQualityData(weatherData);
      } catch (error) {
        console.error("Error fetching air quality data:", error);
        setError("Failed to fetch air quality data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const formatChartData = () => {
    if (!airQualityData) return [];

    return airQualityData.hourly.time.map((time: Date, index: number) => ({
      time: time.toISOString(),
      pm10: airQualityData.hourly.pm10[index],
      pm25: airQualityData.hourly.pm25[index],
      carbonMonoxide: airQualityData.hourly.carbonMonoxide[index],
      nitrogenDioxide: airQualityData.hourly.nitrogenDioxide[index],
      sulphurDioxide: airQualityData.hourly.sulphurDioxide[index],
      ozone: airQualityData.hourly.ozone[index],
      aerosolOpticalDepth: airQualityData.hourly.aerosolOpticalDepth[index],
      dust: airQualityData.hourly.dust[index],
      uvIndex: airQualityData.hourly.uvIndex[index],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const chartData = formatChartData();

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Air Quality
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(time) => new Date(time).toLocaleTimeString()}
          />
          <Legend />
          <Line type="monotone" dataKey="pm10" stroke="#8884d8" />
          <Line type="monotone" dataKey="pm25" stroke="#82ca9d" />
          <Line type="monotone" dataKey="carbonMonoxide" stroke="#ffc658" />
          <Line type="monotone" dataKey="nitrogenDioxide" stroke="#ff7300" />
          <Line type="monotone" dataKey="sulphurDioxide" stroke="#387908" />
          <Line type="monotone" dataKey="ozone" stroke="#8e44ad" />
          <Line
            type="monotone"
            dataKey="aerosolOpticalDepth"
            stroke="#00ced1"
          />
          <Line type="monotone" dataKey="dust" stroke="#ff69b4" />
          <Line type="monotone" dataKey="uvIndex" stroke="#ff4500" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Airquality;

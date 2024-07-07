import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WeatherCardProps {
  title: string;
  description: string;
  temperature: string;
  windSpeed?: string;
  windDirection?: string;
  icon: string;
  size?: "large" | "small";
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  description,
  temperature,
  windSpeed,
  windDirection,
  icon,
  size = "small",
}) => {
  return (
    <Card
      className={`bg-blue-100 p-4 rounded-lg shadow-lg ${
        size === "large" ? "w-full" : "w-40"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-left">{title}</CardTitle>
        <CardDescription className="text-left">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-left">
        <img
          src={icon}
          alt="weather icon"
          className={` ${size === "large" ? "w-24 h-24" : "w-16 h-16"}`}
        />
        <p>Temperature: {temperature} °C</p>
        {windSpeed && <p>Wind Speed: {windSpeed} m/s</p>}
        {windDirection && <p>Wind Direction: {windDirection} °</p>}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;

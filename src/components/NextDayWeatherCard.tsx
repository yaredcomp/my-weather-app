import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NextDayWeatherCardProps {
  title: string;
  description: string;
  temperature: string;
  icon: string;
}

const NextDayWeatherCard: React.FC<NextDayWeatherCardProps> = ({
  title,
  description,
  temperature,
  icon,
}) => {
  return (
    <Card className="bg-blue-100 p-3 rounded-lg shadow-lg w-64">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <img
          src={icon}
          alt="weather icon"
          className="mx-auto align-middle w-50 h-100"
        />
        <p>Temperature: {temperature} °C</p>
      </CardContent>
    </Card>
  );
};

export default NextDayWeatherCard;

import { useState } from "react";
import "../style/WeatherCard.css";
import HourlyForecast from "./HourlyForecast";
import "../style/HourlyForecast.css";

export default function WeatherCard({ weatherData }) {
  const [showHourly, setShowHourly] = useState(false);

  const weatherCondition = weatherData.weather[0].main.toLowerCase();

  const weatherMapping = {
    clear: {
      icon: "/icons/sunny.png",
    },
    rain: {
      icon: "/icons/rainy.png",
    },
    snow: {
      icon: "/icons/snowy.png",
    },
    clouds: {
      icon: "/icons/cloudy.png",
    },

    thunderstorm: {
      icon: "/icons/storm.png",
    },
  };

  const currentWeather =
    weatherMapping[weatherCondition] || weatherMapping["clear"];

  return (
    <div className="cardStyle relative p-10 text-center text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold p-3 mb-2 rounded-lg card-title">
        Weather in {weatherData.name}
      </h2>

      <p className="text-xl p-2 mb-2 card-detail">
        Temperature: {Math.ceil(weatherData.main.temp)}°C
      </p>
      <p className="text-xl p-2 mb-2 capitalize card-detail">
        Conditions: {weatherData.weather[0].description}
      </p>
      <p className="text-xl p-2 mb-2 card-detail">
        Humidity: {weatherData.main.humidity}%
      </p>
      <p className="text-xl p-2 mb-2 card-detail">
        Wind speed: {weatherData.wind.speed} m/s
      </p>

      <button
        onClick={() => setShowHourly(!showHourly)}
        className={`mt-4 px-4 py-2 text-lg font-medium text-white bg-green-600 rounded-md shadow hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 
          ${showHourly ? "bg-red-600" : ""}`}>
        {showHourly ? "Hide Hourly Forecast" : "Show Hourly Forecast"}
      </button>

      <div className={`daily-forecast ${showHourly ? "visible" : ""}`}>
        <HourlyForecast city={weatherData.name} />
      </div>

      <img
        src={currentWeather.icon}
        alt={`Weather icon for ${weatherData.weather[0].description}`}
        className="mx-auto mt-4 weather-icon"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
}

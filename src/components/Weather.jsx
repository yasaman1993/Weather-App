import { useState } from "react";
import WeatherCard from "./WeatherCard";
import "../style/Weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = "0ec06caf289f5bbafc7f65ba04dc5ba8";

  function submitHandler(e) {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    setLoading(true);

    fetch(
     ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found.");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("City not found. Please try again.");
        setWeatherData(null);
        setLoading(false);
      });
  }
  // location
  const handleLocationSearch = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => {
        setError("Unable to retrieve your location.");
        setWeatherData(null);
        setLoading(false);
      }
    );
  };

  const fetchWeather = (latitude, longitude) => {
    fetch(
     ` https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to retrieve weather data.");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to retrieve weather data. Please try again.");
        setWeatherData(null);
        setLoading(false);
      });
  };

  const weatherCondition = weatherData
    ? weatherData.weather[0].main.toLowerCase()
    : null;

  const weatherMapping = {
    clear: "/video/sunny.mp4",
    rain: "/video/rainy.mp4",
    snow: "/video/snowy.mp4",
    clouds: "/video/cloudy.mp4",
    thunderstorm: "/video/thunderstorm.mp4",
    fog :  "/video/fog.mp4",
  };

  const backgroundVideo =
    weatherCondition && weatherMapping[weatherCondition]
      ? weatherMapping[weatherCondition]
      : "/video/bluesky.mp4";

  return (
    <div className="weather-container">
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        className="background-video"
      />
      <div className="top-section mb-8 text-center p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Weather App</h1>
        <form
          onSubmit={submitHandler}
          className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 text-lg border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </button>
        </form>
        <button
          onClick={handleLocationSearch}
          className="mt-4 px-4 py-2 text-lg font-medium text-white bg-green-600 rounded-md shadow hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400">
          <i className="fa-solid fa-location-arrow" aria-hidden="true"></i> Use
          Current Location
        </button>
        {error && <p className="text-error mt-2">{error}</p>}
        {loading && (
          <div className="loader mt-4">
            <div className="spinner"></div>
          </div>
        )}
      </div>
      <div className="flex flex-1 items-center justify-center">
        {weatherData && <WeatherCard weatherData={weatherData} />}
      </div>
    </div>
  );
}


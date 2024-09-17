import { useState } from "react";
import WeatherCard from "./WeatherCard";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Please enter a city name.");
      return;
    }

    setError(""); // Clear previous errors

    // Call the API to get weather data
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c3db5eb8bc5f28ab53106182b9020d06&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found.");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch(() => {
        setError("City not found. Please try again.");
        setWeatherData(null); // Clear data in case of an error
      });
  }

  return (
    <div>
      <h1>Weather App</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">
        <i class="fa-solid fa-magnifying-glass"></i>
        </button>
       
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>

    
  );
  
}

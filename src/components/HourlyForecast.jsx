import { useEffect, useState } from "react";

export default function HourlyForecast({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "0ec06caf289f5bbafc7f65ba04dc5ba8";

  useEffect(() => {
    console.log(`Fetching data for ${city}`); // Log the city name
  
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to retrieve weather data.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data: ", data); // Log the fetched data
        setWeatherData(data);
        setError(null); // Reset error if data fetch is successful
      })
      .catch((error) => {
        console.error("Unable to retrieve weather data:", error);
        setWeatherData(null);
        setError("Unable to retrieve weather data. Please try again.");
      });
  }, [city]);
  
  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return <p>No data available</p>;
  }
  
  return (
    <div >
      {weatherData.list.slice(0, 12).map((day, index) => (
        <div key={index} className="day-card">
          <p>{new Date(day.dt * 1000).getHours()}:00</p>
          <p>{Math.round(day.main.temp)}°C</p>
          <p>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}


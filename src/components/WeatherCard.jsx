// import "../style/WeatherCard.css";
export default function WeatherCard({ weatherData }) {
  return (
    <div className="cardStyle">
      <h2>Weather in {weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Weather conditions: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind speed: {weatherData.wind.speed} meters per second</p>
    </div>
  );
}

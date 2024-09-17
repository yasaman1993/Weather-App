import "../style/WeatherCard.css";

export default function WeatherCard({ weatherData }) {
  const weatherCondition = weatherData.weather[0].main.toLowerCase();

  const weatherMapping = {
    clear: {
      icon: "/icons/sunny.png",
      background: "/backgrounds/sunny-bg.jpg",
    },
    rain: {
      icon: "/icons/rainy.png",
      background: "/backgrounds/rainy-bg.jpg",
    },
    snow: {
      icon: "/icons/snowy.png",
      background: "/backgrounds/snowy-bg.jpg",
    },
    clouds: {
      icon: "/icons/cloudy.png",
      background: "/backgrounds/cloudy-bg.jpg",
    },
  };

  // Default to 'clear' if condition isn't mapped
  const currentWeather =
    weatherMapping[weatherCondition] || weatherMapping["clear"];

  return (
    <div
      className="cardStyle   p-10 text-center text-white rounded-lg shadow-lg"
      style={{ backgroundImage: `url(${currentWeather.background})` }}>
      <h2 className="text-2xl font-bold">Weather in {weatherData.name}</h2>
      <p className="text-lg temperature">
        Temperature: {Math.ceil(weatherData.main.temp)}°C
      </p>
      <p className="text-lg capitalize conditions">
        Conditions: {weatherData.weather[0].description}
      </p>
      <p className="text-lg humidity">Humidity: {weatherData.main.humidity}%</p>
      <p className="text-lg wind-speed">
        Wind speed: {weatherData.wind.speed} m/s
      </p>
      <img
        src={currentWeather.icon}
        alt={`Weather icon for ${weatherData.weather[0].description}`}
        className="mx-auto mt-4"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
}

import "../style/WeatherCard.css";

export default function WeatherCard({ weatherData }) {
  const weatherCondition = weatherData.weather[0].main.toLowerCase();

  const weatherMapping = {
    clear: {
      icon: "/icons/sunny.png",
      background: "/backgrounds/sunny-bg.jpg",
      borderColor: "#f1ff2f", 
    },
    rain: {
      icon: "/icons/rainy.png",
      background: "/backgrounds/rainy-bg.jpg",
      borderColor: "#3498db", 
    },
    snow: {
      icon: "/icons/snowy.png",
      background: "/backgrounds/snowy-bg.jpg",
      borderColor: "#ecf0f1", 
    },
    clouds: {
      icon: "/icons/cloudy.png",
      background: "/backgrounds/cloudy-bg.jpg",
      borderColor: "#95a5a6", 
    },
  };

  const currentWeather =
    weatherMapping[weatherCondition] || weatherMapping["clear"];

  return (
    <div
      className="cardStyle  p-10 text-center text-white rounded-lg shadow-lg"
      style={{
        backgroundImage: `url(${currentWeather.background})`,
        borderColor: currentWeather.borderColor,
      }}>
      <h2 className="text-3xl font-bold p-3 mb-2 rounded-lg card-title">
        Weather in {weatherData.name}
      </h2>
      <p className="text-xl p-2 mb-2 card-detail">
        Temperature: {Math.ceil(weatherData.main.temp)}°C
      </p>
      <p className="text-xl p-2 mb-2 capitalize card-detail">
        Conditions: {weatherData.weather[0].description}
      </p>
      <p className="text-xl p-2 mb-2 card-detail">Humidity: {weatherData.main.humidity}%</p>
      <p className="text-xl p-2 mb-2 card-detail">Wind speed: {weatherData.wind.speed} m/s</p>
      <img
        src={currentWeather.icon}
        alt={`Weather icon for ${weatherData.weather[0].description}`}
        className="mx-auto mt-4 weather-icon"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
}

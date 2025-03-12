import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetching = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setCity("");
    setWeather(null);

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c3dcb60d37e550494798fb838d271d8e&units=metric`
      );
      setWeather(data);
      console.log(data);
    } catch (error) {
      setError("City not found or fetching error");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => fetching();

  return (
    <div className="container">
      <div className="weather-container">
        <div className="data">
          <input
            className="input"
            placeholder="Search your city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleClick} disabled={loading}>
            {loading ? "Fetching..." : "Search"}
          </button>
        </div>
        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && (
          <div>
            <h2>
              {" "}
              {weather.name} , {weather.sys.country}
            </h2>
            <div className="data">
              <p>Temperature </p>{" "}
              <p>
                {weather.main.temp}°C 
              </p>
            </div>
            <div className="data">
              <p>Weather </p>{" "}
              <p>
                {weather.weather[0].description}
              </p>
            </div>
            <div className="data">
              <p>Wind </p> <p>{weather.wind.speed} km/h</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

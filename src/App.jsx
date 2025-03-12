import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetching = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setCity("");
    setWeather(null);

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c3dcb60d37e550494798fb838d271d8e&units=metric`
      );
      setWeather(data);
      
    } catch (error) {
      setError('City not found or fetching error');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => fetching();

  return (
    <div className="container">
      <div className="weather-container">
        <input
          className="input"
          placeholder="Enter your city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleClick} disabled={loading}>
          {loading ? 'Fetching...' : 'Get Weather'}
        </button>

        {loading && <p>Loading...</p>}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weather && (
          <div>
            <h2>City: {weather.name}</h2>
            <h3>Country: {weather.sys.country}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;


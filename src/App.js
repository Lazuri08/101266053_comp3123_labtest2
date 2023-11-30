import React, { useState } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay';
import ForecastDisplay from './ForecastDisplay'; // This will be your new forecast component
import SearchBar from './SearchBar';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('celsius'); // Unit state is now in App.js

  const API_KEY = '7c1329666ea58903d4da743deb4cee97'; 

  // Function to toggle the temperature unit
  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  const fetchWeatherData = (searchedCity) => {
    setLoading(true);
    setError(null);

    // Fetch current weather
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${API_KEY}&units=metric`)
      .then(response => {
        setWeatherData(response.data);
        // After setting the current weather, fetch the forecast
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${API_KEY}&units=metric`);
      })
      .then(response => {
        setForecastData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch weather data');
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar onSearch={fetchWeatherData} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && weatherData && (
          <WeatherDisplay 
            weatherData={weatherData} 
            unit={unit} 
            toggleUnit={toggleUnit} 
          />
        )}
        {!loading && forecastData && (
          <ForecastDisplay 
            forecastData={forecastData} 
            unit={unit} 
          />
        )}
      </header>
    </div>
  );
};

export default App;

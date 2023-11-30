import React, { useState } from 'react';

const WeatherDisplay = ({ weatherData }) => {
  const [unit, setUnit] = useState('celsius');

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  const temperature = unit === 'celsius' 
    ? weatherData.main.temp 
    : (weatherData.main.temp * 9 / 5) + 32; // Convert to Fahrenheit

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div>
      <h2>Weather in {weatherData.name}</h2>
      <img src={iconUrl} alt={`Weather icon for ${weatherData.weather[0].description}`} />
      <p>Temperature: {temperature.toFixed(2)}°{unit === 'celsius' ? 'C' : 'F'}</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <button onClick={toggleUnit}>
        Switch to {unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}
      </button>

    </div>
  );
};

export default WeatherDisplay;

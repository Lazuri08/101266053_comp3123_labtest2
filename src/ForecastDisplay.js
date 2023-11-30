import React from 'react';
import './Forecast.css';
const ForecastDisplay = ({ forecastData, unit }) => {
  if (!forecastData) {
    return null;
  }

  // Function to convert temperature based on the unit
  const convertTemperature = (temp) => {
    return unit === 'celsius' ? temp : (temp * 9/5) + 32;
  };

  return (
    <div className="forecast-container">
      {forecastData.list.slice(0, 6).map((forecast, index) => (
        <div key={index} className="forecast-item">
          <p className="forecast-date">{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
          <p className="forecast-temperature">
          Temperature: {convertTemperature(forecast.main.temp).toFixed(1)}°{unit === 'celsius' ? 'C' : 'F'}
          </p>
          <p className="forecast-weather">{forecast.weather[0].main}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastDisplay;

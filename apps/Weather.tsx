import React, { useState } from 'react';

type WeatherCondition = 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy' | 'Snowy';

interface WeatherData {
  city: string;
  temperature: number;
  condition: WeatherCondition;
  icon: string;
  gradient: string;
}

const mockWeatherData: WeatherData[] = [
  { city: 'New York', temperature: 75, condition: 'Sunny', icon: '☀️', gradient: 'from-blue-400 to-yellow-300' },
  { city: 'London', temperature: 62, condition: 'Cloudy', icon: '☁️', gradient: 'from-gray-500 to-blue-300' },
  { city: 'Tokyo', temperature: 80, condition: 'Rainy', icon: '🌧️', gradient: 'from-blue-600 to-gray-500' },
  { city: 'Sydney', temperature: 68, condition: 'Sunny', icon: '☀️', gradient: 'from-blue-500 to-orange-300' },
  { city: 'Paris', temperature: 70, condition: 'Cloudy', icon: '🌥️', gradient: 'from-purple-400 to-gray-400' },
];

const Weather: React.FC = () => {
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const weather = mockWeatherData[selectedCityIndex];

  return (
    <div className={`h-full w-full flex flex-col items-center justify-between text-white p-6 bg-gradient-to-br ${weather.gradient}`}>
      <select 
        value={selectedCityIndex}
        onChange={(e) => setSelectedCityIndex(Number(e.target.value))}
        className="bg-white/20 backdrop-blur-sm p-2 rounded-lg outline-none"
      >
        {mockWeatherData.map((data, index) => (
          <option key={data.city} value={index} className="text-black">
            {data.city}
          </option>
        ))}
      </select>

      <div className="text-center">
        <div className="text-8xl">{weather.icon}</div>
        <h1 className="text-5xl font-bold mt-4">{weather.city}</h1>
        <p className="text-7xl font-thin my-2">{weather.temperature}°F</p>
        <p className="text-2xl">{weather.condition}</p>
      </div>

      <div className="w-full flex justify-around bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <div className="text-center">
              <p className="text-sm">Humidity</p>
              <p className="font-bold">{Math.floor(Math.random() * 30) + 60}%</p>
          </div>
          <div className="text-center">
              <p className="text-sm">Wind</p>
              <p className="font-bold">{Math.floor(Math.random() * 10) + 5} mph</p>
          </div>
          <div className="text-center">
              <p className="text-sm">Feels Like</p>
              <p className="font-bold">{weather.temperature + Math.floor(Math.random() * 5) - 2}°F</p>
          </div>
      </div>
    </div>
  );
};

export default Weather;

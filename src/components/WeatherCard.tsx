import { Cloud, Sun, CloudRain, Thermometer, Droplets } from "lucide-react";
import { Card } from "@/components/ui/card";

const WeatherCard = () => {
  // Mock weather data
  const weather = {
    temperature: 32,
    humidity: 65,
    condition: "sunny",
    rainAlert: false
  };

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="w-5 h-5 text-gray-400" />;
      case "rainy":
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      default:
        return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <Card className="glass-card hover-lift p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getWeatherIcon()}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Thermometer className="w-4 h-4 text-drone-info" />
              <span className="text-sm font-mono font-medium">{weather.temperature}°C</span>
            </div>
            <div className="flex items-center space-x-1">
              <Droplets className="w-4 h-4 text-drone-info" />
              <span className="text-sm font-mono font-medium">{weather.humidity}%</span>
            </div>
          </div>
        </div>
        
        {weather.rainAlert && (
          <div className="flex items-center space-x-1 text-mild-infection text-xs font-medium">
            <CloudRain className="w-4 h-4" />
            <span>Rain Alert</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WeatherCard;
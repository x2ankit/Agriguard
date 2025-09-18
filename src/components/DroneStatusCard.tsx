import { Battery, Fuel, Settings, Wifi, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const DroneStatusCard = () => {
  // Mock drone data
  const drone = {
    battery: 85,
    tank: 65,
    mode: "Auto",
    connected: true,
    status: "Active"
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return "text-healthy";
    if (level > 20) return "text-mild-infection";
    return "text-severe-infection";
  };

  const getTankColor = (level: number) => {
    if (level > 30) return "text-healthy";
    if (level > 15) return "text-mild-infection";
    return "text-severe-infection";
  };

  const getStatusStyle = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getModeStyle = (mode: string) => {
    switch (mode) {
      case "Auto":
        return "bg-blue-100 text-blue-800";
      case "Manual":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="glass-card hover-lift p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-poppins font-semibold">Drone Status</h3>
        <div className="flex items-center space-x-2">
          <Wifi
            className={`w-4 h-4 ${
              drone.connected ? "text-healthy" : "text-severe-infection"
            }`}
          />
          {/* Status Badge */}
          <Badge className={`status-pulse ${getStatusStyle(drone.status)}`}>
            {drone.status}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {/* Battery Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Battery className={`w-4 h-4 ${getBatteryColor(drone.battery)}`} />
              <span className="text-sm font-medium">Battery</span>
            </div>
            <span
              className={`text-sm font-mono font-semibold ${getBatteryColor(
                drone.battery
              )}`}
            >
              {drone.battery}%
            </span>
          </div>
          <Progress value={drone.battery} className="h-2" />
        </div>

        {/* Tank Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Fuel className={`w-4 h-4 ${getTankColor(drone.tank)}`} />
              <span className="text-sm font-medium">Pesticide Tank</span>
            </div>
            <span
              className={`text-sm font-mono font-semibold ${getTankColor(
                drone.tank
              )}`}
            >
              {drone.tank}%
            </span>
          </div>
          <Progress value={drone.tank} className="h-2" />
        </div>

        {/* Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-drone-info" />
            <span className="text-sm font-medium">Mode</span>
          </div>
          {/* Mode Badge */}
          <Badge className={`font-mono ${getModeStyle(drone.mode)}`}>
            {drone.mode}
          </Badge>
        </div>

        {/* Alerts */}
        {(drone.battery < 20 || drone.tank < 15) && (
          <div className="flex items-center space-x-2 p-2 bg-severe-infection/10 rounded-lg border border-severe-infection/20">
            <AlertTriangle className="w-4 h-4 text-severe-infection" />
            <div className="text-xs text-severe-infection font-medium">
              {drone.battery < 20 && "Low Battery! "}
              {drone.tank < 15 && "Tank Almost Empty!"}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DroneStatusCard;

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

  return (
    <Card className="glass-card hover-lift p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-poppins font-semibold">Drone Status</h3>
        <div className="flex items-center space-x-2">
          <Wifi className={`w-4 h-4 ${drone.connected ? 'text-healthy' : 'text-severe-infection'}`} />
          <Badge variant={drone.status === "Active" ? "default" : "secondary"} className="status-pulse">
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
            <span className={`text-sm font-mono font-semibold ${getBatteryColor(drone.battery)}`}>
              {drone.battery}%
            </span>
          </div>
          <Progress 
            value={drone.battery} 
            className="h-2"
          />
        </div>

        {/* Tank Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Fuel className={`w-4 h-4 ${getTankColor(drone.tank)}`} />
              <span className="text-sm font-medium">Pesticide Tank</span>
            </div>
            <span className={`text-sm font-mono font-semibold ${getTankColor(drone.tank)}`}>
              {drone.tank}%
            </span>
          </div>
          <Progress 
            value={drone.tank} 
            className="h-2"
          />
        </div>

        {/* Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-drone-info" />
            <span className="text-sm font-medium">Mode</span>
          </div>
          <Badge variant="outline" className="font-mono">
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
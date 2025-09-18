import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { MapPin, Camera, Crosshair, Zap, Home, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const LivePreview = () => {
  const [sprayIntensity, setSprayIntensity] = useState([50]);
  const [isManualMode, setIsManualMode] = useState(false);
  const { toast } = useToast();

  const handleManualSpray = () => {
    toast({
      title: "💧 Manual Spray Active",
      description: `Spraying at ${sprayIntensity[0]}% intensity`,
    });
  };

  const handleReturnHome = () => {
    toast({
      title: "🏠 Returning to Base",
      description: "Drone is returning to launch point",
    });
  };

  // Mock field data with infection zones
  const fieldZones = [
    { id: 1, x: 20, y: 30, status: "healthy", size: "large" },
    { id: 2, x: 45, y: 25, status: "mild", size: "medium" },
    { id: 3, x: 70, y: 40, status: "severe", size: "small" },
    { id: 4, x: 35, y: 60, status: "healthy", size: "large" },
    { id: 5, x: 60, y: 70, status: "mild", size: "small" },
  ];

  const dronePosition = { x: 52, y: 45 };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-poppins font-bold gradient-text-drone">
              Agriguard Live Drone Control
            </h1>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="status-pulse">
                <div className="w-2 h-2 rounded-full bg-healthy mr-2"></div>
                Connected
              </Badge>
              <Navigation />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Field Map */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-6 h-[600px] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-poppins font-semibold">Field Overview</h2>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-drone-info" />
                  <span className="text-sm font-mono">Sector A-12</span>
                </div>
              </div>

              {/* Interactive Field Map */}
              <div className="relative bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg h-full border-2 border-border/20 overflow-hidden">
                {/* Field grid overlay */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Crop zones */}
                {fieldZones.map((zone) => (
                  <div
                    key={zone.id}
                    className={`absolute rounded-full opacity-70 ${
                      zone.status === "healthy" 
                        ? "bg-healthy" 
                        : zone.status === "mild" 
                        ? "bg-mild-infection" 
                        : "bg-severe-infection"
                    } ${
                      zone.size === "large" 
                        ? "w-20 h-20" 
                        : zone.size === "medium" 
                        ? "w-14 h-14" 
                        : "w-10 h-10"
                    }`}
                    style={{
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="w-full h-full rounded-full border-2 border-white/50 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {zone.status === "healthy" ? "✓" : zone.status === "mild" ? "⚠" : "!"}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Drone position */}
                <div
                  className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${dronePosition.x}%`,
                    top: `${dronePosition.y}%`,
                  }}
                >
                  <div className="relative drone-hover">
                    <div className="w-8 h-8 bg-drone-info rounded-lg flex items-center justify-center shadow-lg">
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                    {/* Propeller indicators */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-drone-info drone-propeller"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-drone-info drone-propeller"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-drone-info drone-propeller"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-drone-info drone-propeller"></div>
                  </div>
                  
                  {/* Direction indicator */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-background/80 backdrop-blur px-2 py-1 rounded text-xs font-mono">
                      GPS: 28.6139°N, 77.2090°E
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-lg rounded-lg p-3 space-y-2 shadow-lg border border-white/10 flex flex-col items-start">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-healthy border border-white"></div>
                    <span className="text-xs font-semibold text-white">Healthy</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-mild-infection border border-white"></div>
                    <span className="text-xs font-semibold text-white">Mild Infection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-severe-infection border border-white"></div>
                    <span className="text-xs font-semibold text-white">Severe</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Camera Feed */}
            <Card className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Live Feed</h3>
                <Camera className="w-4 h-4 text-drone-info" />
              </div>
              <div className="aspect-video bg-gradient-to-br from-green-200 to-green-400 dark:from-green-800 dark:to-green-600 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera className="w-8 h-8 mx-auto mb-2 opacity-70" />
                    <p className="text-sm opacity-90">Live Camera View</p>
                  </div>
                </div>
                {/* Recording indicator */}
                <div className="absolute top-2 right-2 flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-red-500 status-pulse"></div>
                  <span className="text-xs text-white font-mono">REC</span>
                </div>
              </div>
            </Card>

            {/* Manual Controls */}
            <Card className="glass-card p-4">
              <h3 className="font-semibold mb-4">Manual Control</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mode</span>
                  <Button
                    variant={isManualMode ? "default" : "outline"}
                    size="sm"
                    className={isManualMode ? "bg-drone-info text-white font-bold border-drone-info" : "bg-muted text-drone-info font-bold border-drone-info"}
                    onClick={() => setIsManualMode(!isManualMode)}
                  >
                    {isManualMode ? "Manual" : "Auto"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Spray Intensity</span>
                    <span className="text-sm font-mono">{sprayIntensity[0]}%</span>
                  </div>
                  <Slider
                    value={sprayIntensity}
                    onValueChange={setSprayIntensity}
                    max={100}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    size="sm" 
                    className="bg-severe-infection hover:bg-severe-infection/90"
                    onClick={handleManualSpray}
                    disabled={!isManualMode}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Spray
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 text-white font-bold border-blue-600 hover:bg-blue-700"
                    onClick={handleReturnHome}
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Return
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Altitude:</span>
                    <span className="font-mono">15.2m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="font-mono">2.5 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wind:</span>
                    <span className="font-mono">3.2 km/h NE</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="glass-card p-4">
              <h3 className="font-semibold mb-3">Session Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Area Covered</span>
                  <span className="font-mono font-semibold text-healthy">0.2 ha</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pesticide Used</span>
                  <span className="font-mono font-semibold text-drone-info">0.4L</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Flight Time</span>
                  <span className="font-mono font-semibold text-mild-infection">00:42:15</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
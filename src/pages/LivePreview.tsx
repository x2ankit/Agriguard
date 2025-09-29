import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { LayoutDashboard, BarChart3, HelpCircle, User, MapPin, Camera, Zap, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Define a type for the user object for clarity
type User = {
  displayName: string;
  email: string;
  photoURL?: string;
};

// Consistent navigation header
const ControlHeaderNav = ({ user }: { user: User | null }) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-200" onClick={() => navigate('/dashboard')}>
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
            </Button>
            <Button variant="secondary" size="sm" className="bg-gray-200 text-gray-800 font-bold hover:bg-gray-300">
                Live Control
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-200" onClick={() => navigate('/analytics')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-200" onClick={() => navigate('/help')}>
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
            </Button>
            <div className="flex items-center space-x-2 pl-4">
                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full" />
                    ) : (
                        <User className="w-4 h-4 text-gray-600"/>
                    )}
                 </div>
                 <span className="text-sm font-medium text-gray-800">{user?.displayName || 'Ankit Tripathy'}</span>
            </div>
        </div>
    );
};


const LivePreview = () => {
  const [sprayIntensity, setSprayIntensity] = useState([58]);
  const [isManualMode, setIsManualMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const connectionInterval = setInterval(() => {
        setIsConnected(prev => !prev);
    }, 5000);

    return () => clearInterval(connectionInterval);
  }, []);

  const handleManualSpray = () => {
    toast({
      title: "💧 Manual Spray Active",
      description: `Spraying at ${sprayIntensity[0]}% intensity.`,
    });
  };

  const handleReturnHome = () => {
    toast({
      title: "🏠 Returning to Base",
      description: "Drone is returning to the launch point.",
    });
  };

  const fieldZones = [
    { id: 1, x: 25, y: 28, status: "healthy", size: "large" },
    { id: 2, x: 55, y: 20, status: "mild", size: "medium" },
    { id: 3, x: 78, y: 35, status: "severe", size: "small" },
    { id: 4, x: 30, y: 65, status: "healthy", size: "large" },
    { id: 5, x: 65, y: 75, status: "mild", size: "medium" },
  ];
  const dronePosition = { x: 50, y: 50 };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-poppins font-bold text-gray-800">
              Agriguard Live Drone Control
            </h1>
            <div className="flex items-center space-x-4">
                <Badge variant="outline" className={isConnected ? "border-green-300 text-green-700 bg-green-50" : "border-red-300 text-red-700 bg-red-50"}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    {isConnected ? 'Connected' : 'Disconnected'}
                </Badge>
                <ControlHeaderNav user={user} />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          <div className="lg:col-span-2">
            <Card className="bg-white p-4 h-[calc(100vh-100px)] flex flex-col shadow-lg border">
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg font-poppins font-semibold">Field Overview</h2>
                <div className="flex items-center space-x-2 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-mono">Sector A-12</span>
                </div>
              </div>
              <div className="relative bg-gray-50 rounded-lg h-full border border-gray-200 overflow-hidden">
                  <svg width="100%" height="100%" className="absolute inset-0">
                      <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                          </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                  {fieldZones.map((zone) => (
                      <div
                          key={zone.id}
                          className={`absolute rounded-full flex items-center justify-center text-white font-bold text-lg
                          ${ zone.status === "healthy" ? "bg-green-500" : zone.status === "mild" ? "bg-yellow-500" : "bg-red-500"}
                          ${ zone.size === "large" ? "w-20 h-20" : zone.size === "medium" ? "w-16 h-16" : "w-10 h-10"}`}
                          style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: "translate(-50%, -50%)" }}
                      >
                          {zone.status === "healthy" ? "✓" : zone.status === "mild" ? "!" : "!!"}
                      </div>
                  ))}
                  <div className="absolute" style={{ left: `${dronePosition.x}%`, top: `${dronePosition.y}%`, transform: "translate(-50%, -50%)" }}>
                      <div className="w-10 h-10 bg-black flex items-center justify-center p-1"><div className="w-full h-full border-2 border-white flex items-center justify-center"><p className="text-white text-xs font-mono">GPS</p></div></div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-lg rounded-lg p-3 space-y-2 shadow-lg border border-white/10 flex flex-col items-start">
                      <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-green-500 border border-white/50"></div><span className="text-xs font-semibold text-white">Healthy</span></div>
                      <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-yellow-500 border border-white/50"></div><span className="text-xs font-semibold text-white">Mild Infection</span></div>
                      <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-red-500 border border-white/50"></div><span className="text-xs font-semibold text-white">Severe</span></div>
                  </div>
              </div>
            </Card>
          </div>

          {/* FIXED: The entire right column is now one single card with a fixed height to prevent scrolling */}
          <div className="lg:col-start-3">
              <Card className="bg-white p-4 h-[calc(100vh-100px)] flex flex-col shadow-lg border">
                  {/* Section 1: Live Feed */}
                  <div>
                      <h3 className="font-semibold text-gray-800">Live Feed</h3>
                      <div className="mt-2 aspect-video rounded-md flex items-center justify-center bg-gray-200 border border-gray-300">
                          <div className="text-center text-gray-500"><Camera className="w-8 h-8 mx-auto mb-2"/><p className="text-sm font-medium">Feed Unavailable</p></div>
                      </div>
                  </div>

                  {/* Section 2: Control Panel */}
                  <div className="flex-grow flex flex-col justify-center">
                      <h3 className="font-semibold mb-3 text-gray-800">Control Panel</h3>
                      <div className="space-y-3">
                          <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-600">Mode</span>
                              <div className="flex items-center bg-gray-200 rounded-full p-1 w-[110px] h-7">
                                  <button className={`flex-1 rounded-full text-xs h-full transition-colors ${!isManualMode ? 'bg-white shadow' : 'bg-transparent text-gray-500'}`} onClick={() => setIsManualMode(false)}>Auto</button>
                                  <button className={`flex-1 rounded-full text-xs h-full transition-colors ${isManualMode ? 'bg-white shadow' : 'bg-transparent text-gray-500'}`} onClick={() => setIsManualMode(true)}>Manual</button>
                              </div>
                          </div>
                          <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-600">Spray Intensity</span>
                                  <span className="text-sm font-mono font-bold text-blue-600">{sprayIntensity[0]}%</span>
                              </div>
                              <Slider value={sprayIntensity} onValueChange={setSprayIntensity} max={100} step={1} className="[&>span:first-child>span]:bg-green-500" />
                          </div>
                          <div className="grid grid-cols-2 gap-3 pt-1">
                              <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white font-semibold disabled:bg-red-300 disabled:cursor-not-allowed" disabled={!isManualMode} onClick={handleManualSpray}><Zap className="w-4 h-4 mr-2" />Spray</Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={handleReturnHome}><RotateCcw className="w-4 h-4 mr-2" />Return</Button>
                          </div>
                      </div>
                  </div>

                  {/* Section 3: Session Stats */}
                  <div className="border-t pt-3">
                      <h3 className="font-semibold mb-3 text-gray-800">Session Stats</h3>
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <span className="text-gray-600 font-medium">Area Covered</span>
                          <span className="font-mono font-semibold text-blue-600 text-right">0.2 ha</span>
                          <span className="text-gray-600 font-medium">Pesticide Used</span>
                          <span className="font-mono font-semibold text-blue-600 text-right">0.4L</span>
                          <span className="text-gray-600 font-medium">Flight Time</span>
                          <span className="font-mono font-semibold text-yellow-600 text-right">00:42:15</span>
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


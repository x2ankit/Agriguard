import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, User, Battery, Fuel, Settings2, Plane, ChartBar as BarChart3, Map, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import WeatherCard from "@/components/WeatherCard";
import CropTypeCard from "@/components/CropTypeCard";
import logo from "../../favicon/apple-touch-icon.png";
import Navigation from "@/components/Navigation";
import { auth } from "../firebase";
import heroImage from "@/assets/hero-drone.jpg";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<{ displayName: string; email: string; photoURL?: string } | null>(null);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/"); // redirect to login if not logged in
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // Mock drone data
  const drone = {
    battery: 85,
    tank: 65,
    mode: "Auto",
    connected: true,
    status: "Active"
  };

  // Mock crop health data
  const cropData = {
    healthy: 68,
    mild: 22,
    severe: 10,
    totalArea: 45.8 // in hectares
  };

  const handleAutoSpray = () => {
    toast({
      title: "🚀 Auto Spray Initiated",
      description: "Drone is scanning for infected areas...",
    });
  };

  const handleManualSpray = () => {
    toast({
      title: "🎛️ Manual Mode Active",
      description: "You can now control the drone manually.",
    });
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

  // Render nothing while checking auth
  if (!user) return null;

  const total = cropData.healthy + cropData.mild + cropData.severe;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  
  const healthyOffset = 0;
  const mildOffset = (cropData.healthy / total) * circumference;
  const severeOffset = ((cropData.healthy + cropData.mild) / total) * circumference;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <header className="border-b border-border/50 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={logo} alt="Agriguard Logo" className="w-10 h-10 shadow-lg" />
              <div>
                <h1 className="text-2xl font-poppins font-extrabold text-white tracking-wide drop-shadow-lg">
                  Dashboard
                </h1>
                <p className="text-sm text-green-200 font-medium">Smart Farming Control Center</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <WeatherCard />
              <Navigation />
              <div className="flex items-center space-x-2">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="rounded-full w-8 h-8"
                  />
                )}
                <span className="text-sm font-medium text-white">{user.displayName}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container mx-auto px-4 py-6 flex-1 relative z-10">
        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Drone Control Card (Left) */}
          <Card className="glass-card hover-lift p-6 bg-white/10 backdrop-blur-md border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-poppins font-semibold text-white">Drone Control</h3>
              <div className="flex items-center space-x-2">
                <Badge className={`status-pulse ${drone.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {drone.status}
                </Badge>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Battery className={`w-4 h-4 ${getBatteryColor(drone.battery)}`} />
                    <span className="text-sm font-medium text-white">Battery</span>
                  </div>
                  <span className={`text-sm font-mono font-semibold ${getBatteryColor(drone.battery)}`}>
                    {drone.battery}%
                  </span>
                </div>
                <Progress value={drone.battery} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Fuel className={`w-4 h-4 ${getTankColor(drone.tank)}`} />
                    <span className="text-sm font-medium text-white">Tank</span>
                  </div>
                  <span className={`text-sm font-mono font-semibold ${getTankColor(drone.tank)}`}>
                    {drone.tank}%
                  </span>
                </div>
                <Progress value={drone.tank} className="h-2" />
              </div>
            </div>

            {/* Mode Display */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Settings2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">Mode</span>
              </div>
              <Badge className="font-mono bg-blue-100 text-blue-800">
                {drone.mode}
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                size="lg" 
                className="h-12 bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg hover-lift"
                onClick={handleAutoSpray}
              >
                <Plane className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="text-sm font-bold">Auto Spray</div>
                  <div className="text-xs opacity-80">AI-guided</div>
                </div>
              </Button>

              <Button 
                size="lg" 
                variant="outline"
                className="h-12 border-2 border-blue-400 text-blue-400 font-bold bg-white/10 hover:bg-blue-400/20 shadow-lg hover-lift"
                onClick={handleManualSpray}
              >
                <Settings2 className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="text-sm font-bold">Manual</div>
                  <div className="text-xs opacity-80">Take control</div>
                </div>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button variant="ghost" size="sm" className="hover-lift text-white hover:bg-white/10">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" size="sm" className="hover-lift text-white hover:bg-white/10">
                <Map className="w-4 h-4 mr-2" />
                Field Map
              </Button>
            </div>
          </Card>

          {/* Crop Health Overview Card (Right) */}
          <Card className="glass-card hover-lift p-6 bg-white/10 backdrop-blur-md border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-poppins font-semibold text-white">Crop Health Overview</h3>
              <div className="flex items-center space-x-1 text-xs text-white/70">
                <span>{cropData.totalArea} ha</span>
              </div>
            </div>

            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                  {/* Background circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="12"
                    fill="none"
                  />
                  
                  {/* Healthy segment */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="hsl(var(--healthy))"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(cropData.healthy / total) * circumference} ${circumference}`}
                    strokeDashoffset={0}
                    className="transition-all duration-1000 ease-out"
                  />
                  
                  {/* Mild infection segment */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="hsl(var(--mild-infection))"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(cropData.mild / total) * circumference} ${circumference}`}
                    strokeDashoffset={-mildOffset}
                    className="transition-all duration-1000 ease-out"
                  />
                  
                  {/* Severe infection segment */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="hsl(var(--severe-infection))"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(cropData.severe / total) * circumference} ${circumference}`}
                    strokeDashoffset={-severeOffset}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-poppins font-bold text-healthy">
                    {cropData.healthy}%
                  </div>
                  <div className="text-xs text-white/70">Healthy</div>
                </div>
              </div>
            </div>

            {/* Horizontal Legend */}
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-healthy"></div>
                <div className="text-center">
                  <div className="font-semibold text-healthy">{cropData.healthy}%</div>
                  <div className="text-xs text-white/70">Healthy</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-mild-infection"></div>
                <div className="text-center">
                  <div className="font-semibold text-mild-infection">{cropData.mild}%</div>
                  <div className="text-xs text-white/70">Mild</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-severe-infection"></div>
                <div className="text-center">
                  <div className="font-semibold text-severe-infection">{cropData.severe}%</div>
                  <div className="text-xs text-white/70">Severe</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Crop Type Selection */}
        <div className="mb-6">
          <CropTypeCard />
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-card hover-lift p-4 bg-white/10 backdrop-blur-md border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white/70">Areas Treated Today</h3>
                <p className="text-xl font-poppins font-bold text-healthy">0.21 ha</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-healthy mr-1" />
                  <span className="text-xs text-healthy">+12%</span>
                </div>
              </div>
              <div className="text-2xl">🌱</div>
            </div>
          </Card>

          <Card className="glass-card hover-lift p-4 bg-white/10 backdrop-blur-md border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white/70">Pesticide Saved</h3>
                <p className="text-xl font-poppins font-bold text-blue-400">42%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-blue-400 mr-1" />
                  <span className="text-xs text-blue-400">+5%</span>
                </div>
              </div>
              <div className="text-2xl">💧</div>
            </div>
          </Card>

          <Card className="glass-card hover-lift p-4 bg-white/10 backdrop-blur-md border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white/70">Flight Hours</h3>
                <p className="text-xl font-poppins font-bold text-mild-infection">2.4 hrs</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-3 h-3 text-severe-infection mr-1" />
                  <span className="text-xs text-severe-infection">-3%</span>
                </div>
              </div>
              <div className="text-2xl">⏱️</div>
            </div>
          </Card>

          <Card className="glass-card hover-lift p-4 bg-white/10 backdrop-blur-md border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white/70">Avg Health Score</h3>
                <p className="text-xl font-poppins font-bold text-healthy">82.5%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-healthy mr-1" />
                  <span className="text-xs text-healthy">+8%</span>
                </div>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="glass-card p-6 bg-white/10 backdrop-blur-md border-white/20">
          <h3 className="text-lg font-poppins font-semibold mb-4 text-white">Recent Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-healthy/20 border border-healthy/30">
              <div className="w-2 h-2 rounded-full bg-healthy"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Sector A-7 treatment completed</p>
                <p className="text-xs text-white/70">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-mild-infection/20 border border-mild-infection/30">
              <div className="w-2 h-2 rounded-full bg-mild-infection"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Mild infection detected in B-3</p>
                <p className="text-xs text-white/70">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-400/20 border border-blue-400/30">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Battery charged to 85%</p>
                <p className="text-xs text-white/70">1 hour ago</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
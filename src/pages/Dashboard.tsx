import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  LayoutDashboard,
  BarChart3,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Leaf,
  Droplets,
  Clock,
  Battery,
  Fuel,
  Settings2,
  Plane,
  Map,
  Sun,
  Cloud,
  CloudRain,
} from "lucide-react";

// Consistent navigation header
const DashboardHeaderNav = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center space-x-2">
      <Button variant="secondary" size="sm" className="bg-gray-200 text-gray-800 font-bold hover:bg-gray-300">
        <LayoutDashboard className="w-4 h-4 mr-2" />
        Dashboard
      </Button>
      <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-200" onClick={() => navigate('/live')}>
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
            <User className="w-4 h-4 text-gray-600" />
          )}
        </div>
        <span className="text-sm font-medium text-gray-800">{user?.displayName || 'Ankit Tripathy'}</span>
      </div>
    </div>
  );
};

// Define a type for the user object
type User = {
  displayName: string;
  email: string;
  photoURL?: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>("wheat"); // State for the selected crop
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Mock data
  const drone = { battery: 85, tank: 65, mode: "Auto", status: "Active" };
  const cropData = { healthy: 68, mild: 22, severe: 10, totalArea: 0.5 };

  const getBatteryColor = (level: number) => {
    if (level > 50) return "text-green-600";
    if (level > 20) return "text-yellow-600";
    return "text-red-600";
  };
  const getTankColor = (level: number) => {
    if (level > 30) return "text-green-600";
    if (level > 15) return "text-yellow-600";
    return "text-red-600";
  };
  
  const total = cropData.healthy + cropData.mild + cropData.severe;
  const radius = 70; 
  const circumference = 2 * Math.PI * radius;
  const mildOffset = (cropData.healthy / total) * circumference;
  const severeOffset = ((cropData.healthy + cropData.mild) / total) * circumference;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <img src="/apple-touch-icon.png" alt="Agriguard Logo" className="w-9 h-9" />
                 <div>
                    <h1 className="text-lg font-poppins font-bold text-gray-800">Dashboard</h1>
                    <p className="text-xs text-gray-500">Smart Farming Control Center</p>
                 </div>
            </div>
            <DashboardHeaderNav user={user} />
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Row 1: Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card className="p-4 bg-white shadow-lg border"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Area Treated</p><p className="text-2xl font-poppins font-bold text-green-600">0.21 ha</p><div className="flex items-center mt-1"><TrendingUp className="w-3 h-3 text-green-600 mr-1" /><span className="text-xs text-green-600">+12%</span></div></div><div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><Leaf className="w-5 h-5 text-green-600" /></div></div></Card>
          <Card className="p-4 bg-white shadow-lg border"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Pesticide Saved</p><p className="text-2xl font-poppins font-bold text-blue-600">42%</p><div className="flex items-center mt-1"><TrendingUp className="w-3 h-3 text-blue-600 mr-1" /><span className="text-xs text-blue-600">+5%</span></div></div><div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><Droplets className="w-5 h-5 text-blue-600" /></div></div></Card>
          <Card className="p-4 bg-white shadow-lg border"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Flight Hours</p><p className="text-2xl font-poppins font-bold text-yellow-600">2.4 hrs</p><div className="flex items-center mt-1"><TrendingDown className="w-3 h-3 text-red-600 mr-1" /><span className="text-xs text-red-600">-3%</span></div></div><div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center"><Clock className="w-5 h-5 text-yellow-600" /></div></div></Card>
          <Card className="p-4 bg-white shadow-lg border"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Avg Health Score</p><p className="text-2xl font-poppins font-bold text-green-600">82.5%</p><div className="flex items-center mt-1"><TrendingUp className="w-3 h-3 text-green-600 mr-1" /><span className="text-xs text-green-600">+8%</span></div></div><div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-green-600" /></div></div></Card>
        </div>

        {/* Row 2: Main Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <Card className="p-4 bg-white shadow-lg border">
              <div className="flex items-center justify-between mb-3"><h3 className="text-base font-poppins font-semibold text-gray-800">Drone Details</h3><Badge className={`capitalize ${drone.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{drone.status}</Badge></div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1.5">
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-1.5"><Battery className={`w-4 h-4 ${getBatteryColor(drone.battery)}`} /><span className="text-xs font-medium text-gray-600">Battery</span></div><span className={`text-xs font-mono font-semibold ${getBatteryColor(drone.battery)}`}>{drone.battery}%</span></div>
                      <Progress value={drone.battery} className="h-1.5" />
                  </div>
                  <div className="space-y-1.5">
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-1.5"><Fuel className={`w-4 h-4 ${getTankColor(drone.tank)}`} /><span className="text-xs font-medium text-gray-600">Tank</span></div><span className={`text-xs font-mono font-semibold ${getTankColor(drone.tank)}`}>{drone.tank}%</span></div>
                      <Progress value={drone.tank} className="h-1.5" />
                  </div>
              </div>
               <div className="flex items-center justify-between mb-4"><div className="flex items-center space-x-1.5"><Settings2 className="w-4 h-4 text-blue-500" /><span className="text-xs font-medium text-gray-600">Mode</span></div><Badge className="font-mono bg-blue-100 text-blue-800">{drone.mode}</Badge></div>
               <div className="grid grid-cols-2 gap-3">
                    {/* FIXED: Changed button text */}
                    <Button size="sm" className="h-10 bg-green-600 hover:bg-green-700 text-white font-bold"><Plane className="w-4 h-4 mr-2" />Start Auto Spray</Button>
                    <Button size="sm" variant="outline" className="h-10 bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 border-gray-300" onClick={() => navigate('/live')}>
                        <Map className="w-4 h-4 mr-2" />Field Map
                    </Button>
               </div>
            </Card>
            <Card className="p-4 bg-white shadow-lg border">
                <h3 className="text-base font-poppins font-semibold mb-3 text-gray-800">Recent Activity</h3>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-3 p-2 rounded-md bg-green-50/50"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div><div><p className="font-medium text-gray-800">Sector A-7 treatment completed</p><p className="text-gray-500">2 minutes ago</p></div></div>
                    <div className="flex items-center space-x-3 p-2 rounded-md bg-yellow-50/50"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div><div><p className="font-medium text-gray-800">Mild infection detected in B-3</p><p className="text-gray-500">15 minutes ago</p></div></div>
                    <div className="flex items-center space-x-3 p-2 rounded-md bg-blue-50/50"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div><div><p className="font-medium text-gray-800">Battery charged to 85%</p><p className="text-gray-500">1 hour ago</p></div></div>
                </div>
            </Card>
          </div>

          <Card className="p-4 bg-white shadow-lg border flex flex-col">
              <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-poppins font-semibold text-gray-800">Crop Health Overview</h3>
                  <span className="text-xs text-gray-500">{cropData.totalArea} ha</span>
              </div>
              <div className="flex-grow flex items-center justify-around gap-4">
                  <div className="relative">
                      <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                          <circle cx="80" cy="80" r={radius} stroke="rgba(0,0,0,0.07)" strokeWidth="12" fill="none" />
                          <circle cx="80" cy="80" r={radius} stroke="hsl(var(--healthy))" strokeWidth="12" fill="none" strokeDasharray={`${(cropData.healthy / total) * circumference} ${circumference}`} strokeDashoffset={0} />
                          <circle cx="80" cy="80" r={radius} stroke="hsl(var(--mild-infection))" strokeWidth="12" fill="none" strokeDasharray={`${(cropData.mild / total) * circumference} ${circumference}`} strokeDashoffset={-mildOffset} />
                          <circle cx="80" cy="80" r={radius} stroke="hsl(var(--severe-infection))" strokeWidth="12" fill="none" strokeDasharray={`${(cropData.severe / total) * circumference} ${circumference}`} strokeDashoffset={-severeOffset} />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-4xl font-poppins font-bold text-green-600">{cropData.healthy}%</div>
                          <div className="text-sm text-gray-500">Healthy</div>
                      </div>
                  </div>
                  <div className="space-y-4 text-base">
                      <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><div><div className="font-semibold text-gray-700">Healthy</div><div className="text-sm text-gray-500">{cropData.healthy}%</div></div></div>
                      <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div><div className="font-semibold text-gray-700">Mild</div><div className="text-sm text-gray-500">{cropData.mild}%</div></div></div>
                      <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div><div className="font-semibold text-gray-700">Severe</div><div className="text-sm text-gray-500">{cropData.severe}%</div></div></div>
                  </div>
              </div>
              <div className="border-t mt-4 pt-3 text-xs text-gray-500 space-y-1">
                  <div className="flex justify-between"><span>Highest Infection:</span><span className="font-semibold text-red-600">Sector C-4</span></div>
                  <div className="flex justify-between"><span>Health Trend:</span><span className="font-semibold text-green-600 flex items-center">Improving <TrendingUp className="w-3 h-3 ml-1"/></span></div>
              </div>
          </Card>


          <div className="flex flex-col gap-4">
              <Card className="p-4 bg-white shadow-lg border">
                  <h3 className="text-base font-poppins font-semibold mb-3 text-gray-800">Crop Type</h3>
                  {/* FIXED: Styled the select trigger for light theme */}
                  <Select onValueChange={setSelectedCrop} defaultValue={selectedCrop}>
                      <SelectTrigger className="w-full bg-white border-gray-300">
                          <SelectValue placeholder="Select Crop" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="corn">Corn</SelectItem>
                          <SelectItem value="soybean">Soybean</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                      </SelectContent>
                  </Select>
              </Card>
              <Card className="p-4 bg-white shadow-lg border grow flex flex-col">
                   <h3 className="text-base font-poppins font-semibold mb-3 text-gray-800">Weather Forecast</h3>
                   <div className="flex-grow flex flex-col justify-around">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Sun className="w-12 h-12 text-yellow-500" />
                                <div>
                                    <p className="text-2xl font-bold">32°C</p>
                                    <p className="text-sm text-gray-500">Sunny</p>
                                </div>
                            </div>
                            <div className="text-right text-xs text-gray-500">
                                <p>Humidity: 65%</p>
                                <p>Wind: 5 km/h</p>
                            </div>
                        </div>
                        <div className="flex justify-between text-center text-xs mt-4">
                            <div><p className="font-semibold">Mon</p><Cloud className="w-6 h-6 mx-auto my-1 text-gray-400"/><p>30°/22°</p></div>
                            <div><p className="font-semibold">Tue</p><CloudRain className="w-6 h-6 mx-auto my-1 text-blue-500"/><p>28°/21°</p></div>
                            <div><p className="font-semibold">Wed</p><Sun className="w-6 h-6 mx-auto my-1 text-yellow-500"/><p>33°/24°</p></div>
                        </div>
                   </div>
              </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


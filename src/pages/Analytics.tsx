import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, TrendingUp, TrendingDown, BarChart3, Leaf, Droplets, Clock, User, LayoutDashboard, HelpCircle } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// Define a type for the user object for clarity
type User = {
  displayName: string;
  email: string;
  photoURL?: string;
};

// Consistent navigation header
const AnalyticsHeaderNav = ({ user }: { user: User | null }) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-200" onClick={() => navigate('/dashboard')}>
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-200" onClick={() => navigate('/live')}>
                Live Control
            </Button>
            <Button variant="secondary" size="sm" className="bg-gray-200 text-gray-800 font-bold hover:bg-gray-300">
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
             {/* REMOVED the notification icon block */}
        </div>
    );
};

const Analytics = () => {
  // FIXED: Changed from useState to a constant, as it's no longer editable
  const date = new Date();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const healthTrend = [
    { month: "Jan", healthy: 75, mild: 20, severe: 5 }, { month: "Feb", healthy: 78, mild: 18, severe: 4 }, { month: "Mar", healthy: 72, mild: 23, severe: 5 }, { month: "Apr", healthy: 80, mild: 15, severe: 5 }, { month: "May", healthy: 85, mild: 12, severe: 3 }, { month: "Jun", healthy: 82, mild: 16, severe: 2 },
  ];
  const sprayHistory = [
    { date: "2025-09-15", area: 0.15, pesticide: 8.5, savings: 35 }, { date: "2025-09-14", area: 0.23, pesticide: 5.8, savings: 42 }, { date: "2025-09-13", area: 0.19, pesticide: 11.2, savings: 28 }, { date: "2025-09-12", area: 0.84, pesticide: 4.1, savings: 48 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-poppins font-bold text-gray-800">
              Agriguard Analytics & Reports
            </h1>
            <div className="flex items-center space-x-3">
              {/* FIXED: Removed Popover to make the date static */}
              <Button variant="outline" size="sm" className="bg-blue-600 text-white font-bold border-blue-600 cursor-default">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {format(date, "MMM dd, yyyy")}
              </Button>
              <AnalyticsHeaderNav user={user} />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card className="p-4 bg-white shadow-lg border"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Total Area Treated</p><p className="text-2xl font-poppins font-bold text-green-600">0.3 ha</p><div className="flex items-center mt-1"><TrendingUp className="w-3 h-3 text-green-600 mr-1" /><span className="text-xs text-green-600">+12% vs last month</span></div></div><div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><Leaf className="w-5 h-5 text-green-600" /></div></div></Card>
          <Card className="p-4 bg-white shadow-lg border"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Pesticide Saved</p><p className="text-2xl font-poppins font-bold text-blue-600">38.5%</p><div className="flex items-center mt-1"><TrendingUp className="w-3 h-3 text-blue-600 mr-1" /><span className="text-xs text-blue-600">+5% efficiency</span></div></div><div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><Droplets className="w-5 h-5 text-blue-600" /></div></div></Card>
          <Card className="p-4 bg-white shadow-lg border"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Flight Hours</p><p className="text-2xl font-poppins font-bold text-yellow-600">0.32 hrs</p><div className="flex items-center mt-1"><TrendingDown className="w-3 h-3 text-red-600 mr-1" /><span className="text-xs text-red-600">-3% downtime</span></div></div><div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center"><Clock className="w-5 h-5 text-yellow-600" /></div></div></Card>
          <Card className="p-4 bg-white shadow-lg border"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Avg Health Score</p><p className="text-2xl font-poppins font-bold text-green-600">82.5%</p><div className="flex items-center mt-1"><TrendingUp className="w-3 h-3 text-green-600 mr-1" /><span className="text-xs text-green-600">+8% improved</span></div></div><div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-green-600" /></div></div></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <Card className="p-4 bg-white shadow-lg border lg:col-span-2">
            <h3 className="text-base font-poppins font-semibold mb-3">Crop Health Over Time</h3>
            <div className="space-y-3">
              {healthTrend.map((data) => (
                <div key={data.month} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs"><span className="font-medium text-gray-700">{data.month}</span><div className="flex space-x-3"><span className="text-green-600">{data.healthy}%</span><span className="text-yellow-600">{data.mild}%</span><span className="text-red-600">{data.severe}%</span></div></div>
                  <div className="flex rounded-full overflow-hidden h-2.5 bg-gray-200"><div className="bg-green-500" style={{ width: `${data.healthy}%` }}></div><div className="bg-yellow-500" style={{ width: `${data.mild}%` }}></div><div className="bg-red-500" style={{ width: `${data.severe}%` }}></div></div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-600"><div className="flex items-center space-x-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div><span>Healthy</span></div><div className="flex items-center space-x-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div><span>Mild</span></div><div className="flex items-center space-x-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><span>Severe</span></div></div>
          </Card>

          <div className="flex flex-col gap-4 lg:col-span-1">
            <Card className="p-4 bg-white shadow-lg border">
              <h3 className="text-base font-poppins font-semibold mb-3">Pesticide Savings</h3>
              <div className="text-center mb-4"><div className="text-3xl font-poppins font-bold text-blue-600 mb-1">38.5%</div><p className="text-xs text-gray-500">Average savings this month</p></div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">Target</span><Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">35%</Badge></div>
                <div className="w-full bg-gray-200 rounded-full h-3.5 shadow-inner"><div className="h-3.5 rounded-full bg-blue-500" style={{ width: "38.5%" }}></div></div>
              </div>
            </Card>
            <Card className="p-4 bg-white shadow-lg border">
                <h3 className="text-base font-poppins font-semibold mb-3">Money Saved</h3>
                <div className="text-center p-2 rounded-lg bg-green-50">
                    <div className="text-xl font-bold text-green-700">₹28,450</div>
                    <div className="text-xs text-gray-500 mt-1">Total Estimated Savings</div>
                </div>
            </Card>
          </div>
          
          <Card className="p-4 bg-white shadow-lg border lg:col-span-2">
            <h3 className="text-base font-poppins font-semibold mb-3">Recent Spray History</h3>
            <div className="space-y-3">
              {sprayHistory.map((record) => (
                <div key={record.date} className="p-2.5 rounded-lg border bg-gray-50/50">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium font-mono text-gray-800">{record.date}</span>
                        <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50 text-xs px-1.5 py-0.5">Completed</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div><p className="text-gray-500">Area</p><p className="font-semibold text-green-600">{record.area} ha</p></div>
                        <div><p className="text-gray-500">Pesticide</p><p className="font-semibold text-blue-600">{record.pesticide}L</p></div>
                        <div><p className="text-gray-500">Savings</p><p className="font-semibold text-yellow-600">{record.savings}%</p></div>
                    </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;


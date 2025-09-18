import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import WeatherCard from "@/components/WeatherCard";
import DroneStatusCard from "@/components/DroneStatusCard";
import CropHealthChart from "@/components/CropHealthChart";
import CropTypeCard from "@/components/CropTypeCard";
import QuickActions from "@/components/QuickActions";
import DroneAnimation from "@/components/DroneAnimation";
import logo from "../../favicon/apple-touch-icon.png";
import Navigation from "@/components/Navigation";
import { auth } from "../firebase";
import heroImage from "@/assets/hero-drone.jpg";



const Dashboard = () => {
  const navigate = useNavigate();
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

  // Render nothing while checking auth
  if (!user) return null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(59,130,246,0.15) 100%), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-0 pointer-events-none"></div>
      {/* Header */}
      <header className="border-b border-border/50 bg-card/60 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={logo} alt="Agriguard Logo" className="w-12 h-12 shadow-lg" />
              <h1 className="text-3xl font-poppins font-extrabold text-green-700 tracking-wide drop-shadow-lg ml-2">
                Agriguard
              </h1>
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
                <span className="text-sm font-medium">{user.displayName}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1 relative z-10 overflow-y-auto">
        {/* Hero Section */}
        <div className="text-center mb-10 animate-fade-in">
          <DroneAnimation />
          <h2 className="text-5xl font-poppins font-extrabold mb-4 text-white drop-shadow-lg" style={{ letterSpacing: '0.04em' }}>
            Smart Farming with <span className="text-blue-600">AI-Powered Drones</span>
          </h2>
            <p className="text-2xl text-green-200 max-w-2xl mx-auto font-semibold drop-shadow-md mt-2" style={{ letterSpacing: '0.02em' }}>
            Monitor crop health, control pesticide spraying, and maximize yield with precision agriculture technology.
            </p>
        </div>

        {/* Dashboard Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
              <DroneStatusCard />
            </div>
            <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <QuickActions />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
              <CropHealthChart />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="glass-card hover-lift p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Areas Treated Today</h3>
                <p className="text-2xl font-poppins font-bold text-healthy">0.21 ha</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-healthy/20 flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
            </div>
          </Card>

          <Card className="glass-card hover-lift p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Pesticide Saved</h3>
                <p className="text-2xl font-poppins font-bold text-drone-info">42%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-drone-info/20 flex items-center justify-center">
                <span className="text-2xl">💧</span>
              </div>
            </div>
          </Card>

          <Card className="glass-card hover-lift p-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Flight Hours</h3>
                <p className="text-2xl font-poppins font-bold text-mild-infection">2.4 hrs</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-mild-infection/20 flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Alerts */}
    <Card className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <h3 className="text-lg font-poppins font-extrabold mb-4 text-green-700 drop-shadow">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-healthy/10 border border-healthy/20">
              <div className="w-2 h-2 rounded-full bg-healthy"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Sector A-7 treatment completed</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-mild-infection/10 border border-mild-infection/20">
              <div className="w-2 h-2 rounded-full bg-mild-infection"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Mild infection detected in Sector B-3</p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-drone-info/10 border border-drone-info/20">
              <div className="w-2 h-2 rounded-full bg-drone-info"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Drone battery charged to 85%</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;

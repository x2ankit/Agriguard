import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Video, 
  BarChart3, 
  HelpCircle, 
  Menu, 
  LogOut,
  Settings,
  User,
  Bell
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications] = useState(3); // Mock notification count

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Video, label: "Live Control", path: "/live" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: HelpCircle, label: "Help", path: "/help" },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Thank you for using Agriguard",
    });
    navigate("/");
  };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border/50">
        <h2 className="text-xl font-poppins font-extrabold text-green-600 tracking-wide drop-shadow-lg">
          Agriguard
        </h2>
        <p className="text-xs text-green-700 font-semibold">Smart Farming Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? "default" : "ghost"}
            className="w-full justify-start hover-lift"
            onClick={() => navigate(item.path)}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-border/50 space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    // ++ CHANGED THIS CONTAINER TO SEPARATE LEFT AND RIGHT GROUPS ++
    <div className="flex w-full items-center">
      {/* Group 1: Desktop Navigation Links (Stays on the left) */}
      <div className="hidden md:flex items-center space-x-4">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? "default" : "ghost"}
            size="sm"
            className="hover-lift"
            onClick={() => navigate(item.path)}
          >
            <item.icon className="w-4 h-4 mr-2" />
            {item.label}
          </Button>
        ))}
      </div>

      {/* Group 2: Actions & Mobile Menu (Pushed to the right with ml-auto) */}
      <div className="flex items-center space-x-2 ml-auto">
        {/* User Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-600">
                {notifications}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navigation;
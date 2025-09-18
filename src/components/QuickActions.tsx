import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane, Settings2, BarChart3, Map } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuickActions = () => {
  const { toast } = useToast();

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

  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-poppins font-semibold mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          size="lg" 
          className="h-16 bg-green-600 hover:bg-green-700 text-white font-extrabold text-lg shadow-lg border-2 border-green-700 hover-lift"
          onClick={handleAutoSpray}
        >
          <div className="flex items-center space-x-3">
            <Plane className="w-6 h-6 drone-hover text-white" />
            <div className="text-left">
              <div className="font-extrabold text-lg">Start Auto Spray</div>
              <div className="text-xs font-semibold text-white/80">AI-guided spraying</div>
            </div>
          </div>
        </Button>

        <Button 
          size="lg" 
          variant="outline"
          className="h-16 border-2 border-blue-600 text-blue-700 font-extrabold text-lg bg-white hover:bg-blue-50 hover:text-blue-800 shadow-lg hover-lift"
          onClick={handleManualSpray}
        >
          <div className="flex items-center space-x-3">
            <Settings2 className="w-6 h-6 text-blue-700" />
            <div className="text-left">
              <div className="font-extrabold text-lg">Manual Control</div>
              <div className="text-xs font-semibold text-blue-700/80">Take control</div>
            </div>
          </div>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button variant="ghost" size="sm" className="hover-lift">
          <BarChart3 className="w-4 h-4 mr-2" />
          Analytics
        </Button>
        <Button variant="ghost" size="sm" className="hover-lift">
          <Map className="w-4 h-4 mr-2" />
          Field Map
        </Button>
      </div>
    </Card>
  );
};

export default QuickActions;
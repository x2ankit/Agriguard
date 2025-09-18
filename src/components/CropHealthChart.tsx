import { Card } from "@/components/ui/card";
import { Leaf, TrendingUp, TrendingDown } from "lucide-react";

const CropHealthChart = () => {
  // Mock crop health data
  const cropData = {
    healthy: 68,
    mild: 22,
    severe: 10,
    totalArea: 45.8 // in hectares
  };

  const total = cropData.healthy + cropData.mild + cropData.severe;
  const healthyAngle = (cropData.healthy / total) * 360;
  const mildAngle = (cropData.mild / total) * 360;
  const severeAngle = (cropData.severe / total) * 360;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  
  const healthyOffset = 0;
  const mildOffset = (cropData.healthy / total) * circumference;
  const severeOffset = ((cropData.healthy + cropData.mild) / total) * circumference;

  return (
    <Card className="glass-card hover-lift p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-poppins font-semibold">Crop Health Overview</h3>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Leaf className="w-3 h-3" />
          <span>{cropData.totalArea} ha</span>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="hsl(var(--muted))"
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
            <div className="text-2xl font-poppins font-bold gradient-text-healthy">
              {cropData.healthy}%
            </div>
            <div className="text-xs text-muted-foreground">Healthy</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-healthy"></div>
            <TrendingUp className="w-3 h-3 text-healthy" />
          </div>
          <div className="text-sm font-semibold text-healthy">{cropData.healthy}%</div>
          <div className="text-xs text-muted-foreground">Healthy</div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-mild-infection"></div>
            <span className="text-xs">⚠️</span>
          </div>
          <div className="text-sm font-semibold text-mild-infection">{cropData.mild}%</div>
          <div className="text-xs text-muted-foreground">Mild</div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-severe-infection"></div>
            <TrendingDown className="w-3 h-3 text-severe-infection" />
          </div>
          <div className="text-sm font-semibold text-severe-infection">{cropData.severe}%</div>
          <div className="text-xs text-muted-foreground">Severe</div>
        </div>
      </div>
    </Card>
  );
};

export default CropHealthChart;
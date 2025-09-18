import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, TrendingUp, TrendingDown, BarChart3, Leaf, Droplets, Clock } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";

const Analytics = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock analytics data
  const healthTrend = [
    { month: "Jan", healthy: 75, mild: 20, severe: 5 },
    { month: "Feb", healthy: 78, mild: 18, severe: 4 },
    { month: "Mar", healthy: 72, mild: 23, severe: 5 },
    { month: "Apr", healthy: 80, mild: 15, severe: 5 },
    { month: "May", healthy: 85, mild: 12, severe: 3 },
    { month: "Jun", healthy: 82, mild: 16, severe: 2 },
  ];

  const sprayHistory = [
    { date: "2024-01-15", area: 12.5, pesticide: 8.5, savings: 35 },
    { date: "2024-01-14", area: 8.2, pesticide: 5.8, savings: 42 },
    { date: "2024-01-13", area: 15.3, pesticide: 11.2, savings: 28 },
    { date: "2024-01-12", area: 6.8, pesticide: 4.1, savings: 48 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-poppins font-bold gradient-text-drone">
              Agriguard Analytics & Reports
            </h1>
            <div className="flex items-center space-x-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-drone-info text-white font-bold border-drone-info hover:bg-drone-info/80">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {date ? format(date, "MMM dd, yyyy") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Navigation />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card hover-lift p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Area Treated</p>
                <p className="text-2xl font-poppins font-bold text-healthy">156.8 ha</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-healthy mr-1" />
                  <span className="text-xs text-healthy">+12% vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-healthy/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-healthy" />
              </div>
            </div>
          </Card>

          <Card className="glass-card hover-lift p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pesticide Saved</p>
                <p className="text-2xl font-poppins font-bold text-drone-info">38.5%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-drone-info mr-1" />
                  <span className="text-xs text-drone-info">+5% efficiency</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-drone-info/20 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-drone-info" />
              </div>
            </div>
          </Card>

          <Card className="glass-card hover-lift p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flight Hours</p>
                <p className="text-2xl font-poppins font-bold text-mild-infection">284.2 hrs</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-3 h-3 text-severe-infection mr-1" />
                  <span className="text-xs text-severe-infection">-3% downtime</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-mild-infection/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-mild-infection" />
              </div>
            </div>
          </Card>

          <Card className="glass-card hover-lift p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Health Score</p>
                <p className="text-2xl font-poppins font-bold text-healthy">82.5%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-healthy mr-1" />
                  <span className="text-xs text-healthy">+8% improved</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-healthy/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-healthy" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Crop Health Trend */}
          <Card className="glass-card p-6">
            <h3 className="text-lg font-poppins font-semibold mb-4">Crop Health Over Time</h3>
            <div className="space-y-4">
              {healthTrend.map((data, index) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{data.month}</span>
                    <div className="flex space-x-3 text-xs">
                      <span className="text-healthy">{data.healthy}%</span>
                      <span className="text-mild-infection">{data.mild}%</span>
                      <span className="text-severe-infection">{data.severe}%</span>
                    </div>
                  </div>
                  <div className="flex rounded-full overflow-hidden h-3 bg-muted">
                    <div 
                      className="bg-healthy transition-all duration-1000"
                      style={{ width: `${data.healthy}%`, animationDelay: `${index * 0.1}s` }}
                    ></div>
                    <div 
                      className="bg-mild-infection transition-all duration-1000"
                      style={{ width: `${data.mild}%`, animationDelay: `${index * 0.1}s` }}
                    ></div>
                    <div 
                      className="bg-severe-infection transition-all duration-1000"
                      style={{ width: `${data.severe}%`, animationDelay: `${index * 0.1}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-healthy"></div>
                <span>Healthy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-mild-infection"></div>
                <span>Mild</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-severe-infection"></div>
                <span>Severe</span>
              </div>
            </div>
          </Card>

          {/* Pesticide Savings */}
          <Card className="glass-card p-6">
            <h3 className="text-lg font-poppins font-semibold mb-4">Pesticide Savings Progress</h3>
            
            <div className="text-center mb-6">
              <div className="text-4xl font-poppins font-bold gradient-text-drone mb-2">42%</div>
              <p className="text-sm text-muted-foreground">Average savings this month</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Target Savings</span>
                <Badge variant="outline" className="bg-drone-info text-white font-bold border-drone-info">35%</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-4 shadow-inner flex items-center">
                <div 
                  className="h-4 rounded-full bg-gradient-to-r from-drone-info via-healthy to-mild-infection transition-all duration-1000 shadow-lg border border-white/10"
                  style={{ width: "42%" }}
                ></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-3 rounded-lg bg-healthy/10">
                  <div className="text-lg font-bold text-healthy">₹28,450</div>
                  <div className="text-xs text-muted-foreground">Money Saved</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-drone-info/10">
                  <div className="text-lg font-bold text-drone-info">186L</div>
                  <div className="text-xs text-muted-foreground">Pesticide Saved</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Spray History */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-poppins font-semibold mb-4">Recent Spray History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 font-medium text-sm">Date</th>
                  <th className="text-left py-2 font-medium text-sm">Area Covered</th>
                  <th className="text-left py-2 font-medium text-sm">Pesticide Used</th>
                  <th className="text-left py-2 font-medium text-sm">Savings</th>
                  <th className="text-left py-2 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {sprayHistory.map((record, index) => (
                  <tr key={record.date} className="border-b border-border/20 hover:bg-muted/20">
                    <td className="py-3 text-sm font-mono">{record.date}</td>
                    <td className="py-3 text-sm font-mono text-healthy">{record.area} ha</td>
                    <td className="py-3 text-sm font-mono text-drone-info">{record.pesticide}L</td>
                    <td className="py-3 text-sm font-mono text-mild-infection">{record.savings}%</td>
                    <td className="py-3">
                      <Badge variant="outline" className="text-healthy border-healthy">
                        Completed
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
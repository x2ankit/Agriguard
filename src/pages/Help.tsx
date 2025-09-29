import React, { useState, useEffect, useRef } from 'react';
// Imports from "@/" and "react-router-dom" are removed as we are providing self-contained components.

// --- Icon Placeholders (from lucide-react) ---
import { 
    User, MessageCircle, Book, Video, Phone, Battery, 
    Fuel, Settings, AlertTriangle, CalendarDays, ChevronDown,
    LayoutDashboard, BarChart3, HelpCircle 
} from "lucide-react";


// --- Mock UI Components (to fix rendering errors) ---
const Card = React.forwardRef(({ className, children }, ref) => <div ref={ref} className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}>{children}</div>);
const Button = ({ children, variant, className, ...props }) => <button className={`${className} inline-flex items-center justify-center rounded-md text-sm font-medium`} {...props}>{children}</button>;

// A functional mock Accordion
const AccordionContext = React.createContext({ activeItem: null, setActiveItem: () => {} });
const Accordion = ({ children }) => {
    const [activeItem, setActiveItem] = useState(null);
    const value = { activeItem, setActiveItem: (value) => setActiveItem(activeItem === value ? null : value) };
    return <AccordionContext.Provider value={value}><div>{children}</div></AccordionContext.Provider>;
};
const AccordionItem = ({ value, children }) => {
    const trigger = React.Children.toArray(children).find(child => child.type === AccordionTrigger);
    const content = React.Children.toArray(children).find(child => child.type === AccordionContent);
    const { activeItem } = React.useContext(AccordionContext);
    return (
        <div className="border-b last:border-b-0">
            {React.cloneElement(trigger, { value })}
            {activeItem === value && content}
        </div>
    );
};
const AccordionTrigger = ({ children, value }) => {
    const { activeItem, setActiveItem } = React.useContext(AccordionContext);
    return (
        <button onClick={() => setActiveItem(value)} className="flex items-center justify-between w-full py-4 font-medium text-left hover:bg-gray-50 rounded-lg px-1">
            <span>{children}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${activeItem === value ? 'rotate-180' : ''}`} />
        </button>
    );
};
const AccordionContent = ({ children, className }) => <div className={`${className} pb-4`}>{children}</div>;

// --- Type Definition ---
type UserData = {
  displayName: string;
  email: string;
  photoURL?: string;
};

// --- Main Application Header ---
const AppHeader = ({ user }: { user: UserData | null }) => {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Live Control", href: "/live", icon: Settings },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Help", href: "/help", icon: HelpCircle },
  ];
  const activeItem = "Help";

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <h1 className="text-xl font-bold text-gray-800">Agriguard Help & Support</h1>
          <div className="flex items-center space-x-4">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-1.5 shadow-sm">
              <CalendarDays className="w-4 h-4 mr-2" />
              <span>Sep 29, 2025</span>
            </Button>
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1 space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none px-3 py-1.5 ${
                    activeItem === item.name ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </a>
              ))}
            </div>
            <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden lg:block">
                {user?.displayName || "Guest User"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


// --- Help Page Component ---
const HelpPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const guideCardRef = useRef<HTMLDivElement>(null);
  const tutorialsCardRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // This effect syncs the height of the right column to the left column for a balanced look.
  useEffect(() => {
    const syncColumnHeights = () => {
        if (leftColumnRef.current && rightColumnRef.current && guideCardRef.current && tutorialsCardRef.current) {
            
            // 1. Align the top two cards ("Getting Started" and "Video Tutorials")
            const guideCard = guideCardRef.current;
            const tutorialsCard = tutorialsCardRef.current;

            // Reset heights to auto to measure natural height
            guideCard.style.height = 'auto';
            tutorialsCard.style.height = 'auto';
            
            const maxHeight = Math.max(guideCard.offsetHeight, tutorialsCard.offsetHeight);
            guideCard.style.height = `${maxHeight}px`;
            tutorialsCard.style.height = `${maxHeight}px`;


            // 2. Align the full columns
            // Reset right column height to auto before measuring left
            rightColumnRef.current.style.height = 'auto';
            const leftColumnHeight = leftColumnRef.current.offsetHeight;
            // Set the right column height to match the left
            rightColumnRef.current.style.height = `${leftColumnHeight}px`;
        }
    };
    
    // A brief delay ensures all content is rendered before measuring
    const timer = setTimeout(syncColumnHeights, 150);
    window.addEventListener('resize', syncColumnHeights);
    
    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', syncColumnHeights);
    };
  }, []); // Runs on mount and cleans up

  const faqs = [
    { question: "How do I refill the pesticide tank?", answer: "1. Land the drone safely on level ground\n2. Turn off the drone completely\n3. Open the tank compartment using the release lever\n4. Use the provided funnel to add pesticide\n5. Close and secure the compartment\n6. Run a system check before next flight", category: "maintenance" },
    { question: "What should I do if the drone battery is low?", answer: "When battery drops below 20%:\n1. The drone will automatically return to base\n2. Replace with a fully charged battery\n3. Charge the used battery for 2-3 hours\n4. Always keep spare batteries ready during operations", category: "battery" },
    { question: "How accurate is crop health detection?", answer: "Our AI system has 94% accuracy in detecting:\n• Healthy crops (Green zones)\n• Mild infections (Yellow zones)\n• Severe infections (Red zones)\nThe system uses multispectral imaging and machine learning for precise detection.", category: "ai" },
    { question: "Can I use the drone in windy conditions?", answer: "Safe wind conditions:\n• Wind speed: Below 15 km/h\n• Avoid gusty conditions\n• The drone will alert you if conditions are unsafe\n• Always check weather forecast before operations", category: "weather" },
    { question: "How do I switch between Auto and Manual mode?", answer: "From the dashboard:\n1. Go to Live Drone Control\n2. Find the Mode toggle in the control panel\n3. Switch between Auto (AI-guided) and Manual modes\n4. In Manual mode, you have full control over spraying patterns", category: "operation" },
  ];

  const troubleshootingSteps = [
    { issue: "Drone won't start", icon: <Settings className="w-5 h-5 text-red-500" />, steps: ["Check battery charge", "Verify tank is properly sealed", "Ensure propellers are attached", "Contact support if issue persists"] },
    { issue: "Poor spray coverage", icon: <Fuel className="w-5 h-5 text-yellow-500" />, steps: ["Check nozzle for clogs", "Verify spray pressure settings", "Ensure proper flight altitude", "Calibrate spray system"] },
    { issue: "GPS signal lost", icon: <AlertTriangle className="w-5 h-5 text-red-500" />, steps: ["Move to open area", "Check for interference", "Restart drone GPS", "Wait for satellite connection"] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <AppHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div ref={leftColumnRef} className="lg:col-span-2 space-y-8">
            <Card ref={guideCardRef} className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center"><Book className="w-5 h-5 mr-3 text-indigo-500" />Getting Started Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200"><div className="flex items-center mb-2"><Battery className="w-4 h-4 text-green-600 mr-2" /><h3 className="font-semibold text-sm text-green-800">1. Setup & Charging</h3></div><p className="text-xs text-gray-600">Charge battery, fill tank, perform pre-flight checks</p></div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200"><div className="flex items-center mb-2"><Settings className="w-4 h-4 text-blue-600 mr-2" /><h3 className="font-semibold text-sm text-blue-800">2. Configuration</h3></div><p className="text-xs text-gray-600">Set spray patterns, calibrate sensors, connect GPS</p></div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200"><div className="flex items-center mb-2"><Video className="w-4 h-4 text-yellow-600 mr-2" /><h3 className="font-semibold text-sm text-yellow-800">3. First Flight</h3></div><p className="text-xs text-gray-600">Start with manual mode, test spray system, monitor live feed</p></div>
                <div className="p-4 rounded-lg bg-red-50 border border-red-200"><div className="flex items-center mb-2"><AlertTriangle className="w-4 h-4 text-red-600 mr-2" /><h3 className="font-semibold text-sm text-red-800">4. Safety First</h3></div><p className="text-xs text-gray-600">Always maintain line of sight, check weather conditions</p></div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Quick Troubleshooting</h2>
              <div className="space-y-4">
                {troubleshootingSteps.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50 border">
                    {item.icon}
                    <div className="flex-1"><h3 className="font-semibold text-sm mb-1">{item.issue}</h3><ol className="text-xs text-gray-600 list-decimal list-inside space-y-1">{item.steps.map((step, i) => (<li key={i}>{step}</li>))}</ol></div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
              <Accordion><>{faqs.map((faq, index) => (<AccordionItem key={index} value={`item-${index}`}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent className="text-sm text-gray-600 whitespace-pre-line pt-2">{faq.answer}</AccordionContent></AccordionItem>))}</></Accordion>
            </Card>
          </div>

          <div ref={rightColumnRef} className="flex flex-col space-y-8">
            <Card ref={tutorialsCardRef} className="p-6">
              <h3 className="font-bold mb-4 flex items-center"><Video className="w-5 h-5 mr-3 text-indigo-500" />Video Tutorials</h3>
              <div className="space-y-3">
                <a href="#" className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border transition-all"><div><p className="text-sm font-medium">Basic Setup</p><p className="text-xs text-gray-500">5:23 min</p></div></a>
                <a href="#" className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border transition-all"><div><p className="text-sm font-medium">Flight Controls</p><p className="text-xs text-gray-500">8:45 min</p></div></a>
                <a href="#" className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border transition-all"><div><p className="text-sm font-medium">Maintenance</p><p className="text-xs text-gray-500">12:16 min</p></div></a>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Contact Support</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-3"><Phone className="w-4 h-4 text-gray-500 flex-shrink-0" /><span>+xx 99xx5 99xxx</span></div>
                <div className="flex items-center space-x-3"><MessageCircle className="w-4 h-4 text-gray-500 flex-shrink-0" /><span>support@agriguard.com</span></div>
                <p className="text-xs text-gray-500 pt-2">Available 24/7 for emergency support</p>
              </div>
            </Card>
             
             <Card className="overflow-hidden flex flex-col flex-grow">
                <iframe 
                    src="https://www.chatbase.co/chatbot-iframe/Se1rIovAh9j2GYm8wLD3g" 
                    width="100%" 
                    className="flex-grow min-h-[200px]"
                    frameBorder="0">
                </iframe>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;


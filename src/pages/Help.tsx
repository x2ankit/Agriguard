import { useState } from "react"; // useEffect is no longer needed
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Send, Book, Video, Phone, Globe, Battery, Fuel, Settings, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Help = () => {
  // The old state and functions for the fake chat are no longer needed.
  const [language, setLanguage] = useState("en");
  const { toast } = useToast();

  const faqs = [
    // ... your faqs array remains unchanged
    {
      question: "How do I refill the pesticide tank?",
      answer: "1. Land the drone safely on level ground\n2. Turn off the drone completely\n3. Open the tank compartment using the release lever\n4. Use the provided funnel to add pesticide\n5. Close and secure the compartment\n6. Run a system check before next flight",
      category: "maintenance"
    },
    {
      question: "What should I do if the drone battery is low?",
      answer: "When battery drops below 20%:\n1. The drone will automatically return to base\n2. Replace with a fully charged battery\n3. Charge the used battery for 2-3 hours\n4. Always keep spare batteries ready during operations",
      category: "battery"
    },
    {
      question: "How accurate is the crop health detection?",
      answer: "Our AI system has 94% accuracy in detecting:\n• Healthy crops (Green zones)\n• Mild infections (Yellow zones)\n• Severe infections (Red zones)\nThe system uses multispectral imaging and machine learning for precise detection.",
      category: "ai"
    },
    {
      question: "Can I use the drone in windy conditions?",
      answer: "Safe wind conditions:\n• Wind speed: Below 15 km/h\n• Avoid gusty conditions\n• The drone will alert you if conditions are unsafe\n• Always check weather forecast before operations",
      category: "weather"
    },
    {
      question: "How do I switch between Auto and Manual mode?",
      answer: "From the dashboard:\n1. Go to Live Drone Control\n2. Find the Mode toggle in the control panel\n3. Switch between Auto (AI-guided) and Manual modes\n4. In Manual mode, you have full control over spraying patterns",
      category: "operation"
    }
  ];

  const troubleshootingSteps = [
    // ... your troubleshootingSteps array remains unchanged
    {
      issue: "Drone won't start",
      icon: <Settings className="w-5 h-5 text-severe-infection" />,
      steps: ["Check battery charge", "Verify tank is properly sealed", "Ensure propellers are attached", "Contact support if issue persists"]
    },
    {
      issue: "Poor spray coverage",
      icon: <Fuel className="w-5 h-5 text-mild-infection" />,
      steps: ["Check nozzle for clogs", "Verify spray pressure settings", "Ensure proper flight altitude", "Calibrate spray system"]
    },
    {
      issue: "GPS signal lost",
      icon: <AlertTriangle className="w-5 h-5 text-severe-infection" />,
      steps: ["Move to open area", "Check for interference", "Restart drone GPS", "Wait for satellite connection"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <div className="w-full border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2">
          <Navigation />
        </div>
      </div>
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-poppins font-extrabold text-green-600 tracking-wide drop-shadow-lg">
              Agriguard Help & Support
            </h1>
            <div className="flex items-center space-x-3">
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                className="bg-green-600 text-white font-bold border-green-600 hover:bg-green-700"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "en" ? "English" : "हिन्दी"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* ... Your "Getting Started", "Troubleshooting", and "FAQ" cards ... */}
            <Card className="glass-card p-6">{/* Getting Started... */}</Card>
            <Card className="glass-card p-6">{/* Troubleshooting... */}</Card>
            <Card className="glass-card p-6">{/* FAQ... */}</Card>
          </div>

          {/* Right Column (Support) */}
          <div className="space-y-6">
            {/* Video Tutorials Card */}
            <Card className="glass-card p-4">{/* ... Video tutorials content ... */}</Card>

            {/* Contact Info Card */}
            <Card className="glass-card p-4">
              <h3 className="font-semibold mb-3">Contact Support</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-drone-info" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-healthy" />
                  <span>support@agriguard.com</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Available 24/7 for emergency support
                </div>
              </div>
            </Card>

            {/* ++ NEW CHATBOT CARD GOES HERE ++ */}
            <Card className="glass-card overflow-hidden">
              <iframe
                src="https://www.chatbase.co/chatbot-iframe/Se1rIovAh9j2GYm8wLD3g"
                width="100%"
                style={{ height: '100%', minHeight: '700px' }}
                frameBorder="0"
              ></iframe>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
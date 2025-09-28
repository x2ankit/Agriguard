import { useState, useEffect } from "react"; // Added useEffect
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Send, Book, Video, Phone, Globe, Battery, Fuel, Settings, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Help = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [language, setLanguage] = useState("en"); // default English
  const { toast } = useToast();

  // This hook will load your Chatbase bot when the page loads
  useEffect(() => {
    const addChatbaseScript = () => {
      if (document.getElementById("Se1rIovAh9j2GYm8wLD3g")) {
        return;
      }
      
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "Se1rIovAh9j2GYm8wLD3g";
      script.defer = true;
      
      document.body.appendChild(script);
    };

    addChatbaseScript();
  }, []);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    toast({
      title: "Message Sent! 💬",
      description: "Our support team will respond shortly.",
    });
    setChatMessage("");
  };

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
              <Button
                type="button"
                className="bg-green-600 text-white font-bold border-green-600 hover:bg-green-700"
                onClick={handleSendMessage}
              >
                <Send className="w-4 h-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Quick Help Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Getting Started */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-poppins font-extrabold mb-4 flex items-center text-green-700 drop-shadow">
                <Book className="w-5 h-5 mr-2 text-drone-info" />
                Getting Started Guide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-healthy/10 border border-healthy/20">
                  <div className="flex items-center mb-2">
                    <Battery className="w-4 h-4 text-healthy mr-2" />
                    <h3 className="font-semibold text-sm">1. Setup & Charging</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Charge battery, fill tank, perform pre-flight checks
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-drone-info/10 border border-drone-info/20">
                  <div className="flex items-center mb-2">
                    <Settings className="w-4 h-4 text-drone-info mr-2" />
                    <h3 className="font-semibold text-sm">2. Configuration</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Set spray patterns, calibrate sensors, connect GPS
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-mild-infection/10 border border-mild-infection/20">
                  <div className="flex items-center mb-2">
                    <Video className="w-4 h-4 text-mild-infection mr-2" />
                    <h3 className="font-semibold text-sm">3. First Flight</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Start with manual mode, test spray system, monitor live feed
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-severe-infection/10 border border-severe-infection/20">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-4 h-4 text-severe-infection mr-2" />
                    <h3 className="font-semibold text-sm">4. Safety First</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Always maintain line of sight, check weather conditions
                  </p>
                </div>
              </div>
            </Card>

            {/* Troubleshooting */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-poppins font-extrabold mb-4 text-green-700 drop-shadow">Quick Troubleshooting</h2>
              <div className="space-y-4">
                {troubleshootingSteps.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                    {item.icon}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-2">{item.issue}</h3>
                      <ol className="text-xs text-muted-foreground space-y-1">
                        {item.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start">
                            <span className="mr-2">{stepIndex + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* FAQ */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-poppins font-extrabold mb-4 text-green-700 drop-shadow">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center space-x-2">
                        <span>{faq.question}</span>
                        <Badge variant="outline" className="ml-auto text-xs bg-green-600 text-white font-bold border-green-600">
                          {faq.category}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground whitespace-pre-line">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>

          {/* Chatbot & Support */}
          <div className="space-y-6">

            {/* THE STATIC CHATBOX USED TO BE HERE. IT HAS BEEN REMOVED. */}
            {/* The Chatbase script loaded by useEffect will now create a floating chat bubble. */}

            {/* Video Tutorials */}
            <Card className="glass-card p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Video className="w-4 h-4 mr-2 text-mild-infection" />
                Video Tutorials
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-healthy/10 border border-healthy/20 hover-lift cursor-pointer">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-healthy"></div>
                    <span className="text-sm font-medium">Basic Setup</span>
                  </div>
                  <p className="text-xs text-muted-foreground">5:23 min</p>
                </div>
                <div className="p-3 rounded-lg bg-drone-info/10 border border-drone-info/20 hover-lift cursor-pointer">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-drone-info"></div>
                    <span className="text-sm font-medium">Flight Controls</span>
                  </div>
                  <p className="text-xs text-muted-foreground">8:45 min</p>
                </div>
                <div className="p-3 rounded-lg bg-mild-infection/10 border border-mild-infection/20 hover-lift cursor-pointer">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-mild-infection"></div>
                    <span className="text-sm font-medium">Maintenance</span>
                  </div>
                  <p className="text-xs text-muted-foreground">12:16 min</p>
                </div>
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="glass-card p-4">
              <h3 className="font-semibold mb-3">Contact Support</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-drone-info" />
                  <span>+99 99xx88xx99</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
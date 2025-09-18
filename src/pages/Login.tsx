import { useState } from "react";
import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DroneAnimation from "@/components/DroneAnimation";
import logo from "../../favicon/apple-touch-icon.png";
import heroImage from "@/assets/hero-drone.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [language, setLanguage] = useState("en");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simple phone validation (India format)
  const isValidPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith("91"));
  };

  const handleAuth = () => {
    if (!isValidPhone(phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid mobile number.",
        variant: "destructive",
      });
      return;
    }
    toast({
  title: "Welcome to Agriguard! 🚁",
      description: "Login successful. Redirecting to dashboard...",
    });
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Store user info for Dashboard
      localStorage.setItem("user", JSON.stringify({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }));
      toast({
        title: `Welcome, ${user.displayName || "User"}!`,
        description: "Google login successful. Redirecting to dashboard...",
      });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error: any) {
      toast({
        title: "Google Login Failed",
        description: error.message || "Unable to login with Google.",
        variant: "destructive",
      });
    }
  };

  return (
    <div 
      className="min-h-screen bg-background flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-background/20 backdrop-blur-sm"></div>
      
      <div className="w-full max-w-md space-y-6 animate-fade-in relative z-10">
        {/* Header */}
        <div className="text-center">
          <img src={logo} alt="Agriguard Logo" className="w-12 h-12 mx-auto mb-2 rounded-full shadow-lg" />
          <DroneAnimation />
          <h1 className="text-3xl font-poppins font-bold text-white mb-2 drop-shadow-lg">
            Agriguard
          </h1>
          <p className="text-white/90 drop-shadow">
            Smart farming with AI-powered precision
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="hover-lift text-white hover:bg-white/10"
          >
            <Globe className="w-4 h-4 mr-2" />
            {language === "en" ? "हिन्दी" : "English"}
          </Button>
        </div>

        <Card className="glass-card p-6 backdrop-blur-md bg-white/10 border-white/20">
          {/* Toggle Login/Signup */}
          <div className="flex rounded-lg bg-black/20 p-1 mb-6">
            <Button
              variant={isLogin ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </Button>
          </div>

          <form className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your full name"
                  className="hover-lift bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-white/70" />
                <Input 
                  id="phone" 
                  placeholder="+91 98765 43210"
                  className="pl-10 hover-lift bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email (Optional)</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-white/70" />
                <Input 
                  id="email" 
                  type="email"
                  placeholder="farmer@example.com"
                  className="pl-10 hover-lift bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="button"
              className="w-full bg-healthy text-white font-bold hover:bg-healthy/90 hover-lift"
              onClick={handleAuth}
            >
              {isLogin ? "Login with OTP" : "Sign Up with OTP"}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator className="bg-white/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white/10 backdrop-blur px-2 text-xs text-white/90">OR</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full hover-lift bg-drone-info text-white font-bold border-drone-info hover:bg-drone-info/80"
            onClick={handleGoogleAuth}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <p className="text-xs text-center text-white/70 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-lg bg-white/10 backdrop-blur hover-lift border border-white/20">
            <div className="text-2xl mb-1">🌱</div>
            <div className="text-xs font-medium text-white">Crop Health</div>
          </div>
          <div className="p-3 rounded-lg bg-white/10 backdrop-blur hover-lift border border-white/20">
            <div className="text-2xl mb-1">🚁</div>
            <div className="text-xs font-medium text-white">AI Control</div>
          </div>
          <div className="p-3 rounded-lg bg-white/10 backdrop-blur hover-lift border border-white/20">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-xs font-medium text-white">Analytics</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
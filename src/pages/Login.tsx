import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "@/firebase";
import { 
  signInWithPopup, 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, Lock, Download, X, BarChart3, Bot, Leaf, ShieldCheck, MessageSquare, Video, MapPin, ScanLine, SprayCan, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "../../favicon/apple-touch-icon.png";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: any;
  }
}

// Authentication Modal Component (Fully Functional)
const AuthModal = ({ closeModal, initialView }: { closeModal: () => void, initialView: boolean }) => {
  const [isLogin, setIsLogin] = useState(initialView);
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const recaptchaContainer = document.getElementById('recaptcha-container');
    if (recaptchaContainer && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { 
        size: 'invisible', 
        callback: () => {} 
      });
    }
  }, []);

  const handlePhoneAuth = async () => {
    if (phone.length !== 10) { toast({ title: "Invalid Phone Number", description: "Please enter a valid 10-digit mobile number.", variant: "destructive" }); return; }
    setLoading(true);
    const appVerifier = window.recaptchaVerifier;
    const formattedPhone = `+91${phone}`;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      toast({ title: "OTP Sent!", description: `An OTP has been sent to ${formattedPhone}` });
    } catch (error) { console.error("SMS not sent error", error); toast({ title: "Failed to Send OTP", variant: "destructive" }); } finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify({ displayName: user.displayName || name || "User", email: user.email, photoURL: user.photoURL }));
      toast({ title: "Login Successful!", description: "Welcome to Agriguard." });
      navigate("/dashboard");
    } catch (error) { toast({ title: "Invalid OTP", variant: "destructive" }); } finally { setLoading(false); }
  };

  const handleEmailAuth = async () => {
    setLoading(true);
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify({ displayName: user.displayName || name || "User", email: user.email, photoURL: user.photoURL }));
      toast({ title: "Success!", description: `Welcome ${user.displayName || name}!` });
      navigate("/dashboard");
    } catch (error: any) { toast({ title: "Authentication Failed", description: error.message, variant: "destructive" }); } finally { setLoading(false); }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify({ displayName: user.displayName, email: user.email, photoURL: user.photoURL }));
      toast({ title: `Welcome, ${user.displayName || "User"}!`, description: "Redirecting to dashboard..." });
      navigate("/dashboard");
    } catch (error: any) { toast({ title: "Google Login Failed", description: error.message, variant: "destructive" }); }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
        <Card className="w-full max-w-sm m-4 p-6 shadow-2xl border-t-4 border-t-green-500 bg-white relative animate-slide-in-up">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-gray-400 hover:bg-gray-200" onClick={closeModal}><X className="w-5 h-5" /></Button>
            <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
                <Button variant="ghost" size="sm" className={`flex-1 transition-all ${isLogin ? 'bg-white shadow-md text-gray-900' : 'text-gray-500'}`} onClick={() => setIsLogin(true)}>Login</Button>
                <Button variant="ghost" size="sm" className={`flex-1 transition-all ${!isLogin ? 'bg-white shadow-md text-gray-900' : 'text-gray-500'}`} onClick={() => setIsLogin(false)}>Sign Up</Button>
            </div>
             <div className="flex border-b mb-4">
                <button className={`flex-1 py-2 text-sm font-medium ${authMethod === 'phone' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`} onClick={() => setAuthMethod('phone')}>Phone</button>
                <button className={`flex-1 py-2 text-sm font-medium ${authMethod === 'email' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`} onClick={() => setAuthMethod('email')}>Email</button>
            </div>
            
            {authMethod === 'phone' && (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); otpSent ? handleVerifyOtp() : handlePhoneAuth(); }}>
                {!isLogin && <div className="space-y-1"><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-50 placeholder:text-gray-400" /></div>}
                <div className="space-y-1"><Label htmlFor="phone">Phone Number</Label><div className="relative"><Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" /><Input id="phone" placeholder="10-digit mobile number" className="pl-10 bg-gray-50 placeholder:text-gray-400" value={phone} onChange={e => setPhone(e.target.value)} /></div></div>
                {otpSent && <div className="space-y-1"><Label htmlFor="otp">Enter OTP</Label><Input id="otp" placeholder="6-digit OTP" className="bg-gray-50 placeholder:text-gray-400" value={otp} onChange={e => setOtp(e.target.value)} /></div>}
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={loading}>{loading ? 'Sending...' : (otpSent ? 'Verify OTP' : (isLogin ? 'Login with OTP' : 'Sign Up with OTP'))}</Button>
              </form>
            )}
            {authMethod === 'email' && (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleEmailAuth(); }}>
                {!isLogin && <div className="space-y-1"><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="Enter your full name" className="bg-gray-50 placeholder:text-gray-400" value={name} onChange={e => setName(e.target.value)} /></div>}
                <div className="space-y-1"><Label htmlFor="email">Email</Label><div className="relative"><Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" /><Input id="email" type="email" placeholder="you@example.com" className="pl-10 bg-gray-50 placeholder:text-gray-400" value={email} onChange={e => setEmail(e.target.value)} /></div></div>
                <div className="space-y-1"><Label htmlFor="password">Password</Label><div className="relative"><Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" /><Input id="password" type="password" placeholder="••••••••" className="pl-10 bg-gray-50 placeholder:text-gray-400" value={password} onChange={e => setPassword(e.target.value)} /></div></div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={loading}>{loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}</Button>
              </form>
            )}
            <div className="relative my-6"><Separator /><div className="absolute inset-0 flex items-center justify-center"><span className="bg-white/80 backdrop-blur-sm px-2 text-xs text-gray-500">OR</span></div></div>
            <Button variant="outline" className="w-full flex items-center justify-center text-gray-700 bg-white border-gray-300 hover:bg-gray-100" onClick={handleGoogleAuth}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691c-1.211 2.272-1.895 4.885-1.895 7.639s.684 5.367 1.895 7.639l7.639-5.932H6.306z"></path><path fill="#4CAF50" d="M24 48c5.166 0 9.86-1.977 13.409-5.192l-6.19-4.821c-1.743 1.163-3.945 1.84-6.289 1.84c-4.438 0-8.156-2.526-9.657-5.968H5.976v4.823C9.871 42.612 16.451 48 24 48z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.16-4.082 5.581l6.19 4.821c3.576-3.321 6.005-7.962 6.005-13.402c0-1.341-.138-2.65-.389-3.917z"></path></svg>
              Continue with Google
            </Button>
        </Card>
    </div>
  );
};


// Main Landing Page Component
const LandingPage: React.FC = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);
    
    const openAuthModal = (isLogin: boolean) => {
        setIsLoginView(isLogin);
        setIsAuthModalOpen(true);
    }
    
    return (
        <div className="min-h-screen w-full bg-white text-gray-800">
            {isAuthModalOpen && <AuthModal closeModal={() => setIsAuthModalOpen(false)} initialView={isLoginView} />}
            <div id="recaptcha-container"></div>
            
            <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <img src={logo} alt="Agriguard Logo" className="w-9 h-9" />
                            <span className="text-xl font-bold">Agriguard</span>
                        </div>
                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
                            <a href="#features" className="hover:text-green-600 transition-colors">Features</a>
                            <a href="#how-it-works" className="hover:text-green-600 transition-colors">How It Works</a>
                            <a href="#about-us" className="hover:text-green-600 transition-colors">About Us</a>
                            <a href="#contact-us" className="hover:text-green-600 transition-colors">Contact Us</a>
                        </nav>
                        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => openAuthModal(true)}>
                            Login / Sign Up
                        </Button>
                    </div>
                </div>
            </header>

            <main className="relative overflow-hidden">
                {/* FIX: Replaced padding with min-h-screen and flexbox for perfect fullscreen centering */}
                <section className="min-h-screen flex items-center justify-center text-center relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-50/50 via-blue-50/50 to-gray-50/50 z-0"></div>
                     <div className="absolute -top-20 -left-20 w-80 h-80 bg-green-200/40 rounded-full animate-blob"></div>
                     <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-200/40 rounded-full animate-blob animation-delay-2000"></div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
                        <img src={logo} alt="Agriguard Logo" className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg"/>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-900">
                            Agriguard
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Leverage AI-powered drones to monitor crop health, optimize pesticide spraying, and maximize your yield with unparalleled efficiency.
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button size="lg" className="h-12 text-base w-full sm:w-auto bg-green-600 hover:bg-green-700" onClick={() => openAuthModal(false)}>
                                    Get Started for Free
                                </Button>
                                <a href="#how-it-works" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-12 px-8 text-base w-full sm:w-auto bg-white/50 border border-gray-300 hover:bg-white transition-colors">
                                    Learn More
                                </a>
                            </div>
                            <a href="#get-the-app" className="inline-flex items-center justify-center rounded-md text-lg font-semibold h-14 px-10 mt-2 text-green-800 bg-green-100 border border-green-200 hover:bg-green-200 transition-all shadow-sm hover:shadow-md w-full sm:w-auto">
                                Download Now
                            </a>
                        </div>
                    </div>
                </section>

                <section id="features" className="py-20 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900">The Future of Farming is Here</h2>
                            <p className="mt-4 text-lg text-gray-600">A smarter way to manage your agricultural operations.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           <Card className="p-6 text-center bg-white shadow-lg border hover:shadow-xl transition-shadow">
                                <Leaf className="w-10 h-10 mx-auto mb-4 text-green-600" />
                                <h3 className="text-lg font-semibold">AI Crop Analysis</h3>
                                <p className="mt-2 text-sm text-gray-600">Identify crop stress and disease with over 94% accuracy.</p>
                           </Card>
                           <Card className="p-6 text-center bg-white shadow-lg border hover:shadow-xl transition-shadow">
                                <Bot className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                                <h3 className="text-lg font-semibold">Automated Spraying</h3>
                                <p className="mt-2 text-sm text-gray-600">Deploy drones to autonomously spray affected areas, saving time.</p>
                           </Card>
                           <Card className="p-6 text-center bg-white shadow-lg border hover:shadow-xl transition-shadow">
                                <BarChart3 className="w-10 h-10 mx-auto mb-4 text-yellow-600" />
                                <h3 className="text-lg font-semibold">Data & Analytics</h3>
                                <p className="mt-2 text-sm text-gray-600">Access detailed reports to make informed decisions for future growth.</p>
                           </Card>
                           <Card className="p-6 text-center bg-white shadow-lg border hover:shadow-xl transition-shadow">
                                <MessageSquare className="w-10 h-10 mx-auto mb-4 text-purple-600" />
                                <h3 className="text-lg font-semibold">AI Help Desk</h3>
                                <p className="mt-2 text-sm text-gray-600">Get instant answers to your questions with our AI-powered chat support.</p>
                           </Card>
                           <Card className="p-6 text-center bg-white shadow-lg border hover:shadow-xl transition-shadow">
                                <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-red-600" />
                                <h3 className="text-lg font-semibold">24/7 Priority Support</h3>
                                <p className="mt-2 text-sm text-gray-600">Our expert team is always available to help you with any issues.</p>
                           </Card>
                           <Card className="p-6 text-center bg-white shadow-lg border hover:shadow-xl transition-shadow">
                                <Video className="w-10 h-10 mx-auto mb-4 text-indigo-600" />
                                <h3 className="text-lg font-semibold">Live Drone Control</h3>
                                <p className="mt-2 text-sm text-gray-600">View a live feed and take manual control of your drone at any time.</p>
                           </Card>
                        </div>
                    </div>
                </section>
                
                <section id="about-us" className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold text-gray-900">Meet Team Agriguard</h2>
                        <p className="mt-6 text-lg text-gray-600">
                            We are Team Agriguard, and we believe technology should be a powerful ally for farmers, not another complication. We saw the modern challenges of agriculture and knew we could build a better way forward. That’s why we created Agriguard to deliver clear, actionable insights that lead to healthier crops, bigger yields, and a stronger, more resilient food system for everyone.
                        </p>
                    </div>
                </section>

                <section id="how-it-works" className="py-20 bg-gray-50">
                     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
                            <p className="mt-4 text-lg text-gray-600">A simple, four-step process to get you started.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                            <Card className="p-6 text-center bg-white shadow-lg border hover:shadow-xl transition-shadow">
                                <UserPlus className="w-10 h-10 mx-auto mb-4 text-green-600" />
                                <h3 className="text-lg font-semibold">1. Sign Up & Connect</h3>
                                <p className="mt-2 text-sm text-gray-600">Create your account in minutes and connect your drone to the Agriguard platform.</p>
                            </Card>
                            <Card className="p-6 text-center bg-white shadow-lg border hover:shadow-xl transition-shadow">
                                <ScanLine className="w-10 h-10 mx-auto mb-4 text-green-600" />
                                <h3 className="text-lg font-semibold">2. Autonomous Scan</h3>
                                <p className="mt-2 text-sm text-gray-600">Map your field and our drone will automatically scan for infected regions using AI.</p>
                            </Card>
                            <Card className="p-6 text-center bg-white shadow-lg border hover:shadow-xl transition-shadow">
                                <SprayCan className="w-10 h-10 mx-auto mb-4 text-green-600" />
                                <h3 className="text-lg font-semibold">3. Precision Spraying</h3>
                                <p className="mt-2 text-sm text-gray-600">The drone intelligently sprinkles the required pesticides only on the affected areas.</p>
                            </Card>
                            <Card className="p-6 text-center bg-white shadow-lg border hover:shadow-xl transition-shadow">
                                <BarChart3 className="w-10 h-10 mx-auto mb-4 text-green-600" />
                                <h3 className="text-lg font-semibold">4. View Analytics</h3>
                                <p className="mt-2 text-sm text-gray-600">Track crop health, monitor yield improvements, and access detailed reports on your dashboard.</p>
                            </Card>
                        </div>
                    </div>
                </section>

                <section id="get-the-app" className="bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                        <h2 className="text-4xl font-bold text-gray-900">Download Now</h2>
                        <p className="mt-4 text-xl text-gray-600">Get the Agriguard app today and explore the features that will benefit your farm.</p>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                            <Button variant="outline" className="bg-white/50 border-gray-300 h-14 flex items-center justify-center gap-2 text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-lg transition-all">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 5.5H18.5V2.5H15.5V5.5ZM15.5 15.5H18.5V12.5H15.5V15.5ZM11.5 15.5H14.5V12.5H11.5V15.5ZM5.5 15.5H8.5V12.5H5.5V15.5ZM5.5 5.5H8.5V2.5H5.5V5.5ZM11.5 5.5H14.5V2.5H11.5V5.5ZM9.5 9.5H14.5V6.5H9.5V9.5ZM9.5 21.5H14.5V18.5H9.5V21.5Z" fill="currentColor"></path></svg>
                                <div className="text-left"><div className="text-xs">Download for</div><div className="text-sm font-semibold">Android</div></div>
                            </Button>
                            <Button variant="outline" className="bg-white/50 border-gray-300 h-14 flex items-center justify-center gap-2 text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-lg transition-all">
                                <Download className="w-5 h-5" /><div className="text-left"><div className="text-xs">Install on</div><div className="text-sm font-semibold">Desktop</div></div>
                            </Button>
                        </div>
                    </div>
                </section>

                <section id="contact-us" className="py-20 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900">Get In Touch</h2>
                            <p className="mt-4 text-lg text-gray-600">Have questions? Our team is here to help you get started with Agriguard.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <Card className="p-6 bg-white shadow-lg">
                                <Mail className="w-10 h-10 mx-auto mb-4 text-green-600" />
                                <h3 className="text-lg font-semibold">Email Us</h3>
                                <a href="mailto:contact@agriguard.com" className="mt-2 text-sm text-gray-600 hover:text-green-600">support@agriguard.com</a>
                            </Card>
                             <Card className="p-6 bg-white shadow-lg">
                                <Phone className="w-10 h-10 mx-auto mb-4 text-green-600" />
                                <h3 className="text-lg font-semibold">Call Us</h3>
                                <p className="mt-2 text-sm text-gray-600">+91-123-456-7890</p>
                            </Card>
                             <Card className="p-6 bg-white shadow-lg">
                                <MapPin className="w-10 h-10 mx-auto mb-4 text-green-600" />
                                <h3 className="text-lg font-semibold">Visit Us</h3>
                                <p className="mt-2 text-sm text-gray-600"> India </p>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-50 border-t">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
                    <p>&copy; 2025 Agriguard. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
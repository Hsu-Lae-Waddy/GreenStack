import React  from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Sprout,
  Sparkles,
  Bot,
  Mail,
  Phone,
  Heart,
  MessageCircle,
  TrendingUp,
  TrendingDown,MapPin,ArrowUpRight,Store

} from "lucide-react";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";

const LandingPage = () => {
  const navigate=useNavigate()
  const handleUser = async()=>{

    const token = localStorage.getItem("token")
    if (token){
      navigate('/home')
    }else{
      navigate('/login')
    }

  }
  return (
    /* Increased bottom padding (pb-40) for mobile to accommodate the floating navbar */
    <div className="min-h-screen bg-[#FDFEFA] font-sans pb-40 md:pb-0">
      {/* 1. DESKTOP NAVBAR */}
      <Navbar name="Home"/>

      
      {/* 3. ADVERTISEMENT SECTION */}
      <section className="px-5 py-6 md:px-20 max-w-7xl mx-auto">
        <div className="bg-[#C5A677] rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 text-white relative flex flex-row items-center justify-between overflow-hidden shadow-xl min-h-[180px] md:min-h-[400px]">
          <div className="w-[60%] md:w-1/2 z-20">
            <h2 className="text-xl md:text-5xl font-black leading-tight mb-3 md:mb-6">
              Grow Smarter <br className="hidden md:block" />{" "}
              <span className="text-[#3F865F]">Together</span>
            </h2>
            <p className="text-[10px] md:text-lg font-medium opacity-90 mb-4 md:mb-10 max-w-[200px] md:max-w-sm">
              Daily expert tips for your specific local crops.
            </p>
            <button onClick={handleUser} className="bg-[#3F865F] text-white px-4 py-2 md:px-10 md:py-5 rounded-xl md:rounded-[2rem] font-bold md:font-black text-[10px] md:text-lg shadow-lg flex items-center gap-2">
              Start Now <ChevronRight size={14} />
            </button>
          </div>
          <div className="w-[35%] md:w-1/2 flex justify-end items-end relative h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl"></div>
            <img
              src="./src/assets/home_character_1.png"
              alt="Farmer"
              className="w-28 sm:w-36 md:w-80 h-auto z-10 drop-shadow-2xl translate-y-2 md:translate-y-8"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-6 md:px-20 max-w-7xl mx-auto">
        <div className="bg-[#3F865F] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-white relative flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-2xl shadow-[#3F865F]/30 min-h-[450px]">
          
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3C475] rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C5A677] rounded-full blur-[100px] opacity-10 -ml-20 -mb-20"></div>

          {/* Left Side: Ad Content */}
          <div className="w-full md:w-1/2 z-20 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10">
                <Sparkles size={16} className="text-[#A3C475]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A3C475]">AI Powered Advisor</span>
            </div>
            
            <h2 className="text-3xl md:text-6xl font-black leading-tight mb-6 tracking-tight">
                Not sure what <br/> 
                <span className="text-[#A3C475]">to plant?</span>
            </h2>
            
            <p className="text-sm md:text-xl font-medium opacity-90 mb-10 max-w-md leading-relaxed">
                Tell our AI your <span className="text-[#C5A677] font-bold underline decoration-2">Soil Type</span> and get expert planting tips & knowledge instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <button className="bg-[#C5A677] hover:bg-[#b09366] text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-black/10 flex items-center gap-3 transition-all hover:scale-105 active:scale-95">
                    Consult AI Now
                    <ChevronRight size={20} />
                </button>
                <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-[#3F865F] bg-[#A3C475] flex items-center justify-center text-xs font-bold italic">5k+</div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#3F865F] bg-white overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="user" />
                    </div>
                    <p className="ml-5 text-[10px] font-bold opacity-60 flex items-center">Farmers helped today</p>
                </div>
            </div>
          </div>

          {/* Right Side: Visual Mockup (Chat Interaction) */}
          <div className="w-full md:w-5/12 mt-12 md:mt-0 relative z-20">
            <div className="relative group">
                
                {/* Main Chat Bubble (The Result) */}
                <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-black/20 border-l-[10px] border-[#A3C475] relative z-20 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#3F865F] p-2 rounded-xl">
                            <Bot size={24} className="text-[#A3C475]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-[#C5A677] uppercase tracking-widest leading-none mb-1">AI Assistant</p>
                            <h4 className="text-sm font-black text-[#3F865F]">Based on Silt Soil</h4>
                        </div>
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm font-bold italic leading-relaxed">
                        "Silt soil is highly fertile! I recommend planting <span className="text-[#3F865F] underline">Lettuce or Broccoli</span> for maximum harvest yield this season."
                    </p>
                </div>

                {/* Smaller User Bubble (The Question) */}
                <div className="absolute -top-12 -left-6 md:-left-12 bg-[#C5A677] text-white p-4 rounded-2xl rounded-bl-none shadow-xl z-10 hidden sm:block animate-bounce duration-[3s]">
                    <div className="flex items-center gap-2">
                        <MessageCircle size={14} />
                        <span className="text-xs font-bold">What's best for my soil?</span>
                    </div>
                </div>

                {/* Floating Sprout Icon */}
                <div className="absolute -bottom-6 -right-6 bg-[#A3C475] p-4 rounded-full shadow-2xl border-4 border-[#3F865F] z-30 animate-pulse">
                    <Sprout className="text-[#3F865F]" size={28} />
                </div>
            </div>
          </div>
        </div>
      </section>

      

      <section className="px-5 py-6 md:px-20 max-w-7xl mx-auto">
        <div className="bg-white border-2 border-[#A3C475]/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-sm">
          
          {/* Visual Side: Mock Price Cards */}
          <div className="w-full md:w-1/2 relative flex justify-center items-center h-64 md:h-auto">
            {/* Background Glow */}
            <div className="absolute w-40 h-40 bg-[#A3C475] rounded-full blur-[80px] opacity-20"></div>
            
            {/* Floating Price Card */}
            <div className="relative z-10 bg-white border border-gray-100 shadow-2xl p-6 rounded-[2rem] w-64 md:w-72 rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#3F865F]/10 text-[#3F865F] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider italic">Paddy Price</span>
                    <TrendingUp size={18} className="text-[#3F865F]" />
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold mb-1">
                    <MapPin size={12} className="text-[#C5A677]" /> Hmawbi, Yangon
                </div>
                <h3 className="text-2xl font-black text-[#3F865F] mb-4">2,850,000 <small className="text-xs">MMK</small></h3>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold">
                        <ArrowUpRight size={14}/> +50,000
                    </div>
                    <span className="text-[9px] text-gray-300 font-bold uppercase">Updated 2m ago</span>
                </div>
            </div>

            {/* Second Smaller Card */}
            <div className="absolute top-10 right-4 md:right-10 bg-[#C5A677] text-white p-4 rounded-2xl shadow-xl w-32 md:w-40 rotate-[6deg] z-20">
                <p className="text-[8px] font-black uppercase tracking-widest opacity-80 mb-1">Local Broker</p>
                <p className="text-xs font-bold leading-none">U Ba Kyaw</p>
                <div className="mt-3 flex justify-between items-center">
                    <Phone size={12}/>
                    <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#A3C475]/20 px-4 py-2 rounded-full mb-6">
                <Store size={16} className="text-[#3F865F]" />
                <span className="text-[10px] font-black text-[#3F865F] uppercase tracking-[0.2em]">Real-Time Market</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#3F865F] leading-tight mb-6 italic">
                Know Your Crop's <br/> <span className="text-[#C5A677]">True Value.</span>
            </h2>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed max-w-md">
                Don't guess the price. Get instant updates for crops in your specific township. We connect you directly with local brokers and current export rates.
            </p>
            <button className="bg-[#C5A677] hover:bg-[#b09366] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-lg mx-auto md:mx-0">
                Check Local Prices
                <ArrowUpRight size={20} />
            </button>
          </div>
        </div>
      </section>
      {/* feedback */}
      <section className="px-5 py-6 md:px-20 max-w-7xl mx-auto">
        <div className="bg-[#A3C475] rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 text-white shadow-xl flex justify-center items-center">
          <div className="w-full md:w-1/2 text-center">
            <h2 className="text-xl md:text-5xl font-black leading-tight mb-3 md:mb-6">
              Give Feedback
            </h2>

            <p className="text-xs md:text-lg font-medium mb-4 md:mb-8 text-[#3F865F]">
              Share your ideas, problems, or suggestions to improve Smart
              Farming.
            </p>

            {/* INPUTS */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl text-black border-2 border-[#3F865F] focus:ring-2 focus:ring-[#3F865F]/20 outline-none"
              />

              <textarea
                placeholder="Write your message..."
                rows="3"
                className="w-full px-4 py-3 rounded-xl text-black border-2 border-[#3F865F] focus:ring-2 focus:ring-[#3F865F]/20 outline-none"
              />

              <button className="bg-[#3F865F] text-white px-6 py-3 md:px-10 md:py-4 rounded-xl md:rounded-[2rem] font-bold shadow-lg hover:scale-105 transition-all">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* 4. FOOTER SECTION */}
      <footer className="mt-12 bg-white border-t border-gray-100 pt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Brand */}
            <div className="col-span-1 md:col-span-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="bg-[#3F865F] p-1.5 rounded-lg">
                  <Sprout className="text-[#A3C475]" size={20} />
                </div>
                <span className="text-xl font-black text-[#3F865F]">
                  GreenStack
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Empowering Myanmar farmers with digital tools for a sustainable
                and prosperous future.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-[#3F865F] font-bold mb-4 uppercase text-xs tracking-widest">
                Services
              </h4>
              <ul className="space-y-3 text-sm font-semibold text-gray-400">
                <li className="hover:text-[#C5A677] cursor-pointer transition-colors">
                  Market Prices
                </li>
                <li className="hover:text-[#C5A677] cursor-pointer transition-colors">
                  Crop Diagnosis
                </li>
                <li className="hover:text-[#C5A677] cursor-pointer transition-colors">
                  Weather Alerts
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="text-center md:text-left">
              <h4 className="text-[#3F865F] font-bold mb-4 uppercase text-xs tracking-widest">
                Support
              </h4>
              <div className="space-y-3 text-sm font-semibold text-gray-400">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail size={16} className="text-[#A3C475]" />{" "}
                  <span>info@greenstack.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone size={16} className="text-[#A3C475]" />{" "}
                  <span>+95 9 123 456 789</span>
                </div>
              </div>
            </div>

            {/* Column 4: Socials */}
            <div className="text-center md:text-left">
              <h4 className="text-[#3F865F] font-bold mb-4 uppercase text-xs tracking-widest">
                Follow Us
              </h4>
              <div className="flex justify-center md:justify-start gap-4">
                <SocialIcon icon={<Heart />} color="#3F865F" />
                <SocialIcon icon={<Heart />} color="#C5A677" />
                <SocialIcon icon={<Heart />} color="#3F865F" />
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="py-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-gray-300">
              © 2026 GreenStack Agriculture. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-gray-300">
              Made with{" "}
              <Heart size={12} className="text-red-400 fill-red-400" /> by
              GreenStack Team
            </div>
          </div>
        </div>
      </footer>
      {/* 5. MOBILE FLOATING NOTCH NAVBAR (Fixed Bottom) */}
      <MobileNavbar />
    </div>
  );
};

// Helper components
const WeatherPill = ({ icon, label }) => (
  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[10px] md:text-sm font-bold shrink-0">
    {icon} {label}
  </div>
);

const NavIcon = ({ icon, active = false }) => (
  <button
    className={`p-3 rounded-2xl transition-all ${
      active ? "text-[#3F865F]" : "text-gray-300 hover:text-[#C5A677]"
    }`}
  >
    {React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}
  </button>
);

const SocialIcon = ({ icon, color }) => (
  <button
    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 transition-all hover:bg-white hover:shadow-md"
    style={{ color: color }}
  >
    {React.cloneElement(icon, { size: 18 })}
  </button>
);

// Sub-component for individual metric cards
const WeatherMetric = ({ icon, label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-hover hover:bg-white/10">
    <div className="text-[#A3C475] mb-2">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <p className="text-[9px] font-black uppercase opacity-60 tracking-widest mb-1">
      {label}
    </p>
    <p className="text-xs font-black">{value}</p>
  </div>
);

export default LandingPage;

import React from "react";
import {
  Droplets,
  Wind,
  Sun,
  MapPin,
  ChevronRight,
  Sprout,
  Mail,
  Phone,
  Heart,
  CloudRain,
  Thermometer,
  CircleGauge,
  Compass,
  Zap,
  CalendarDays,
} from "lucide-react";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";

const HomePage = () => {
  const weeklyForecast = [
    { day: "Today", temp: "31", icon: <Sun className="text-[#A3C475]" /> },
    { day: "Mon", temp: "29", icon: <CloudRain className="text-blue-300" /> },
    { day: "Tue", temp: "30", icon: <Sun className="text-[#A3C475]" /> },
    { day: "Wed", temp: "28", icon: <CloudRain className="text-blue-300" /> },
    { day: "Thu", temp: "32", icon: <Sun className="text-[#A3C475]" /> },
    { day: "Fri", temp: "31", icon: <Sun className="text-[#A3C475]" /> },
    { day: "Sat", temp: "30", icon: <Sun className="text-[#A3C475]" /> },
  ];

  return (
    /* Increased bottom padding (pb-40) for mobile to accommodate the floating navbar */
    <div className="min-h-screen bg-[#FDFEFA] font-sans pb-40 md:pb-0">
      {/* 1. DESKTOP NAVBAR */}
      <Navbar name="Home" />
      {/* 2. WEATHER SECTION */}
      <section className="px-5 pt-8 md:px-20 md:pt-12 max-w-7xl mx-auto">
        <div className="bg-[#3F865F] rounded-[2.5rem] p-6 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-[#3F865F]/20">
          {/* Background Decoration */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#A3C475] rounded-full blur-[100px] opacity-20"></div>

          {/* 1. TOP HEADER: Current Status */}
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-white/10 pb-8">
            <div>
              <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10 mb-3">
                <MapPin size={14} className="text-[#A3C475]" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Hmawbi, Yangon
                </span>
              </div>
              <div className="flex items-end gap-4">
                <h1 className="text-7xl md:text-8xl font-black tracking-tighter">
                  31°C
                </h1>
                <div className="mb-2">
                  <p className="text-xl md:text-3xl font-black text-[#A3C475]">
                    Mostly Sunny
                  </p>
                  <p className="text-xs opacity-70 font-bold uppercase tracking-wider">
                    Sunday, 24 March
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:block bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
              <p className="text-[10px] font-black text-[#A3C475] uppercase tracking-widest mb-2">
                Farmer's Advice
              </p>
              <p className="text-sm font-medium italic opacity-90 max-w-[200px]">
                "High humidity expected. Check for fungal growth on paddy
                stalks."
              </p>
            </div>
          </div>

          {/* 2. GRID: Detailed Metrics (All requested fields) */}
          {/* 2. SLIDER: Detailed Metrics (Slide left/right on mobile, Grid on desktop) */}
          <div className="relative z-10 mb-10">
            <div className="flex md:grid md:grid-cols-4 lg:grid-cols-7 overflow-x-auto md:overflow-visible no-scrollbar gap-4 pb-4 md:pb-0">
              {/* Each WeatherMetric now has flex-shrink-0 and a min-width for mobile */}
              <WeatherMetric icon={<Droplets />} label="Humidity" value="65%" />
              <WeatherMetric
                icon={<CircleGauge />}
                label="Pressure"
                value="1012 hPa"
              />
              <WeatherMetric
                icon={<CloudRain />}
                label="Rainfall"
                value="0.5 mm"
              />
              <WeatherMetric
                icon={<Thermometer />}
                label="Feels Like"
                value="34 °C"
              />
              <WeatherMetric icon={<Zap />} label="UV Index" value="8 index" />
              <WeatherMetric
                icon={<Compass />}
                label="Wind Dir"
                value="240 °"
              />
              <WeatherMetric icon={<Wind />} label="Wind Spd" value="12 km/h" />
            </div>

            {/* Optional: Small visual cue for mobile swipe */}
            <div className="flex md:hidden justify-center gap-1 mt-1 opacity-40">
              <div className="w-8 h-1 bg-white/30 rounded-full"></div>
              <div className="w-2 h-1 bg-white/10 rounded-full"></div>
            </div>
          </div>

          {/* 3. SCROLLER: Next 6 Days Forecast */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays size={18} className="text-[#A3C475]" />
              <h3 className="text-sm font-black uppercase tracking-widest">
                7-Day Forecast
              </h3>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {weeklyForecast.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-24 md:w-32 p-4 rounded-3xl text-center border transition-all ${
                    idx === 0
                      ? "bg-white text-[#3F865F] border-white shadow-xl"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <p
                    className={`text-[10px] font-black uppercase mb-3 ${
                      idx === 0 ? "text-[#C5A677]" : "opacity-60"
                    }`}
                  >
                    {item.day}
                  </p>
                  <div className="flex justify-center mb-3">
                    {React.cloneElement(item.icon, {
                      size: idx === 0 ? 32 : 24,
                    })}
                  </div>
                  <p className="text-xl font-black tracking-tight">
                    {item.temp}°
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
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
            <button className="bg-[#3F865F] text-white px-4 py-2 md:px-10 md:py-5 rounded-xl md:rounded-[2rem] font-bold md:font-black text-[10px] md:text-lg shadow-lg flex items-center gap-2">
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

export default HomePage;

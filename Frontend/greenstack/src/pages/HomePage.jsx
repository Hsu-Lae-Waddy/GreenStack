<<<<<<< HEAD
import React,{useState} from "react";
import MarketPrice from "./MarketPrice";
=======
import React, {useState} from "react";
>>>>>>> 3236e9c (mmsub_2)
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
import translations from './translations';


const HomePage = () => {

  const [lang, setLang] = useState('mm');
  // Shortcut to access current language strings
  const t = translations[lang];
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
                {t.farmersAdvice}
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

      <MarketPrice/>
      
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

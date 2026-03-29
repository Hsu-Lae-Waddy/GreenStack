
import React ,{ useState,useEffect } from "react";
import MarketPrice from "./MarketPrice";
import { useLanguage } from '../context/LanguageContext'; 

import {
  Droplets,
  Wind,
  Sun,
  MapPin,

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


  const { lang } = useLanguage(); 
  
  const route="http://127.0.0.1:8080"
  const token=localStorage.getItem("token")
  

  // 1. Initialize with an empty array so .map() doesn't fail on first render
const [farmer, setFarmer] = useState({ weeklyForecast: [] });

const userLocation = async (latitude, longitude) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${route}/get7DaysWeather`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ latitude, longitude })
    });

    const data = await response.json();
    
    if (data.response?.forecast) {
      const dynamicForecast = data.response.forecast.map((item, index) => ({
        day: index === 0 ? "Today" : new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: Math.round(item.temp_max).toString(),
        humidity:Math.round(item.humidity).toString(),
        rainFall:(item.rainfall).toString(),
        pressure:item.pressure,
        uv:item.uv_index,
        windDir:item.wind_direction,
        wind_speed:item.wind_speed,
        icon: item.rainfall > 0.1 ? <CloudRain className="text-blue-300" /> : <Sun className="text-[#A3C475]" />
      }));

      setFarmer((prevFarmer) => ({
        ...prevFarmer,
        location: data.response.location.city 
          ? `${data.response.location.city}, ${data.response.location.region}` 
          : prevFarmer.location,
        weeklyForecast: dynamicForecast 
      }));
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};

// 2. Fixed useEffect with empty dependency array
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        userLocation(latitude, longitude);
      },
      (error) => {
        console.error("Location access denied or failed:", error);
        // Fallback: call with default coordinates if user blocks location
        userLocation(16.8661, 96.1951); 
      }
    );
  }
}, []); // <--- CRITICAL: Added empty array here

// 3. Separate effect to log state changes (for debugging only)
useEffect(() => {
  if (farmer.weeklyForecast?.length > 0) {
    console.log("Updated Farmer State:", farmer);
  }
}, [farmer]);

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
    
    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#A3C475] rounded-full blur-[100px] opacity-20"></div>

    {/* 1. TOP HEADER */}
    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-white/10 pb-8">
      <div>
        <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10 mb-3">
          <MapPin size={14} className="text-[#A3C475]" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            {t.weather.location}
          </span>
        </div>
        <div className="flex items-end gap-4">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter">
            31°C
          </h1>
          <div className="mb-2">
            <p className="text-xl md:text-3xl font-black text-[#A3C475]">
              {t.weather.status}
            </p>
            <p className="text-xs opacity-70 font-bold uppercase tracking-wider">
              {t.weather.date}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* 2. GRID: Detailed Metrics */}
    <div className="relative z-10 mb-10">
      <div className="flex md:grid md:grid-cols-4 lg:grid-cols-7 overflow-x-auto md:overflow-visible no-scrollbar gap-4 pb-4 md:pb-0">
        <WeatherMetric icon={<Droplets />} label={t.weather.humidity} value="65%" />
        <WeatherMetric
          icon={<CircleGauge />}
          label={t.weather.pressure}
          value="1012 hPa"
        />
        <WeatherMetric
          icon={<CloudRain />}
          label={t.weather.rainfall}
          value="0.5 mm"
        />
        <WeatherMetric
          icon={<Thermometer />}
          label={t.weather.feelsLike}
          value="34 °C"
        />
        <WeatherMetric 
          icon={<Zap />} 
          label={t.weather.uvIndex} 
          value={`8 ${t.weather.unitIndex}`} 
        />
        <WeatherMetric
          icon={<Compass />}
          label={t.weather.windDir}
          value="240 °"
        />
        <WeatherMetric 
          icon={<Wind />} 
          label={t.weather.windSpd} 
          value={`12 ${t.weather.unitSpeed}`} 
        />
      </div>
    </div>

    {/* 3. SCROLLER: Forecast */}
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays size={18} className="text-[#A3C475]" />
        <h3 className="text-sm font-black uppercase tracking-widest">
          {t.weather.forecastTitle}
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
            <p className={`text-[10px] font-black uppercase mb-3 ${idx === 0 ? "text-[#C5A677]" : "opacity-60"}`}>
              {/* Note: You'll need to translate weeklyForecast days (Mon, Tue) as well */}
              {item.day}
            </p>
            <div className="flex justify-center mb-3">
              {React.cloneElement(item.icon, { size: idx === 0 ? 32 : 24 })}
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
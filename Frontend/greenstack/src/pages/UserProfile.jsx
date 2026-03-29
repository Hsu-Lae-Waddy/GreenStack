import React, { useState,useEffect } from "react";
import {
  User,
  MapPin,
  Phone,
  Calendar,
  Mail,
  Tractor,
  Sprout,
  Award,
  LogOut,
  ChevronRight,
  Camera,
  LayoutList,
  Bot,
  Bookmark,
  Edit2, 
 Briefcase, CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import translations from './translations';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const navigate=useNavigate();
    const [isSelectingRole, setIsSelectingRole] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
  
// Set default language to 'mm' (Myanmar)
  const [lang, setLang] = useState('mm');
// Shortcut to access current language strings
  const t = translations[lang];
  // Farmer Mock Data
  // const farmer = {
  //   name: "U Ba Kyaw",
  //   phone: "09-445566778",
  //   email: "bakyawoffice@gmail.com",
  //   location: "Hmawbi, Yangon",
  //   joined: "January 2023",
  //   landSize: "15 Acres",
  //   mainCrops: ["Paddy", "Beans", "hello", "hello"],
  //   status: "Master Farmer",
  //   avatar: "./src/assets/login_character_1.png", // Replace with your image
  // };

  const [farmer, setFarmer] = useState({
    name: "",
    phone: "",
    email: "bakyawoffice@gmail.com",
    location: "Hmawbi, Yangon",
    joined: "January 2023",
    landSize: "15 Acres",
    mainCrops: ["Paddy", "Beans", "hello", "hello"],
    status: "Master Farmer",
    avatar: "./src/assets/login_character_1.png", 
  });
  const route="http://127.0.0.1:8080"
  const token = localStorage.getItem("token");
  useEffect(() => {
  const fetchUser = async () => {
    
    console.log(token);
    if (!token) return;

    try {
      const response = await fetch(`${route}/profile`, {
        method: "POST", // Note: Fetching profiles is usually a GET request, but keeping POST as per your backend setup
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error("Failed to fetch profile:", response.status);
        return;
      }

      const data = await response.json();
      console.log("Fetched user data:", data.user);

      // Merge the new data with the existing state
      setFarmer((prevFarmer) => ({
        ...prevFarmer, // Keep existing hardcoded fields like email, location, avatar
        name: data.user.username || prevFarmer.name, // Map 'username' to 'name'
        phone: data.user.phone || prevFarmer.phone,
        // You can also format the date if you want to replace 'joined'
        joined: new Date(data.user.created_at).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric'
        })
      }));

    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  fetchUser();
}, []);

    const [location, setLocation] = useState({ lat: null, lon: null });
    const [locationError, setLocationError] = useState(null);

    const userLocation=async (latitude,longitude)=>{
          const response = await fetch(`${route}/get7DaysWeather`, {
          method: "POST", // Note: Fetching profiles is usually a GET request, but keeping POST as per your backend setup
           headers: {
      "Content-Type": "application/json",
      // ADD THIS LINE:
      "Authorization": `Bearer ${token}` 
    },
          body: JSON.stringify({
            latitude, longitude
          })
          });
          const data = await response.json();
          // console.log()
          setFarmer((prevFarmer) => ({
        ...prevFarmer, // Keep existing hardcoded fields like email, location, avatar
      location: `${data.response.location.city},${data.response.location.region}` 
        
      }));
    console.log("Weather Data:", data.response);
    }

const SelectedRole=async(selectedRole)=>{
  setSelectedRole(selectedRole);
  if (!token) return;

  const response = await fetch("http://127.0.0.1:8080/get-user-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // ADD THIS LINE:
      "Authorization": `Bearer ${token}` 
    },
    // If you send it in the header, you don't strictly need it in the body,
    // but keeping it doesn't hurt.
    body: JSON.stringify({ token }) 
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("userRole", data.role);
  }
}
useEffect( () => {
  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          userLocation(latitude,longitude)
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setLocationError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation not supported in this browser");
      setLocationError("Geolocation not supported");
    }
  }, []);


  return (
    <div className="min-h-screen bg-white pb-32 md:pb-12">
      {/* 1. DESKTOP NAVBAR (Consistent with your project) */}
      <Navbar name="Profile" />

      {/* 2. PROFILE HERO SECTION */}
      <header className="relative bg-white pt-12 pb-24 md:pt-16 md:pb-28 overflow-hidden">
        {/* 1. LAYERED BACKGROUND */}
        <div className="absolute inset-0 bg-[#3F865F] rounded-b-[60px] md:rounded-b-[100px] z-0 shadow-2xl">
          {/* Subtle Pattern Overlay (Nature/Dots) */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(#A3C475 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          ></div>

          {/* Soft Glowing Accents */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#A3C475]/30 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 -right-20 w-64 h-64 bg-[#C5A677]/20 rounded-full blur-[80px]"></div>
        </div>

        {/* 2. HEADER CONTENT */}
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
            {/* Profile & Identity */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                {/* Circular Profile with Earthy Ring */}
                <div className="w-32 h-32 md:w-44 md:h-44 bg-white p-1.5 rounded-full shadow-2xl border-4 border-[#C5A677]/30 ring-8 ring-white/10">
                  <img
                    src={farmer.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full bg-[#FDFEFA] scale-110"
                  />
                </div>
                {/* Edit Button */}
                <button className="absolute bottom-2 right-2 bg-white p-2.5 rounded-full text-[#3F865F] shadow-xl hover:scale-110 transition-transform border border-gray-100">
                  <Camera size={18} />
                </button>
              </div>

              {/* Farmer Name & Status */}
              <div className="text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
                    {farmer.name}
                  </h1>
                  <span className="bg-[#A3C475] text-[#3F865F] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-black/10">
                    Gold Farmer
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/70 font-bold text-sm">
                  <span className="flex items-center gap-1.5 italic">
                    <MapPin size={16} className="text-[#A3C475]" />{" "}
                    {farmer.location}
                  </span>
                  <span className="hidden md:block text-white/30">|</span>
                  <span className="flex items-center gap-1.5 italic">
                    <Phone size={16} className="text-[#A3C475]" />{" "}
                    {farmer.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Dashboard Badges (Inside Header) */}
            <div className="flex gap-4 md:mb-2">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl text-center min-w-[90px] shadow-lg">
                <p className="text-[10px] text-[#A3C475] font-black uppercase tracking-[0.2em] mb-1">
                  {t.crops}
                </p>
                <p className="text-xl font-black text-white">08</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl text-center min-w-[90px] shadow-lg">
                <p className="text-[10px] text-[#A3C475] font-black uppercase tracking-[0.2em] mb-1">
                  {t.posts}
                </p>
                <p className="text-xl font-black text-white">142</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. PROFILE CONTENT */}
      <main className="max-w-5xl mx-auto px-6 pt-16 md:pt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar: Quick Info */}
        <div className="space-y-6">
          <div className="md:hidden mb-6">
            <h1 className="text-3xl font-black text-[#3F865F] tracking-tight">
              {farmer.name}
            </h1>
            <p className="text-[#C5A677] font-bold text-sm flex items-center gap-1 italic">
              <Award size={16} /> {farmer.status}
            </p>
          </div>

          {/* Farmer Badge Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-[#A3C475]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="text-[#3F865F]" size={32} />
            </div>
            <h3 className="text-[#3F865F] font-black uppercase text-xs tracking-widest mb-1">
              {t.rank}
            </h3>
            <p className="text-xl font-black text-[#C5A677]">{farmer.status}</p>
            <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#3F865F] w-[80%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-gray-400 font-bold mt-2">
              80% to next level
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-[#3F865F] font-black text-sm uppercase tracking-widest border-b border-gray-50 pb-2">
              {t.contactInfo}
            </h3>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
              <Phone size={18} className="text-[#C5A677]" /> {farmer.phone}
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
              <Mail size={18} className="text-[#C5A677]" /> {farmer.email}
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
              <Calendar size={18} className="text-[#C5A677]" /> Joined{" "}
              {farmer.joined}
            </div>
          </div>
        </div>

        {/* Right Section: Tabs & Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatBox
              icon={<Tractor size={20} />}
              label={t.landSize}
              value={farmer.landSize}
            />
            {/* <StatBox
              icon={<Sprout size={20} />}
              label={t.mainCrops}
              value={farmer.mainCrops.join(", ")}
            /> */}
            <StatBox
              icon={<LayoutList size={20} />}
              label={t.marketPosts}
              value="24"
            />
          </div>

          {/* Action Buttons */}
          <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-20">
      {/* ... other code ... */}

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-[#3F865F] font-black text-lg mb-4 italic">{t.Actions}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionButton icon={<Edit2 size={18} />} label={t.editProfile} />
          <ActionButton icon={<LayoutList size={18} />} label={t.myMarketListings} />

          {/* 2. LOGIC FOR THE SAVED ROLE BUTTON */}
          {!selectedRole ? (
            // IF NO ROLE IS CHOSEN YET
            !isSelectingRole ? (
              // STEP 1: SHOW ORIGINAL BUTTON
              <button 
                onClick={() => setIsSelectingRole(true)}
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 border-l-4 border-l-[#A3C475] bg-[#F9FBF7] text-[#3F865F] hover:shadow-md transition-all active:scale-95"
              >
                <div className="flex items-center gap-3 font-bold text-sm">
                  <Bookmark size={18} /> {t.savedRole}
                </div>
                <ChevronRight size={18} opacity={0.5} />
              </button>
            ) : (
              // STEP 2: SHOW SELECTION OPTIONS (Farmer or Broker)
              <div className="flex gap-2 p-1 bg-[#F9FBF7] rounded-2xl border-2 border-dashed border-[#A3C475] animate-in fade-in zoom-in duration-300">
                <button 
                  onClick={() => SelectedRole('Farmer')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-xl text-xs font-black text-[#3F865F] hover:bg-[#3F865F] hover:text-white transition-all shadow-sm"
                >
                  <User size={14} /> {t.farmer}
                </button>
                <button 
                  onClick={() => SelectedRole('Broker')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-xl text-xs font-black text-[#3F865F] hover:bg-[#3F865F] hover:text-white transition-all shadow-sm"
                >
                  <Briefcase size={14} /> {t.broker}
                </button>
              </div>
            )
          ) : (
            // STEP 3: SHOW SAVED STATE & DISABLE BUTTON
            <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 opacity-80 cursor-not-allowed">
              <div className="flex items-center gap-3 font-bold text-sm text-[#3F865F] italic">
                <CheckCircle2 size={18} /> {t.roleSaved}: <span className="text-[#C5A677]">{selectedRole}</span>
              </div>
              <span className="text-[10px] font-black uppercase text-gray-300 tracking-widest italic">Locked</span>
            </div>
          )}

          <ActionButton icon={<LogOut size={18} 
          onClick={() => {
          localStorage.removeItem("token");
          // Also clear other user data if you have any
          localStorage.removeItem("userRole"); 
          navigate('/');
        }} />} 
          label={t.logout} danger />
        </div>
      </div>
      
      {/* ... other code ... */}
    </div>
        </div>
      </main>

      {/* 4. MOBILE FLOATING NOTCH NAVBAR (Persistent) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full px-4 pb-4 z-50">
        <div className="relative bg-white h-20 rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] flex items-center justify-around px-2 border border-gray-100">
          <NavIcon icon={<LayoutList />} />
          <NavIcon icon={<Sprout />} />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 bg-[#FDFEFA] rounded-full flex items-center justify-center">
              <button className="w-16 h-16 bg-[#3F865F] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#3F865F]/40 border-4 border-white">
                <Bot size={32} />
              </button>
            </div>
          </div>
          <div className="w-16 h-1"></div>
          <NavIcon icon={<Bookmark />} />
          <NavIcon icon={<User />} active />
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatBox = ({ icon, label, value }) => (
  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
    <div className="text-[#3F865F] mb-2">{icon}</div>
    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">
      {label}
    </p>
    <p className="text-sm font-black text-[#3F865F]">{value}</p>
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

const ActionButton = ({ icon, label, danger = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
      danger 
      ? 'border-red-50 border-l-4 border-l-red-500 bg-red-50/30 text-red-600' 
      : 'border-gray-50 border-l-4 border-l-[#A3C475] bg-[#F9FBF7] text-[#3F865F] hover:shadow-md'
    }`}
  >
    <div className="flex items-center gap-3 font-bold text-sm">
      {icon} {label}
    </div>
    <ChevronRight size={18} opacity={0.5} />
  </button>
);

export default UserProfile;

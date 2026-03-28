import React from 'react';
import {
  Cloud, Droplets, Wind, Sun,
  TrendingUp, Leaf, MessageSquare, User,
  MessageCircle, Search, MapPin, ChevronRight,
  LayoutGrid, Bookmark, Settings, Sprout,Bot, LayoutList
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#FDFEFA] font-sans pb-32 md:pb-12">

      {/* 1. DESKTOP GLASS NAVBAR */}
     <nav className="hidden md:flex sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-4 justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#3F865F] p-2 rounded-lg">
            <Sprout className="text-white" size={24} />
          </div>
          <span className="text-xl font-black text-[#3F865F]">GreenStack</span>
        </div>

        <div className="flex gap-8 font-bold text-[#3F865F]/70">
          <a href="#" className="hover:text-[#3F865F] transition-colors">Market Price</a>
          <a href="#" className="hover:text-[#3F865F] transition-colors">Crop Recommendation</a>
          <a href="#" className="hover:text-[#3F865F] transition-colors">Feedback</a>
        </div>

        <div className="flex items-center gap-4">
            <button className="p-2 bg-[#A3C475]/20 rounded-full text-[#3F865F]"><Bot size={20}/></button>
            <button className="flex items-center gap-2 bg-[#C5A677] text-white px-5 py-2 rounded-full font-bold shadow-md">
                <User size={18}/>
                Profile
            </button>
        </div>
      </nav>

      {/* 2. DYNAMIC WEATHER HEADER */}
      <header className="p-6 md:px-20 pt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Main Weather Card */}
          <div className="md:col-span-2 bg-[#3F865F] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-[#3F865F]/30">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Sun size={180} strokeWidth={1} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/10 mb-6">
                <MapPin size={16} className="text-[#A3C475]" />
                <span className="text-sm font-bold tracking-wide uppercase">Yangon, Myanmar</span>
              </div>

              <div className="flex items-end gap-4 mb-2">
                <h1 className="text-8xl font-black tracking-tighter leading-none">31°</h1>
                <div className="mb-2">
                  <p className="text-2xl font-bold text-[#A3C475]">Partly Cloudy</p>
                  <p className="opacity-70 font-medium italic text-sm">Best time for watering crops today</p>
                </div>
              </div>

              <div className="mt-8 flex gap-8">
                <div className="flex items-center gap-2">
                  <Droplets className="text-[#A3C475]" size={20} />
                  <span className="font-bold">65% <small className="opacity-60 font-medium">Humid</small></span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="text-[#A3C475]" size={20} />
                  <span className="font-bold">14 <small className="opacity-60 font-medium">km/h</small></span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info / Small Stats */}
          <div className="bg-[#A3C475]/20 border-2 border-[#A3C475]/30 rounded-[2.5rem] p-8 flex flex-col justify-center">
            <h3 className="text-[#3F865F] font-black text-xl mb-4">Market Pulse</h3>
            <div className="space-y-4">
               <MarketRow label="Rice" price="+2.4%" color="#3F865F" />
               <MarketRow label="Corn" price="-0.8%" color="#C5A677" />
               <MarketRow label="Onion" price="+1.5%" color="#3F865F" />
            </div>
            <button className="mt-8 w-full py-3 bg-white text-[#3F865F] font-bold rounded-2xl shadow-sm hover:shadow-md transition-all">View Market</button>
          </div>

        </div>
      </header>

      {/* 3. CHARACTER ADVERTISEMENT (Overlapping Design) */}
      <section className="p-6 md:px-20 mt-8">
        <div className="max-w-6xl mx-auto relative">
          <div className="bg-[#C5A677] rounded-[3rem] p-10 md:p-20 text-white flex flex-col md:flex-row items-center overflow-hidden">

            <div className="w-full md:w-3/5 relative z-10 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
                Grow Smarter, <br/>
                <span className="text-[#3F865F]">Harvest Better.</span>
              </h2>
              <p className="text-lg opacity-90 max-w-md font-medium mb-10 leading-relaxed">
                Join our community of modern farmers using AI to predict crop yields and stay ahead of the market.
              </p>
              <button className="bg-white text-[#C5A677] px-10 py-5 rounded-3xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all">
                Get Started Free
              </button>
            </div>

            {/* Character Image Overlap */}
            <div className="w-full md:w-2/5 flex justify-center md:justify-end mt-12 md:mt-0 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#3F865F] rounded-full blur-[80px] opacity-40"></div>
               <img
                src="./src/assets/home_character_1.png"
                alt="Farmer"
                className="w-72 md:w-96 h-auto drop-shadow-[0_25px_25px_rgba(0,0,0,0.2)] md:-mb-24 scale-110 md:scale-125 z-20"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 4. MOBILE FLOATING NOTCH NAVBAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full px-4 pb-4 z-50">
        <div className="relative bg-white h-20 rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-center justify-around px-2 border border-gray-100">

            {/* Left Icons */}
            <NavIcon icon={<LayoutList />} active />
            <NavIcon icon={<Sprout />} />

            {/* Middle "Floating Notch" Button */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                {/* The "Cutout" background trick */}
                <div className="w-20 h-20 bg-[#F9FBF7] rounded-full flex items-center justify-center">
                    <button className="w-16 h-16 bg-[#3F865F] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#3F865F]/40 border-4 border-white active:scale-90 transition-transform">
                        <Bot size={32} />
                    </button>
                </div>
            </div>

            {/* Placeholder to create space for the middle button */}
            <div className="w-16 h-1"></div>

            {/* Right Icons */}
            <NavIcon icon={<Bookmark />} />
            <NavIcon icon={<User />} />
        </div>
      </div>

    </div>
  );
};

// Helper Components
const MarketRow = ({ label, price, color }) => (
  <div className="flex justify-between items-center py-2 border-b border-[#A3C475]/20 last:border-0">
    <span className="font-bold text-[#3F865F]">{label}</span>
    <span className="font-black" style={{ color: color }}>{price}</span>
  </div>
);

const NavIcon = ({ icon }) => (
  <button className="p-3 text-gray-300 hover:text-[#3F865F] transition-all rounded-full hover:bg-[#A3C475]/10">
    {React.cloneElement(icon, { size: 26, strokeWidth: 2.5 })}
  </button>
);

export default HomePage;
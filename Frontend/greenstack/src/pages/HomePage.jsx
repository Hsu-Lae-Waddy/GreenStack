import React from 'react';
import {
  Droplets, Wind, Sun, User, MapPin, ChevronRight,
  Bookmark, Sprout, Bot, LayoutList, Mail, Phone, Heart
} from 'lucide-react';

import Navbar from '../components/Navbar'
import MobileNavbar from '../components/MobileNavbar'

const HomePage = () => {
  return (
    /* Increased bottom padding (pb-40) for mobile to accommodate the floating navbar */
    <div className="min-h-screen bg-[#FDFEFA] font-sans pb-40 md:pb-0">

      {/* 1. DESKTOP NAVBAR */}
      <nav className="hidden md:flex sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-12 py-4 justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#3F865F] p-2 rounded-xl rotate-3">
            <Sprout className="text-[#A3C475]" size={24} />
          </div>
          <span className="text-xl font-black text-[#3F865F] tracking-tight">GreenStack</span>
        </div>
        <div className="flex gap-10 font-bold text-sm uppercase tracking-widest text-[#3F865F]/60">
          <a href="#" className="hover:text-[#3F865F] transition-colors">Market Price</a>
          <a href="#" className="hover:text-[#3F865F] transition-colors">Crop Tips</a>
          <a href="#" className="hover:text-[#3F865F] transition-colors">Feedback</a>
        </div>
        <div className="flex items-center gap-4">
            <button className="p-2 bg-[#A3C475]/20 rounded-full text-[#3F865F] hover:scale-110 transition-transform"><Bot size={22}/></button>
            <button className="flex items-center gap-2 bg-[#C5A677] text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-[#C5A677]/30">
                <User size={18}/> Profile
            </button>
        </div>
      </nav>
      <Navbar name='Home'/>

      {/* 2. WEATHER SECTION */}
      <section className="px-5 pt-8 md:px-20 md:pt-12 max-w-7xl mx-auto">
        <div className="bg-[#3F865F] rounded-[2rem] p-6 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-[#3F865F]/20">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#A3C475] rounded-full blur-[80px] opacity-30"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 opacity-80 mb-1">
                <MapPin size={14} />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Hmawbi, Yangon</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter">31°C</h1>
              <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
                <WeatherPill icon={<Droplets size={14}/>} label="65%" />
                <WeatherPill icon={<Wind size={14}/>} label="12km" />
              </div>
            </div>
            <div className="text-right">
                <Sun size={48} className="text-[#A3C475] mb-2 ml-auto md:w-20 md:h-20" />
                <p className="font-bold text-lg md:text-2xl">Sunny</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ADVERTISEMENT SECTION */}
      <section className="px-5 py-6 md:px-20 max-w-7xl mx-auto">
        <div className="bg-[#C5A677] rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 text-white relative flex flex-row items-center justify-between overflow-hidden shadow-xl min-h-[180px] md:min-h-[400px]">
          <div className="w-[60%] md:w-1/2 z-20">
            <h2 className="text-xl md:text-5xl font-black leading-tight mb-3 md:mb-6">Grow Smarter <br className="hidden md:block"/> <span className="text-[#3F865F]">Together</span></h2>
            <p className="text-[10px] md:text-lg font-medium opacity-90 mb-4 md:mb-10 max-w-[200px] md:max-w-sm">Daily expert tips for your specific local crops.</p>
            <button className="bg-[#3F865F] text-white px-4 py-2 md:px-10 md:py-5 rounded-xl md:rounded-[2rem] font-bold md:font-black text-[10px] md:text-lg shadow-lg flex items-center gap-2">Start Now <ChevronRight size={14} /></button>
          </div>
          <div className="w-[35%] md:w-1/2 flex justify-end items-end relative h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl"></div>
            <img src="./src/assets/home_character_1.png" alt="Farmer" className="w-28 sm:w-36 md:w-80 h-auto z-10 drop-shadow-2xl translate-y-2 md:translate-y-8" />
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
                <span className="text-xl font-black text-[#3F865F]">GreenStack</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Empowering Myanmar farmers with digital tools for a sustainable and prosperous future.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-[#3F865F] font-bold mb-4 uppercase text-xs tracking-widest">Services</h4>
              <ul className="space-y-3 text-sm font-semibold text-gray-400">
                <li className="hover:text-[#C5A677] cursor-pointer transition-colors">Market Prices</li>
                <li className="hover:text-[#C5A677] cursor-pointer transition-colors">Crop Diagnosis</li>
                <li className="hover:text-[#C5A677] cursor-pointer transition-colors">Weather Alerts</li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="text-center md:text-left">
              <h4 className="text-[#3F865F] font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
              <div className="space-y-3 text-sm font-semibold text-gray-400">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail size={16} className="text-[#A3C475]" /> <span>info@greenstack.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone size={16} className="text-[#A3C475]" /> <span>+95 9 123 456 789</span>
                </div>
              </div>
            </div>

            {/* Column 4: Socials */}
            <div className="text-center md:text-left">
              <h4 className="text-[#3F865F] font-bold mb-4 uppercase text-xs tracking-widest">Follow Us</h4>
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
              Made with <Heart size={12} className="text-red-400 fill-red-400" /> by GreenStack Team
            </div>
          </div>
        </div>
      </footer>

      {/* 5. MOBILE FLOATING NOTCH NAVBAR (Fixed Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full px-4 pb-4 z-50">
        <div className="relative bg-white h-20 rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] flex items-center justify-around px-2 border border-gray-100">
            <NavIcon icon={<LayoutList />} active />
            <NavIcon icon={<Sprout />} />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 bg-[#FDFEFA] rounded-full flex items-center justify-center">
                    <button className="w-16 h-16 bg-[#3F865F] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#3F865F]/40 border-4 border-white active:scale-90 transition-transform">
                        <Bot size={32} />
                    </button>
                </div>
            </div>
            <div className="w-16 h-1"></div>
            <NavIcon icon={<Bookmark />} />
            <NavIcon icon={<User />} />
        </div>
      </div>

      <MobileNavbar/>

    </div>
  );
};

// Helper components
const WeatherPill = ({ icon, label }) => (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[10px] md:text-sm font-bold shrink-0">{icon} {label}</div>
);

const NavIcon = ({ icon, active = false }) => (
    <button className={`p-3 rounded-2xl transition-all ${active ? 'text-[#3F865F]' : 'text-gray-300 hover:text-[#C5A677]'}`}>{React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}</button>
);

const SocialIcon = ({ icon, color }) => (
  <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 transition-all hover:bg-white hover:shadow-md" style={{ color: color }}>
    {React.cloneElement(icon, { size: 18 })}
  </button>
);

export default HomePage;
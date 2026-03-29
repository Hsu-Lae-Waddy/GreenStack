import React, { useState } from 'react';

import {
  Droplets, Wind, Sun, User, MapPin, ChevronRight,
  Bookmark, Sprout, Bot, LayoutList, Mail, Phone, Heart,
} from 'lucide-react';
const NavIcon = ({ icon, active = false }) => (
    <button className={`p-3 rounded-2xl transition-all ${active ? 'text-[#3F865F]' : 'text-gray-300 hover:text-[#C5A677]'}`}>{React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}</button>
);
const   MobileNavbar = () => {
  return (

      <div className="md:hidden fixed bottom-0 left-0 w-full px-4 pb-4 z-50">
        <div className="relative bg-white h-20 rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] flex items-center justify-around px-2 border border-gray-100">
            <NavIcon icon={<LayoutList />} active />
            <NavIcon icon={<Sprout />} />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
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

  );
};



export default MobileNavbar;

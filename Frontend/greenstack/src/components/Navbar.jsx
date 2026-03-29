import React, { useState } from 'react';
import { Sprout, Bot, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
  // 1. Create a state to track the active link
  const [active, setActive] = useState(props.name);

  // Define your links in an array to make the code cleaner
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Market Price', href: 'marketPrice' },
    { name: 'Crop Tips', href: '' },
    { name: 'Feedback', href: '#' },
  ];
  const navigate = useNavigate();
  return (
    <nav className="hidden md:flex sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-12 py-4 justify-between items-center shadow-sm">

      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-[#3F865F] p-2 rounded-xl rotate-3">
          <Sprout className="text-[#A3C475]" size={24} />
        </div>
        <span className="text-xl font-black text-[#3F865F] tracking-tight">GreenStack</span>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-10 font-bold text-sm uppercase tracking-widest">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setActive(link.name)} // Update state on click
            className={`transition-all duration-300 relative pb-1 ${
              active === link.name
                ? 'text-[#3F865F]' // Active Color
                : 'text-[#3F865F]/60 hover:text-[#3F865F]' // Inactive/Hover Color
            }`}
          >
            {link.name}
            {/* Active Indicator Line (Optional) */}
            {active === link.name && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3F865F] rounded-full"></span>
            )}
          </a>
        ))}
      </div>

      {/* Icon Buttons */}
      <div className="flex items-center gap-4">
        {/* Chatbot Button */}
        <button
          onClick={() => setActive('Chatbot')}
          className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
            active === 'Chatbot'
              ? 'bg-[#3F865F] text-white' // Active style
              : 'bg-[#A3C475]/20 text-[#3F865F]' // Inactive style
          }`}
        >
          <Bot size={22}/>
        </button>

        {/* Profile Button */}
        <button
          onClick={() => {navigate('/profile'); setActive('Profile');}}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold shadow-lg transition-all duration-300 ${
            active === 'Profile'
              ? 'bg-[#3F865F] text-white shadow-[#3F865F]/30' // Active style (Deep Green)
              : 'bg-[#C5A677] text-white shadow-[#C5A677]/30' // Inactive style (Brown)
          }`}
        >
          <User size={18}/>
          Profile
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
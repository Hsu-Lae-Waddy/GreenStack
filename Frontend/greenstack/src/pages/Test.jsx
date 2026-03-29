import React, { useState } from 'react';
import { Sprout, Bot, User, X, Send, UserCircle, MessageSquare } from 'lucide-react';

const Navbar = (props) => {
  const [active, setActive] = useState(props.name);
  // 1. New state for Chatbot Sidebar
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Market Price', href: '#' },
    { name: 'Crop Tips', href: '#' },
    { name: 'Feedback', href: '#' },
  ];

  return (
    <>
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
              onClick={() => setActive(link.name)}
              className={`transition-all duration-300 relative pb-1 ${
                active === link.name ? 'text-[#3F865F]' : 'text-[#3F865F]/60 hover:text-[#3F865F]'
              }`}
            >
              {link.name}
              {active === link.name && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3F865F] rounded-full"></span>
              )}
            </a>
          ))}
        </div>

        {/* Icon Buttons */}
        <div className="flex items-center gap-4">
          {/* Chatbot Button -> Opens the slide UI */}
          <button
            onClick={() => {
              setActive('Chatbot');
              setIsChatOpen(true);
            }}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              isChatOpen ? 'bg-[#3F865F] text-white shadow-lg' : 'bg-[#A3C475]/20 text-[#3F865F]'
            }`}
          >
            <Bot size={22}/>
          </button>

          {/* Profile Button */}
          <button
            onClick={() => setActive('Profile')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold shadow-lg transition-all duration-300 ${
              active === 'Profile' ? 'bg-[#3F865F] text-white' : 'bg-[#C5A677] text-white'
            }`}
          >
            <User size={18}/> Profile
          </button>
        </div>
      </nav>

      {/* 2. SLIDE-IN CHATBOT UI */}
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isChatOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsChatOpen(false)}
      />

      {/* Chat Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Chat Header */}
        <div className="bg-[#3F865F] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#A3C475] p-2 rounded-xl">
              <Bot size={24} className="text-[#3F865F]" />
            </div>
            <div>
              <h3 className="font-black text-lg leading-none">Green Assistant</h3>
              <p className="text-[10px] uppercase font-bold text-[#A3C475] tracking-widest mt-1">Online & Ready to Help</p>
            </div>
          </div>
          <button onClick={() => setIsChatOpen(false)} className="hover:rotate-90 transition-transform duration-300">
            <X size={24} />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="h-[calc(100vh-180px)] overflow-y-auto p-6 space-y-6 bg-[#FDFEFA]">
          {/* Bot Message */}
          <div className="flex gap-3 max-w-[85%]">
            <div className="w-8 h-8 rounded-lg bg-[#A3C475]/20 flex items-center justify-center shrink-0">
               <Bot size={18} className="text-[#3F865F]" />
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <p className="text-sm font-medium text-gray-700">Hello U Ba Kyaw! How can I help with your crops today?</p>
              <span className="text-[9px] font-bold text-gray-400 mt-2 block uppercase">10:00 AM</span>
            </div>
          </div>

          {/* User Message */}
          <div className="flex flex-row-reverse gap-3 max-w-[85%] ml-auto">
             <div className="w-8 h-8 rounded-lg bg-[#C5A677] flex items-center justify-center shrink-0">
               <UserCircle size={18} className="text-white" />
            </div>
            <div className="bg-[#3F865F] p-4 rounded-2xl rounded-tr-none shadow-md">
              <p className="text-sm font-medium text-white">What is the market price for Paddy today?</p>
              <span className="text-[9px] font-bold text-white/50 mt-2 block uppercase text-right">10:02 AM</span>
            </div>
          </div>
        </div>

        {/* Chat Input Area */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              className="w-full bg-[#F9FBF7] border-2 border-gray-100 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:border-[#3F865F] transition-all font-medium text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#3F865F] text-white p-2.5 rounded-xl shadow-lg shadow-[#3F865F]/20 hover:scale-110 active:scale-95 transition-all">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;  
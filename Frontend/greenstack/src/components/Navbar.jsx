import React, { useState } from 'react';
import { 
  Sprout, Bot, User, X, Send, UserCircle, 
  LayoutList, Bookmark, ChevronRight 
} from 'lucide-react';

const Navbar = (props) => {
  const [active, setActive] = useState(props.name || 'Home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navLinks = [
    { name: 'Home', icon: <Sprout size={24}/>, href: '#' },
    { name: 'Market Price', icon: <LayoutList size={24}/>, href: '#' },
    { name: 'Crop Tips', icon: <Sprout size={24}/>, href: '#' },
    { name: 'Feedback', icon: <Bookmark size={18}/>, href: '#' },
  ];

  return (
    <>
      {/* 1. DESKTOP NAVBAR (Unchanged as requested) */}
      <nav className="hidden md:flex sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-12 py-4 justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#3F865F] p-2 rounded-xl rotate-3">
            <Sprout className="text-[#A3C475]" size={24} />
          </div>
          <span className="text-xl font-black text-[#3F865F] tracking-tight">GreenStack</span>
        </div>

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

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsChatOpen(true)}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              isChatOpen ? 'bg-[#3F865F] text-white shadow-lg' : 'bg-[#A3C475]/20 text-[#3F865F]'
            }`}
          >
            <Bot size={22}/>
          </button>
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

      {/* 2. MOBILE FLOATING NOTCH NAVBAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full px-4 pb-4 z-[55]">
        <div className="relative bg-white h-20 rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] flex items-center justify-around px-2 border border-gray-100">
            
            {/* Left Side Icons */}
            <MobileNavItem 
                icon={<LayoutList size={28}/>} 
                active={active === 'Market Price'} 
                onClick={() => setActive('Market Price')} 
            />
            <MobileNavItem 
                icon={<Sprout size={28}/>} 
                active={active === 'Home'} 
                onClick={() => setActive('Home')} 
            />

            {/* Central Notch Bot Button */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 bg-[#FDFEFA] rounded-full flex items-center justify-center">
                    <button 
                        onClick={() => setIsChatOpen(true)}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white active:scale-90 transition-all ${
                            isChatOpen ? 'bg-[#C5A677]' : 'bg-[#3F865F] shadow-[#3F865F]/40'
                        }`}
                    >
                        <Bot size={32} />
                    </button>
                </div>
            </div>

            {/* Empty space for the notch */}
            <div className="w-16 h-1"></div>

            {/* Right Side Icons */}
            <MobileNavItem 
                icon={<Bookmark size={28}/>} 
                active={active === 'Feedback'} 
                onClick={() => setActive('Feedback')} 
            />
            <MobileNavItem 
                icon={<User size={28}/>} 
                active={active === 'Profile'} 
                onClick={() => setActive('Profile')} 
            />
        </div>
      </div>

      {/* 3. SLIDE-IN CHATBOT UI (Accessible from both Navbars) */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isChatOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsChatOpen(false)}
      />

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Chat Header */}
        <div className="bg-[#3F865F] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#A3C475] p-2 rounded-xl">
              <Bot size={24} className="text-[#3F865F]" />
            </div>
            <div>
              <h3 className="font-black text-lg leading-none">Green Assistant</h3>
              <p className="text-[10px] uppercase font-bold text-[#A3C475] tracking-widest mt-1">Ready to Help</p>
            </div>
          </div>
          <button onClick={() => setIsChatOpen(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20">
            <X size={20} />
          </button>
        </div>

        {/* Message Content (Placeholder) */}
        <div className="h-[calc(100vh-180px)] overflow-y-auto p-6 bg-[#FDFEFA] space-y-4">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                <p className="text-sm font-medium text-gray-700">Hello! I am your AI assistant. Ask me about Paddy prices or crop health.</p>
            </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100 flex gap-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-grow bg-[#F9FBF7] border-2 border-gray-100 rounded-2xl py-3 px-4 focus:outline-none focus:border-[#3F865F] text-sm"
          />
          <button className="bg-[#3F865F] text-white p-3 rounded-2xl shadow-lg">
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

// Sub-component for Mobile Icons to keep code clean
const MobileNavItem = ({ icon, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center ${
            active ? 'text-[#3F865F] scale-110' : 'text-gray-300'
        }`}
    >
        {React.cloneElement(icon, { strokeWidth: 2.5 })}
        {active && <div className="w-1.5 h-1.5 bg-[#3F865F] rounded-full mt-1"></div>}
    </button>
);

export default Navbar;
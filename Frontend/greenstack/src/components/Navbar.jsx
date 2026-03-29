import React, { useState,useEffect } from 'react';
import { 
  Sprout, Bot, User, X, Send, 
  LayoutList, Bookmark, CheckCircle2 
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const navigate=useNavigate()
  const [active, setActive] = useState(props.name || 'landing');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // New States for Crop Tips
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [selectedSoil, setSelectedSoil] = useState(null);
  const [tipsResponse, setTipsResponse] = useState(null);


  const [messages, setMessages] = useState([]);
const [question, setQuestion] = useState("");
  const askQuestion=async()=>{
    if (!question) return;

  // Add user message first
  setMessages(prev => [...prev, { type: "user", text: question }]);

  const res = await fetch('http://127.0.0.1:8080/chatBot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question })
  });

  const response = await res.json();
  console.log(response.reply)
  if (response.reply) {
    // Add bot reply
    setMessages(prev => [
      ...prev,
      { type: "bot", text: response.reply }
    ]);
  } else if (response.error) {
    console.error("Backend Error:", response.error);
  }

  setQuestion(""); // clear input
  }

  const soilTypes = ['ရွှံ့မြေ', 'မြေနီ', 'သဲမြေ', 'နှုံးမြေ'];
  
  const agriProducts = {
  // Grains & Cereals
  rice: "ဆန် / စပါး",
  maize: "ပြောင်းဖူး",
  blackgram: "မတ်ပဲ",
  mungBean: "ပဲတီစိမ်း",
  pigeonpeas: "ပဲစင်းငုံ",
  chickpea: "ကုလားပဲ",
  lentil: "ပဲနီလေး",
  kidneyBeans: "ပဲနီ",
  mothBeans: "ပဲလွန်း",
  pomegranate: "သလဲသီး",
  banana: "ငှက်ပျောသီး",
  mango: "သရက်သီး",
  grapes: "စပျစ်သီး",
  watermelon: "ဖရဲသီး",
  muskmelon: "သခွားမွှေး",
  apple: "ပန်းသီး",
  orange: "လိမ္မော်သီး",
  papaya: "သင်္ဘောသီး",
  coconut: "အုန်းသီး",
  cotton: "ဝါ",
  jute: "ဂုန်လျှော်",
  coffee: "ကော်ဖီ"
};

  const [location,setLocation]=useState({});
  const handleSendSoil = async() => {
    if (selectedSoil) {
      const response=await fetch("http://127.0.0.1:8080/cropRecommendation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ soilType: selectedSoil, lat:location.lat, lon:location.lng })
      });
      const data = await response.json();
      console.log(data.result)
      setTipsResponse(data.result);
    }
  };
  
  useEffect( () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // 2. Or update a state if you need to show coordinates on UI
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Location access denied:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
},[]);

  const closeSidebars = () => {
    setIsChatOpen(false);
    setIsTipsOpen(false);
    setTipsResponse(null);
    setSelectedSoil(null);
  };

  return (
    <>
      {/* 1. DESKTOP NAVBAR */}
      <nav className="hidden md:flex sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-12 py-4 justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#3F865F] p-2 rounded-xl rotate-3">
            <Sprout className="text-[#A3C475]" size={24} />
          </div>
          <span className="text-xl font-black text-[#3F865F] tracking-tight">GreenStack</span>
        </div>

        <div className="flex gap-10 font-bold text-sm uppercase tracking-widest">
          <a href="#" onClick={() => {navigate('/home'); setActive('Home')}} className={`relative pb-1 transition-all ${active === 'Home' ? 'text-[#3F865F]' : 'text-[#3F865F]/60'}`}>Home</a>
          <a href="#" onClick={() => {navigate('#marketPrice'); setActive('Market Price')}} className={`relative pb-1 transition-all ${active === 'Market Price' ? 'text-[#3F865F]' : 'text-[#3F865F]/60'}`}>Market Price</a>
          
          {/* CROP TIPS TRIGGER */}
          <button onClick={() => { setActive('Crop Tips'); setIsTipsOpen(true); }} className={`relative pb-1 transition-all uppercase font-bold text-sm tracking-widest ${active === 'Crop Tips' ? 'text-[#3F865F]' : 'text-[#3F865F]/60'}`}>
            Crop Tips
            {active === 'Crop Tips' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3F865F] rounded-full"></span>}
          </button>
          
        
        </div>

        <div className="flex items-center gap-4">
{/* 
          <button
            onClick={() => setIsChatOpen(true)}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              isChatOpen ? 'bg-[#3F865F] text-white shadow-lg' : 'bg-[#A3C475]/20 text-[#3F865F]'
            }`}
          >
            <Bot size={22}/>
          </button> */}
          <button
            onClick={() =>{navigate("/profile"), setActive('Profile')}}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold shadow-lg transition-all duration-300 ${
              active === 'Profile' ? 'bg-[#3F865F] text-white' : 'bg-[#C5A677] text-white'
            }`}
          >
            <User size={18}/> Profile
          </button>

          <button onClick={() => setIsChatOpen(true)} className="p-2 rounded-full bg-[#A3C475]/20 text-[#3F865F] hover:scale-110 transition-all"><Bot size={22}/></button>
          

        </div>
      </nav>

      {/* 2. MOBILE FLOATING NAVBAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full px-4 pb-4 z-[55]">
        <div className="relative bg-white h-20 rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] flex items-center justify-around px-2 border border-gray-100">
            <MobileNavItem icon={<LayoutList size={28}/>} active={active === 'Market Price'} onClick={() => setActive('Market Price')} />
            
            {/* CROP TIPS MOBILE TRIGGER */}
            <MobileNavItem icon={<Sprout size={28}/>} active={active === 'Crop Tips'} onClick={() => { setActive('Crop Tips'); setIsTipsOpen(true); }} />

            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 bg-[#FDFEFA] rounded-full flex items-center justify-center">
                    <button onClick={() => setIsChatOpen(true)} className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white bg-[#3F865F] shadow-[#3F865F]/40 active:scale-90 transition-all"><Bot size={32} /></button>
                </div>
            </div>
            <div className="w-16 h-1"></div>
            <MobileNavItem icon={<Bookmark size={28}/>} active={active === 'Feedback'} onClick={() => setActive('Feedback')} />
            <MobileNavItem icon={<User size={28}/>} active={active === 'Profile'} onClick={() => setActive('Profile')} />
        </div>
      </div>


      {/* 3. SLIDE-IN CHATBOT UI */}
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

  {/* SINGLE Unified Chat Content Container */}
  <div className="h-[calc(100vh-180px)] overflow-y-auto p-6 bg-[#FDFEFA] space-y-4 flex flex-col">
    
    {/* Static Welcome Message */}
    <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
      <p className="text-sm font-medium text-gray-700">
        မင်္ဂလာပါ။ Green Assistant မှ ကြိုဆိုပါတယ်။ စိုက်ပျိုးရေးနှင့်ပတ်သက်သည်များကို မေးမြန်းနိုင်ပါသည်။
      </p>
    </div>

    {/* Dynamic Messages Map */}
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`p-4 rounded-2xl shadow-sm max-w-[85%] animate-in fade-in slide-in-from-bottom-2 ${
          msg.type === "user"
            ? "bg-[#3F865F] text-white self-end rounded-tr-none"
            : "bg-white border border-gray-100 text-gray-700 self-start rounded-tl-none"
        }`}
      >
        <p className="text-sm font-medium whitespace-pre-wrap">{msg.text}</p>
      </div>
    ))}
  </div>

  {/* Input Area */}
  <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100 flex gap-2">
    <input 
      type="text" 
      value={question} // Controlled input so it clears after send
      placeholder="မေးခွန်းတစ်ခုခု မေးမြန်းပါ..."
      onChange={(e) => setQuestion(e.target.value)} 
      onKeyDown={(e) => e.key === 'Enter' && askQuestion()} // Send on Enter key
      className="flex-grow bg-[#F9FBF7] border-2 border-gray-100 rounded-2xl py-3 px-4 focus:outline-none focus:border-[#3F865F] text-sm"
    />
    <button 
      onClick={askQuestion} 
      className="bg-[#3F865F] text-white p-3 rounded-2xl shadow-lg active:scale-95 transition-transform"
    >
      <Send size={20} />
    </button>
  </div>
</div>

      {/* 3. CROP TIPS SIDEBAR */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isTipsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={closeSidebars} />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${isTipsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="bg-[#C5A677] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl"><Sprout size={24} /></div>
            <div>
              <h3 className="font-black text-lg leading-none">Crop Recommendations</h3>
              <p className="text-[10px] uppercase font-bold opacity-80 mt-1 italic">Based on Soil Type</p>
            </div>
          </div>
          <button onClick={closeSidebars} className="bg-white/10 p-2 rounded-full"><X size={20} /></button>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-180px)] overflow-y-auto p-6 space-y-6 bg-[#FDFEFA]">
          <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
            <p className="text-sm font-bold text-[#3F865F] mb-4">What type of soil do you have in your field?</p>
            
            {/* Soil Options Grid */}
            <div className="grid grid-cols-2 gap-3">
              {soilTypes.map((soil) => (
                <button
                  key={soil}
                  onClick={() => setSelectedSoil(soil)}
                  className={`py-3 rounded-xl font-black text-xs transition-all border-2 ${
                    selectedSoil === soil 
                    ? 'bg-[#3F865F] text-white border-[#3F865F]' 
                    : 'bg-white text-gray-400 border-gray-50 hover:border-[#A3C475]'
                  }`}
                >
                  {soil}
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Bubble */}
          {tipsResponse  && (
  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* Header */}
    <div className="flex items-center gap-2 mb-2 px-1">
      <CheckCircle2 size={18} className="text-[#3F865F]" />
      <p className="text-[11px] font-black uppercase text-[#3F865F] tracking-widest">
        Top 3 Crop Recommendations
      </p>
    </div>

      {/* Loop through the 3 crops */}
      {tipsResponse.map((item, index) => (
        <div 
          key={index} 
          className={`relative overflow-hidden bg-white border border-gray-100 p-4 rounded-2xl shadow-sm transition-all hover:shadow-md ${
            index === 0 ? 'ring-2 ring-[#3F865F]/20 scale-[1.02]' : ''
          }`}
        >
          {/* Rank Badge */}
          <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-[10px] font-bold text-white ${
            index === 0 ? 'bg-[#3F865F]' : 'bg-gray-400'
          }`}>
            #{index + 1}
          </div>

          <div className="flex justify-between items-end mb-3">
            <div>
              <h4 className="text-xl font-black text-gray-800 capitalize leading-none">
                {agriProducts[item.crop] || item.crop}
              </h4>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mt-1">
                Suitability Score
              </p>
            </div>
            <span className="text-lg font-black text-[#3F865F]">
              {item.confidence}
            </span>
          </div>

          {/* Visual Progress Bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${
                index === 0 ? 'bg-[#3F865F]' : 'bg-[#A3C475]'
              }`}
              style={{ width: item.confidence }}
            ></div>
          </div>
        </div>
      ))}
      
      {/* Helpful Note */}
      <p className="text-[10px] text-center text-gray-400 font-medium px-4">
        Recommendations based on your local soil NPK, real-time weather, and historical rainfall data.
      </p>
    </div>
  )}
           
        </div>

        {/* Footer Action */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100">
          <button 
            disabled={!selectedSoil}
            onClick={handleSendSoil}
            className={`w-full py-4 rounded-2xl font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${
              selectedSoil ? 'bg-[#3F865F] text-white shadow-[#3F865F]/20' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <Send size={18} /> Get Advice
          </button>
        </div>
      </div>

      {/* 4. CHATBOT SIDEBAR (Original Placeholder) */}
      
    </>
  );
};

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

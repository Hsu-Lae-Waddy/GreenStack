import React, { useState, useMemo } from 'react';
import MobileNavbar from '../components/MobileNavbar'
import Navbar from '../components/Navbar'
import {
  Search, Phone, MapPin, User, Sprout, Bot,
  LayoutList, Bookmark, ArrowUpRight, ArrowDownRight,
  Star, Clock, FilterX
} from 'lucide-react';

const MarketPrice = () => {
  // 1. STATE FOR SEARCH AND FILTER
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 2. MOCK DATA
  const marketData = [
    { id: 1, name: "Emata Paddy", category: "Paddy", sub: "New Harvest", price: "2,850,000", unit: "100 Baskets", change: "+2.4%", trend: "up", broker: "U Ba Kyaw", location: "Hmawbi", phone: "09445566778" },
    { id: 2, name: "Pawsan Rice", category: "Rice", sub: "Shwe Bo Special", price: "155,000", unit: "per Bag", change: "0.0%", trend: "steady", broker: "Daw Hla Hla", location: "Mandalay", phone: "09223344556" },
    { id: 3, name: "Black Gram", category: "Beans", sub: "Export Grade", price: "3,120,000", unit: "per Ton", change: "-1.5%", trend: "down", broker: "Ko Zaw Win", location: "Yangon", phone: "09778899001" },
    { id: 4, name: "Yellow Corn", category: "Corn", sub: "Dry Seeds", price: "1,200", unit: "per Viss", change: "+0.5%", trend: "up", broker: "U Tun Tun", location: "Naypyidaw", phone: "09112233445" },
    { id: 5, name: "Green Gram", category: "Beans", sub: "Special Quality", price: "2,450,000", unit: "per Ton", change: "+1.2%", trend: "up", broker: "Ma Su Su", location: "Magway", phone: "09556677889" },
  ];

  const categories = ["All", "Paddy", "Rice", "Beans", "Corn"];

  // 3. FILTERING LOGIC
  const filteredCrops = useMemo(() => {
    return marketData.filter((crop) => {
      const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            crop.broker.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || crop.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FDFEFA] pb-32 md:pb-12">

      {/* DESKTOP NAVBAR */}
      <Navbar name='Market Price'/>

      {/* HEADER & SEARCH AREA */}
      <header className="px-6 pt-8 md:px-20 max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-[#3F865F] tracking-tight mb-6 italic">Market Prices</h1>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search crop or broker name..."
            className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-[#C5A677] shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap border-2 ${
                selectedCategory === cat
                ? 'bg-[#3F865F] border-[#3F865F] text-white shadow-md shadow-[#3F865F]/20'
                : 'bg-white border-gray-100 text-[#3F865F]/50 hover:border-[#A3C475]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* PRICE CARDS LIST */}
      <main className="px-6 md:px-20 max-w-6xl mx-auto space-y-4">
        {filteredCrops.length > 0 ? (
          filteredCrops.map((crop) => (
            <div key={crop.id} className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">

              {/* Left Side: Crop Details */}
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#A3C475]/20 text-[#3F865F] text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider italic">
                    {crop.category}
                  </span>
                  <div className={`flex items-center gap-1 font-bold text-xs ${crop.trend === 'up' ? 'text-green-500' : crop.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                    {crop.trend === 'up' ? <ArrowUpRight size={14}/> : crop.trend === 'down' ? <ArrowDownRight size={14}/> : null}
                    {crop.change}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#3F865F]">{crop.name}</h3>
                <p className="text-gray-400 text-sm font-medium italic">{crop.sub}</p>
                <div className="mt-4 flex items-center gap-4 text-xs font-bold text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-[#C5A677]"/> {crop.location}</span>
                  <span className="flex items-center gap-1"><Clock size={14} className="text-[#A3C475]"/> 2h ago</span>
                </div>
              </div>

              {/* Center: Price Badge */}
              <div className="bg-[#F9FBF7] rounded-2xl p-4 md:text-right border border-[#A3C475]/10 min-w-[160px]">
                <p className="text-[10px] uppercase font-bold text-[#C5A677] tracking-widest mb-1">Price</p>
                <div className="text-2xl font-black text-[#3F865F] tracking-tighter">
                  {crop.price} <small className="text-[10px] font-bold opacity-60">MMK</small>
                </div>
                <p className="text-[10px] text-gray-400 font-bold italic">{crop.unit}</p>
              </div>

              {/* Right Side: Broker Contact */}
              <div className="flex items-center justify-between md:flex-col md:items-end md:gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
                <div className="flex items-center md:flex-row-reverse gap-3">
                  <div className="text-right">
                    <p className="text-sm font-black text-[#3F865F] leading-none mb-1">{crop.broker}</p>
                    <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-[#C5A677]"><Star size={10} className="fill-[#C5A677]"/> Trusted</div>
                  </div>
                  <div className="w-10 h-10 bg-[#A3C475]/30 rounded-full flex items-center justify-center text-[#3F865F] font-black">
                    {crop.broker[0]}
                  </div>
                </div>
                <a
                  href={`tel:${crop.phone}`}
                  className="bg-[#3F865F] hover:bg-[#2d6346] text-white p-3 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-[#3F865F]/20 active:scale-95 transition-all"
                >
                  <Phone size={18} />
                  <span className="hidden md:inline">Call Broker</span>
                </a>
              </div>
            </div>
          ))
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FilterX size={64} strokeWidth={1} className="mb-4 opacity-20" />
            <p className="font-bold">No results found for "{searchTerm}"</p>
            <button onClick={() => {setSearchTerm(""); setSelectedCategory("All");}} className="mt-2 text-[#3F865F] underline font-bold">Clear all filters</button>
          </div>
        )}
      </main>

      {/* MOBILE NOTCHED NAVBAR */}
      <MobileNavbar/>

    </div>
  );
};

// Internal Components
const NavIcon = ({ icon, active = false }) => (
  <button className={`p-3 rounded-2xl transition-all ${active ? 'text-[#3F865F]' : 'text-gray-300'}`}>
    {React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}
  </button>
);

export default MarketPrice;
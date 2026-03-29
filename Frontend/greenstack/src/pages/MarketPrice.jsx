import React, { useState, useMemo } from 'react';
import MobileNavbar from '../components/MobileNavbar'
import translations from './translations';
import Navbar from '../components/Navbar'
import {
  Search, Phone, MapPin, User, Sprout, Bot,
  LayoutList, Bookmark, ArrowUpRight, ArrowDownRight,
  Star, Clock, FilterX, BarChart3, TrendingUp
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext'; 
const MarketPrice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { lang } = useLanguage(); 
  const t = translations[lang];
  // 1. STANDARD PRICE DATA (Market Averages)
  const standardPrices = [
    { category: "Paddy", avg: "2,750,000", change: "+20k", trend: "up" },
    { category: "Rice", avg: "152,000", change: "+2k", trend: "up" },
    { category: "Beans", avg: "2,950,000", change: "-10k", trend: "down" },
    { category: "Corn", avg: "1,150", change: "0", trend: "steady" },
    { category: "Paddy", avg: "2,750,000", change: "+20k", trend: "up" },
    { category: "Rice", avg: "152,000", change: "+2k", trend: "up" },
    { category: "Beans", avg: "2,950,000", change: "-10k", trend: "down" },
    { category: "Corn", avg: "1,150", change: "0", trend: "steady" },
    { category: "Paddy", avg: "2,750,000", change: "+20k", trend: "up" },
    { category: "Rice", avg: "152,000", change: "+2k", trend: "up" },
    { category: "Beans", avg: "2,950,000", change: "-10k", trend: "down" },
    { category: "Corn", avg: "1,150", change: "0", trend: "steady" },
  ];

  const marketData = [
    { id: 1, name: "Emata Paddy", category: "Paddy", sub: "New Harvest", price: "2,850,000", unit: "100 Baskets", change: "+2.4%", trend: "up", broker: "U Ba Kyaw", location: "Hmawbi", phone: "09445566778" },
    { id: 2, name: "Pawsan Rice", category: "Rice", sub: "Shwe Bo Special", price: "155,000", unit: "per Bag", change: "0.0%", trend: "steady", broker: "Daw Hla Hla", location: "Mandalay", phone: "09223344556" },
    { id: 3, name: "Black Gram", category: "Beans", sub: "Export Grade", price: "3,120,000", unit: "per Ton", change: "-1.5%", trend: "down", broker: "Ko Zaw Win", location: "Yangon", phone: "09778899001" },
    { id: 4, name: "Yellow Corn", category: "Corn", sub: "Dry Seeds", price: "1,200", unit: "per Viss", change: "+0.5%", trend: "up", broker: "U Tun Tun", location: "Naypyidaw", phone: "09112233445" },
    { id: 5, name: "Green Gram", category: "Beans", sub: "Special Quality", price: "2,450,000", unit: "per Ton", change: "+1.2%", trend: "up", broker: "Ma Su Su", location: "Magway", phone: "09556677889" },
  ];

  const categories = ["All", "Paddy", "Rice", "Beans", "Corn"];

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
  <header className="px-6 pt-8 md:px-20 max-w-6xl mx-auto">
    <h1 className="text-4xl font-black text-[#3F865F] tracking-tight mb-6 italic">
      {t.market.title}
    </h1>

    {/* Search Input */}
    <div className="relative mb-8">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder={t.market.searchPlaceholder}
        className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-[#C5A677] shadow-sm transition-all"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* 2. STANDARD PRICE SECTION */}
    <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 text-[#3F865F]">
            <BarChart3 size={18} />
            <h2 className="text-xs font-black uppercase tracking-widest">
              {t.market.benchmarks}
            </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {standardPrices.map((std, idx) => (
                <div key={idx} className="flex-shrink-0 w-40 md:w-auto md:flex-1 bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
                    <p className="text-[10px] font-black text-[#C5A677] uppercase tracking-widest mb-1">{std.category}</p>
                    <div className="text-lg font-black text-[#3F865F] leading-none mb-2">
                        {std.avg} <small className="text-[8px] opacity-60">{t.market.currency}</small>
                    </div>
                    <div className={`text-[10px] font-bold flex items-center gap-1 ${
                        std.trend === 'up' ? 'text-green-500' : std.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                    }`}>
                        {std.trend === 'up' ? <ArrowUpRight size={12}/> : std.trend === 'down' ? <ArrowDownRight size={12}/> : null}
                        {std.change} {t.market.avg}
                    </div>
                </div>
            ))}
        </div>
    </div>

    {/* Filter Pills */}
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 border-b border-gray-100 mb-8">
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
          {/* Use t.market.categories[cat.toLowerCase()] if your array is ['All', 'Grains'...] */}
          {t.market.categories[cat.toLowerCase()] || cat}
        </button>
      ))}
    </div>
  </header>

  {/* PRICE CARDS LIST */}
  <main className="px-6 md:px-20 max-w-6xl mx-auto space-y-4">
    {filteredCrops.length > 0 ? (
      filteredCrops.map((crop) => (
        <div key={crop.id} className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#A3C475]/20 text-[#3F865F] text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider italic">{crop.category}</span>
                    <div className={`flex items-center gap-1 font-bold text-xs ${crop.trend === 'up' ? 'text-green-500' : crop.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                        {crop.trend === 'up' ? <ArrowUpRight size={14}/> : crop.trend === 'down' ? <ArrowDownRight size={14}/> : null}
                        {crop.change}
                    </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#3F865F]">{crop.name}</h3>
                <p className="text-gray-400 text-sm font-medium italic">{crop.sub}</p>
                <div className="mt-4 flex items-center gap-4 text-xs font-bold text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={14} className="text-[#C5A677]"/> {crop.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-[#A3C475]"/> {t.market.timeAgo}</span>
                </div>
            </div>

            <div className="bg-[#F9FBF7] rounded-2xl p-4 md:text-right border border-[#A3C475]/10 min-w-[160px]">
                <p className="text-[10px] uppercase font-bold text-[#C5A677] tracking-widest mb-1">{t.market.priceLabel}</p>
                <div className="text-2xl font-black text-[#3F865F] tracking-tighter">{crop.price} <small className="text-[10px] font-bold opacity-60">{t.market.currency}</small></div>
                <p className="text-[10px] text-gray-400 font-bold italic">{crop.unit}</p>
            </div>

            <div className="flex items-center justify-between md:flex-col md:items-end md:gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
                <div className="flex items-center md:flex-row-reverse gap-3">
                    <div className="text-right">
                        <p className="text-sm font-black text-[#3F865F] leading-none mb-1">{crop.broker}</p>
                        <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-[#C5A677]"><Star size={10} className="fill-[#C5A677]"/> {t.market.trusted}</div>
                    </div>
                    <div className="w-10 h-10 bg-[#A3C475]/30 rounded-full flex items-center justify-center text-[#3F865F] font-black">{crop.broker[0]}</div>
                </div>
                <a href={`tel:${crop.phone}`} className="bg-[#3F865F] hover:bg-[#2d6346] text-white p-3 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-[#3F865F]/20 active:scale-95 transition-all">
                    <Phone size={18} /> <span className="hidden md:inline">{t.market.callBroker}</span>
                </a>
            </div>
        </div>
      ))
    ) : (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 italic">
        <FilterX size={64} strokeWidth={1} className="mb-4 opacity-20" />
        <p className="font-bold">{t.market.noResults} "{searchTerm}"</p>
      </div>
    )}
  </main>
</div>
  );
};

export default MarketPrice;
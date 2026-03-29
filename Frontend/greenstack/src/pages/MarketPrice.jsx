import React, { useState, useMemo } from 'react';
import MobileNavbar from '../components/MobileNavbar'
import Navbar from '../components/Navbar'
import {
  Search, Phone, MapPin, ArrowUpRight, ArrowDownRight,
  Star, Clock, FilterX, BarChart3
} from 'lucide-react';

const MarketPrice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("အားလုံး");

  // 1. MYANMAR TRANSLATIONS
  const t = {
    title: "ဈေးကွက်ပေါက်ဈေးများ",
    searchPlaceholder: "သီးနှံ သို့မဟုတ် ပွဲစားအမည်ဖြင့် ရှာဖွေပါ...",
    benchmarks: "စံသတ်မှတ်ထားသော ပေါက်ဈေးများ",
    avg: "ပျမ်းမျှ",
    currency: "ကျပ်",
    priceLabel: "ဈေးနှုန်း",
    callBroker: "ပွဲစားထံ ဖုန်းဆက်ရန်",
    trusted: "ယုံကြည်ရသော",
    timeAgo: "၂ နာရီခန့်က",
    noResults: "ရှာဖွေမှုရလဒ် မရှိပါ -",
    clearFilters: "ရှာဖွေမှုများကို ဖျက်ပါ"
  };

  // 2. REALISTIC MYANMAR MARKET DATA (2024-2025 Rates)
  const standardPrices = [
    { category: "စပါး", avg: "3,250,000", change: "+50k", trend: "up" },
    { category: "ဆန်", avg: "165,000", change: "+5k", trend: "up" },
    { category: "ပဲမျိုးစုံ", avg: "3,450,000", change: "-20k", trend: "down" },
    { category: "ပြောင်းဖူး", avg: "1,550", change: "+15", trend: "up" },
  ];

  const marketData = [
    { id: 1, name: "ဧရာမင်း စပါး", category: "စပါး", sub: "မိုးစပါး (သစ်)", price: "3,150,000", unit: "တင်း ၁၀၀", change: "+1.4%", trend: "up", broker: "ဦးဘကျော်", location: "မှော်ဘီ", phone: "09445566778" },
    { id: 2, name: "ရွှေဘိုပေါ်ဆန်း", category: "ဆန်", sub: "ထိပ်စ (အထူး)", price: "185,000", unit: "တစ်အိတ်", change: "0.0%", trend: "steady", broker: "ဒေါ်လှလှ", location: "မန္တလေး", phone: "09223344556" },
    { id: 3, name: "မတ်ပဲ (FAQ)", category: "ပဲမျိုးစုံ", sub: "ပို့ကုန်အဆင့်", price: "3,520,000", unit: "တစ်တန်", change: "-0.5%", trend: "down", broker: "ကိုဇော်ဝင်း", location: "ရန်ကုန်", phone: "09778899001" },
    { id: 4, name: "စီပီ ပြောင်းဖူးစေ့", category: "ပြောင်းဖူး", sub: "အခြောက်ခံပြီး", price: "1,650", unit: "တစ်ပိဿာ", change: "+0.5%", trend: "up", broker: "ဦးထွန်းထွန်း", location: "နေပြည်တော်", phone: "09112233445" },
    { id: 5, name: "ပဲတီစိမ်း (ရွှေဝါ)", category: "ပဲမျိုးစုံ", sub: "အထူးလိုင်း", price: "2,850,000", unit: "တစ်တန်", change: "+1.2%", trend: "up", broker: "မစုစု", location: "မကွေး", phone: "09556677889" },
  ];

  const categories = ["အားလုံး", "စပါး", "ဆန်", "ပဲမျိုးစုံ", "ပြောင်းဖူး"];

  const filteredCrops = useMemo(() => {
    return marketData.filter((crop) => {
      const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            crop.broker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            crop.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "အားလုံး" || crop.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FDFEFA] pb-32 md:pb-12">


      <header className="px-6 pt-8 md:px-20 max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-[#3F865F] tracking-tight mb-6 italic">{t.title}</h1>

        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-[#C5A677] shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 2. STANDARD PRICE SECTION */}
        <div className="mb-10">
            <div className="flex items-center gap-2 mb-4 text-[#3F865F]">
                <BarChart3 size={18} />
                <h2 className="text-xs font-black uppercase tracking-widest">{t.benchmarks}</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {standardPrices.map((std, idx) => (
                    <div key={idx} className="flex-shrink-0 w-44 bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
                        <p className="text-[10px] font-black text-[#C5A677] uppercase tracking-widest mb-1">{std.category}</p>
                        <div className="text-lg font-black text-[#3F865F] leading-none mb-2">
                            {std.avg} <small className="text-[8px] opacity-60">{t.currency}</small>
                        </div>
                        <div className={`text-[10px] font-bold flex items-center gap-1 ${
                            std.trend === 'up' ? 'text-green-500' : std.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                        }`}>
                            {std.trend === 'up' ? <ArrowUpRight size={12}/> : std.trend === 'down' ? <ArrowDownRight size={12}/> : null}
                            {std.change} {t.avg}
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
                        <span className="flex items-center gap-1"><Clock size={14} className="text-[#A3C475]"/> {t.timeAgo}</span>
                    </div>
                </div>

                <div className="bg-[#F9FBF7] rounded-2xl p-4 md:text-right border border-[#A3C475]/10 min-w-[160px]">
                    <p className="text-[10px] uppercase font-bold text-[#C5A677] tracking-widest mb-1">{t.priceLabel}</p>
                    <div className="text-2xl font-black text-[#3F865F] tracking-tighter">{crop.price} <small className="text-[10px] font-bold opacity-60">{t.currency}</small></div>
                    <p className="text-[10px] text-gray-400 font-bold italic">{crop.unit}</p>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end md:gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
                    <div className="flex items-center md:flex-row-reverse gap-3">
                        <div className="text-right">
                            <p className="text-sm font-black text-[#3F865F] leading-none mb-1">{crop.broker}</p>
                            <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-[#C5A677]"><Star size={10} className="fill-[#C5A677]"/> {t.trusted}</div>
                        </div>
                        <div className="w-10 h-10 bg-[#A3C475]/30 rounded-full flex items-center justify-center text-[#3F865F] font-black">{crop.broker[0]}</div>
                    </div>
                    <a href={`tel:${crop.phone}`} className="bg-[#3F865F] hover:bg-[#2d6346] text-white p-3 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-[#3F865F]/20 active:scale-95 transition-all">
                        <Phone size={18} /> <span className="hidden md:inline">{t.callBroker}</span>
                    </a>
                </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 italic">
            <FilterX size={80} strokeWidth={1} className="mb-4 opacity-10" />
            <p className="text-lg font-bold">{t.noResults} "{searchTerm}"</p>
            <button onClick={() => setSearchTerm("")} className="mt-4 text-[#3F865F] font-black text-xs uppercase tracking-widest border-b-2 border-[#3F865F] pb-1">
                {t.clearFilters}
            </button>
          </div>
        )}
      </main>

      <MobileNavbar/>
    </div>
  );
};

export default MarketPrice;
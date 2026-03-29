import React, { useState } from 'react';
import { User, Phone } from 'lucide-react';
import translations from './translations';
import { useLanguage } from '../context/LanguageContext'; // 1. Import the hook

const LoginPage = () => {
  // 2. Replace local state with global context
  const { lang, setLang } = useLanguage(); 
  
  const [formData, setFormData] = useState({ name: '', phone: '' });

  // Shortcut to access current language strings
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#F9FBF7] flex items-center justify-center p-6 font-sans">
      {/* ... (Previous Decorative Elements) ... */}

      <div className="relative z-10 w-full max-w-md">
        {/* Floating Illustration Wrapper */}
        <div className="flex justify-center -mb-16 relative z-20">
            <div className="w-24 h-24 md:w-32 md:h-32 mb-5 flex items-center justify-center ">
              <img src="./src/assets/login_character_1.png" alt="Farmer" className="w-full h-full scale-125" />
            </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(63,134,95,0.15)] p-8 pt-20 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#3F865F] tracking-tight">{t.welcome}</h1>
          </div>

          <form className="space-y-5">
            {/* ... (Input Fields for Name and Phone using t.labelName etc) ... */}
            <div>
                <label className="block text-xs font-bold text-[#3F865F] uppercase ml-4 mb-1">{t.labelName}</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3C475] group-focus-within:text-[#3F865F] transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder={t.placeholderName} 
                        className="w-full bg-[#A3C475]/5 border-2 border-[#A3C475]/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#C5A677] transition-all" 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
            </div>
            {/* ... phone input ... */}

            <button type="submit" className="w-full bg-[#3F865F] text-white font-bold py-4 rounded-2xl shadow-lg mt-4">{t.loginBtn}</button>
          </form>

          {/* Bottom Links */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center px-2">
            <button className="text-sm font-bold text-[#C5A677]">{t.needHelp}</button>
            <div className="flex items-center gap-2 text-[#A3C475]">
              <img src="./src/assets/team_logo.png" className="w-8 h-8" alt="logo" />
              <span className="text-xs font-bold tracking-widest text-gray-400">GreenStack</span>
            </div>
          </div>
        </div>

        {/* Language switch buttons */}
        <div className="mt-6 flex justify-center gap-4">
            <button 
                onClick={() => setLang('en')} 
                className={`text-xs font-bold transition-all ${lang === 'en' ? 'text-[#3F865F] scale-110' : 'text-[#3F865F]/40 hover:text-[#3F865F]'}`}
            >
                English
            </button>
            <span className="text-gray-300">|</span>
            <button 
                onClick={() => setLang('mm')} 
                className={`text-xs font-bold transition-all ${lang === 'mm' ? 'text-[#3F865F] scale-110' : 'text-[#3F865F]/40 hover:text-[#3F865F]'}`}
            >
                မြန်မာ
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
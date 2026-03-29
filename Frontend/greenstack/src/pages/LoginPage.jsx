import React, { useState } from 'react';
import { User, Phone } from 'lucide-react';
import translations from './translations';

import { useLanguage } from '../context/LanguageContext'; 

import { useNavigate } from "react-router-dom";

const   LoginPage = () => {
  // Set default language to 'mm' (Myanmar)
  const { lang, setLang } = useLanguage(); 
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const t = translations[lang];
  const navigate=useNavigate()
  const serverRoute="http://127.0.0.1:8080"
  const login = async (data) => {
    const response = await fetch(`${serverRoute}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const result = await response.json();
    console.log(result);
    if(result.message=="Login successful"){
      localStorage.setItem("token", result.user.id);
    }else if (result.message=="User registered"){
      localStorage.setItem("token", result.id);
    }
    console.log("Token stored in localStorage:", localStorage.getItem("token"));
    navigate('/home')

  }
  return (
    <div className="min-h-screen bg-[#F9FBF7] flex items-center justify-center p-6 font-sans">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-1/2 bg-[#3F865F] rounded-b-[100px] z-0 opacity-10"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#A3C475] rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#C5A677] rounded-full blur-3xl opacity-20"></div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md">

        {/* Floating Illustration Wrapper */}
        <div className="flex justify-center -mb-16 relative z-20">
            <div className="w-24 h-24 md:w-32 md:h-32 mb-5 flex items-center justify-center ">
              <img
                src="./src/assets/login_character_1.png"
                alt="Farmer"
                className="w-full h-full  scale-125"
              />
            </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(63,134,95,0.15)] p-8 pt-20 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#3F865F] tracking-tight">
                {t.welcome}
            </h1>

          </div>

          <form className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold text-[#3F865F] uppercase ml-4 mb-1">
                {t.labelName}
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3C475] group-focus-within:text-[#3F865F] transition-colors" size={20} />
                <input
                  type="text"
                  placeholder={t.placeholderName}
                  className="w-full bg-[#A3C475]/5 border-2 border-[#A3C475]/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#C5A677] focus:bg-white transition-all text-gray-700 font-medium"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-xs font-bold text-[#3F865F] uppercase ml-4 mb-1">
                {t.labelPhone}
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3C475] group-focus-within:text-[#3F865F] transition-colors" size={20} />
                <input
                  type="tel"
                  placeholder={t.placeholderPhone}
                  className="w-full bg-[#A3C475]/5 border-2 border-[#A3C475]/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#C5A677] focus:bg-white transition-all text-gray-700 font-medium"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                login(formData);
              }}
              className="w-full bg-[#3F865F] hover:bg-[#2d6346] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#3F865F]/30 transition-all hover:scale-[1.02] active:scale-95 mt-4"
            >
              {t.loginBtn}
            </button>
          </form>

          {/* Bottom Links */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center px-2">
            <button className="text-sm font-bold text-[#C5A677] hover:text-[#3F865F]">
                {t.needHelp}
            </button>
            <div className="flex items-center gap-2 text-[#A3C475]">
              <img src="./src/assets/team_logo.png" className="w-8 h-8" alt="logo" />
              <span className="text-xs font-bold tracking-widest text-gray-400">GreenStack</span>
            </div>
          </div>
        </div>

          {/* language switch buttons */}

         <div className="mt-6 flex justify-center gap-4">
            <button onClick={() => setLang('en')}  className="text-xs font-bold text-[#3F865F]/60 hover:text-[#3F865F]">English</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => setLang('mm')} className="text-xs font-bold text-[#3F865F]/60 hover:text-[#3F865F]">မြန်မာ</button>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;

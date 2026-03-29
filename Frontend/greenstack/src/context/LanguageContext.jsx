import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // 1. Initialize from LocalStorage so it remembers after refresh
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'mm');

  // 2. Save to LocalStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('appLang', lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for easy use in any page
export const useLanguage = () => useContext(LanguageContext);
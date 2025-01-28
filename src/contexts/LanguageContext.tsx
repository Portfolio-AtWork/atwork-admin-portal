import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();

  const [language, setLanguageState] = useState<Language>(
    i18n.language as Language,
  );

  const setLanguage = (lang: Language) => {
    localStorage.setItem('atWorkLanguage', lang)
    i18n.changeLanguage(lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext
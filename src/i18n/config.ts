import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import pt from './locales/pt.json';

const savedLanguage = localStorage.getItem('atWorkLanguage');

i18n.use(initReactI18next).init({
  resources: {
    pt: pt,
    en: en,
  },
  lng: savedLanguage || 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

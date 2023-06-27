import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en/home.json'; // Import language file for English
import translationFR from './am/home.json'; // Import language file for French

// Set up i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN, // Set English translations
      },
      am: {
        translation: translationFR, // Set amharic translations
      },
      // Add more languages as needed
    },
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Set the fallback language if a translation is missing
    interpolation: {
      escapeValue: false, // React handles escaping
    },
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../utils/translations/en.json'
import fi from '../utils/translations/fi.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      fi: {
        translation: fi,
      }
    },
    lng: "fi", // Kielen oletusarvo
    fallbackLng: "en", // Varakieli
    interpolation: {
      escapeValue: false
    }
  });

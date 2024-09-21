import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'react-native-localize';

import en from './locales/en.json';
import pa from './locales/pa.json';
import ta from './locales/ta.json';
import hi from './locales/hi.json';

const resources = {
  en: {translation: en},
  hi: {translation: hi},
  pa: {translation: pa},
  ta: {translation: ta},
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    const bestLanguage = Localization.findBestLanguageTag(
      Object.keys(resources),
    );
    callback(bestLanguage?.languageTag || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

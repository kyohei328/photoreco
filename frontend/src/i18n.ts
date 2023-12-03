import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      grandPrize: 'Grand Prize',
      secondPrize: 'Second Prize',
      selectedPrize: 'Selected Prize',
    },
  },
  ja: {
    translation: {
      'GrandPrize': '最優秀賞',
      'SecondPrize': '準優秀賞',
      'SelectedPrize': '入選',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // デフォルトの言語
    fallbackLng: 'ja', // フォールバック言語
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

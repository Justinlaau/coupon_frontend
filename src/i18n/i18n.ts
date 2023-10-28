import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/en.json'; // Path to your English translation file
import translationZH from './locales/zh/zh.json'; // Path to your French translation file

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: translationEN,
        },
        zh: {
            translation: translationZH,
        },
    },
    compatibilityJSON: 'v3',
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Fallback language if the translation is missing
    interpolation: {
        escapeValue: false, // React Native doesn't require HTML escaping
    },
});

export default i18n;
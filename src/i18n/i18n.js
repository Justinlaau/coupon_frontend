import { Platform, NativeModules } from 'react-native';

import enMessages from './locales/en.json';
import zhMessages from './locales/zh.json';

// Define the supported languages and their corresponding messages
export const messages = {
    en: enMessages,
    zh: zhMessages,
};

// const deviceLanguage =
//   Platform.OS === 'ios'
//     ? NativeModules.SettingsManager.settings.AppleLocale ||
//       NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS
//     : NativeModules.I18nManager.localeIdentifier; // Android

export const locale = "zh"
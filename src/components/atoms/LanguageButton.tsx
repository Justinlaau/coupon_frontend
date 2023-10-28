import React from 'react';
import { Text, View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from './../../i18n/i18n'

const handleLanguageChange = (language:any) => {
    i18n.changeLanguage(language);
};
const LanguageButton = () => {

    return (
        <View>
            <Button title="English" onPress={() => handleLanguageChange('en')} />
            <Button title="中文" onPress={() => handleLanguageChange('zh')} />
        </View>
    );
};

export default LanguageButton;
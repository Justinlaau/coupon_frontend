import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Background from '../../components/templates/Background';
import { InputBox } from '../../components/atoms/InputBox';
import { ProfileSVG } from '../../assets/images/ProfileSVG';
import { SvgXml } from 'react-native-svg';
import FontStyles from '../../styles/GlobalFontStyle';
import { ButtonBox } from '../../components/atoms/ButtonBox';
import { CheckBoxes } from '../../components/atoms/CheckBoxes';
import { Divider } from "@rneui/base";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BusinessInformationFormScreen = () => {
    return (
        <View>
            <Text> 商戶資料 </Text>
        </View>
    )
}
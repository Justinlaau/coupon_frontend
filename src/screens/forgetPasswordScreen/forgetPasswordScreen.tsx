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
const forgetPasswordScreen = ({navigation : any}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (text : string) => {
        setEmail(text);
    };
  
    return (
        <View style={forgetPasswordStyle.layout}>
            <View style={forgetPasswordStyle.boxesContainer}>
                <InputBox text="email"
                borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                Input={handleEmailChange}
                InputRes={email}
                shadowStyle={{
                    shadowRadius: 20, shadowColor: 'black',
                    shadowOffset: { width: -100, height: -100 },
                }}
                />
            </View>
        </View>
    )
};
const forgetPasswordStyle = StyleSheet.create({
    layout: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        backgroundColor : 'black'
      },
    boxesContainer: {
        height : "50%",
        width : "80%",
        backgroundColor : 'red'
    }
});
export default forgetPasswordScreen;
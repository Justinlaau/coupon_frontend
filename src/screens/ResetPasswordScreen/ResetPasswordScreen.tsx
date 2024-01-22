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
import { Center } from 'native-base';
import { BASE_URL } from '../../config/config';
const ResetPasswordScreen = ({navigation} : any) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = (text : string) => {
        setPassword(text);
    };
    const handleConfirmPasswordChange = (text : string) => {
        setConfirmPassword(text);
    };

    const resetPassword = async ()=>{
        if (password !== confirmPassword ){
            Alert.alert("密碼不匹配")
        }else{
            const Payload = {
                'password': password,
            }
            const {data}= await axios.post(BASE_URL + 'user/resetPasswordAPI', Payload);

            if (data.result === 0){
                Alert.alert("密碼重設成功");
                navigation.navigate("Login")
            }else{
                Alert.alert("非法密碼");
            }
        }
    };  
  
    return (
        <Background main={true} contentHeight="76%" tabBarSpace={false}>
            <View  style={resetPasswordStyle.layout}>

                <View style={{height: '5%'}}></View>
                <View style={resetPasswordStyle.boxesContainer}>
                    <View style={{flexDirection:'column'}}>

                        <View style={{height: '20%'}}></View>

                        <Text style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>
                            Reset account password
                        </Text>

                        <View style={{height: '15%'}}></View>
                        <Text style={{textAlign: 'center', fontSize: 17, fontWeight: 400}}>  
                            Enter a new password for "email"
                        </Text>
                    </View>
                    
                </View>

                <View style={{height: '2%'}}></View>
                <View style={resetPasswordStyle.forgetContainer}>

                    <View style={{height: '20%'}}></View>

                    <View style={{alignItems: 'center'}}>
                        <View style={{width: '90%'}}>
                                <View >
                                    <InputBox text="密碼"
                                        borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                                        Input={handlePasswordChange}
                                        InputRes={password}
                                        shadowStyle={{
                                            shadowRadius: 20, shadowColor: 'black',
                                            shadowOffset: { width: -100, height: -100 },
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{height: '10%'}}></View>
                        <View style={{width: '90%'}}>
                            <View >
                                <InputBox text="確認密碼"
                                    borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                                    Input={handleConfirmPasswordChange}
                                    InputRes={confirmPassword}
                                    shadowStyle={{
                                        shadowRadius: 20, shadowColor: 'black',
                                        shadowOffset: { width: -100, height: -100 },
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{height: "15%"}}></View>

                        <View style={{width: '50%'}}>
                                <ButtonBox text="重設"
                                    color="#DC2B37"
                                    borderStyle={{ borderRadius: 10 }}
                                    isLoading={loading}
                                    action={resetPassword}
                                />
                        </View>
                        
                    </View>

                </View>
        </View>
        </Background>
    )
};
const resetPasswordStyle = StyleSheet.create({
    layout: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        // backgroundColor : 'black'
      },
    boxesContainer: {
        height : "15%",
        width : "100%",
        // backgroundColor : 'pink'
    },
    forgetContainer: {
        height : "40%",
        width : "90%",
        borderRadius: 20,
        elevation: 4,
        backgroundColor: 'white'
    }
});
export default ResetPasswordScreen;
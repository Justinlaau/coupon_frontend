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
import { BASE_URL } from '../../config/config';
import { useDispatch } from 'react-redux';
import { SET_BASE_USER } from '../../../Redux/Action/ActionType';
import { setMessagePopup, toggleMessagePopup } from '../../../Redux/Action/CommonAction';
import { 
    TOGGLE_SUCCESS_POPUP,
    SET_SUCCESS_MESSAGE, 
    TOGGLE_ERROR_POPUP, 
    SET_ERROR_MESSAGE } from '../../../Redux/Action/ActionType';
import KeyboardAvoidingWrapper from '../../components/templates/KeyboardAvoidingWrapper';
const forgetPasswordScreen = ({navigation} : any) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [authCode, setAuthCode] = useState('');

    const handleEmailChange = (text : string) => {
        setEmail(text);
    };
    const handleAuthCodeChange = (text : string) => {
        setAuthCode(text);
    };


    const authenticateEmail = async ()=>{

        const Payload = {
            'email': email
        }

        setLoading(true);
        if (email === ''){
            Alert.alert("Please enter your registered email");
        }else {
            try{
                console.log(email)
                const {data} = await axios.post(BASE_URL + "user/resetPasswordVerificationCodeAPI",Payload)
                console.log(data);
    
                if (data.result == 0){
                    Alert.alert("Email sent successfully")
                    // navigation.navigate('ResetPassword');
                }else {  
                    // dispatch(setMessagePopup("Invalid Email.", SET_ERROR_MESSAGE));
                    // dispatch(toggleMessagePopup(true, TOGGLE_ERROR_POPUP));
                    Alert.alert("Invalid Email");
                }
            }catch (e){
                console.log("error")
                console.log(e)
                // dispatch(setMessagePopup("Invalid Email", SET_ERROR_MESSAGE));
                // dispatch(toggleMessagePopup(true, TOGGLE_ERROR_POPUP))
                Alert.alert("Invalid Email");
            }
  
        }
        setLoading(false);
    }


    const authenticateAll = async ()=>{
        const Payload = {
            'email': email,
            "verification_code": authCode,
        }
        if (authCode === ''){
            Alert.alert("Please enter the verification code");
        }else{
            try{
                console.log(authCode)
                const {data} = await axios.post(BASE_URL + "user/resetPasswordAuthAPI", Payload);

                if (data.result == 0){
                    // console.log(data.token)
                        let token = data.token
                        axios.defaults.headers.common['Authorization'] = token;
                        navigation.navigate('ResetPassword');
                }else{
                    Alert.alert("Invalid Code");
                }
            }catch (e){
                console.log("error")
                console.log(e)
                Alert.alert("Expired");
                navigation.goBack();
            }
        }
    }
  
    return (
        <KeyboardAvoidingWrapper>
    <Background main={true} contentHeight="76%" tabBarSpace={false}>
            <View  style={forgetPasswordStyle.layout}>
                <View style={{height: '5%'}}></View>
                <View style={forgetPasswordStyle.boxesContainer}>
                    <View style={{flexDirection:'column'}}>

                        <View style={{height: '20%'}}></View>

                        <Text style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>
                            忘記密碼
                        </Text>

                        <View style={{height: '15%'}}></View>
                        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 400}}>  
                            使用電郵地址重設密碼
                        </Text>
                        
                    </View>
                    
                </View>

                <View style={{height: '2%'}}></View>
                <View style={forgetPasswordStyle.forgetContainer}>

                    <View style={{height: '20%'}}></View>

                    <View style={{height: '5%'}}></View>

                    <View style={{alignItems: 'center'}}>

                        <View style={{width: '90%'}}>
                            <View style={{flexDirection: 'row'}}>

                                <View style={{width: '70%'}}>
                                    <InputBox text="輸入你的電郵"
                                    borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                                    Input={handleEmailChange}
                                    InputRes={email}
                                    shadowStyle={{
                                        shadowRadius: 20, shadowColor: 'black',
                                        shadowOffset: { width: -100, height: -100 },
                                    }}
                                    />
                                </View>


                                <View style={{width: '10%'}}></View>

                                <View style={{width: '20%', paddingTop: '2%'}}>

                                    <ButtonBox text="獲取"
                                        color="#DC2B37"
                                        borderStyle={{ borderRadius: 10 }}
                                        isLoading={loading}
                                        action={authenticateEmail}
                                    />
                                </View>
                               
                            </View>
                                <View style={{height: '15%'}}></View>
                            <View >
                                <InputBox text="驗證碼"
                                    borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                                    Input={handleAuthCodeChange}
                                    InputRes={authCode}
                                    shadowStyle={{
                                        shadowRadius: 20, shadowColor: 'black',
                                        shadowOffset: { width: -100, height: -100 },
                                    }}
                                />
                            </View>

                        </View>

                        <View style={{height: "10%"}}></View>

                        <View style={{width: '40%'}}>
                                <ButtonBox text="發送"
                                    color="#DC2B37"
                                    borderStyle={{ borderRadius: 10 }}
                                    isLoading={loading}
                                    action={authenticateAll}
                                />
                        </View>

                    </View>

                </View>
        </View>
        </Background>
        </KeyboardAvoidingWrapper>
    
    )
};
const forgetPasswordStyle = StyleSheet.create({
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
        height : "60%",
        width : "90%",
        borderRadius: 20,
        elevation: 4,
        backgroundColor: 'white'
    }
});
export default forgetPasswordScreen;
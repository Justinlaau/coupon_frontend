import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text , SafeAreaView, ScrollView, Alert} from 'react-native';
import Background from '../../components/templates/Background';
import Layout from '../../components/templates/Layout';
import { MagnifierSVG } from '../../assets/images/MagnifierSVG';
import { ProfileSVG } from '../../assets/images/ProfileSVG';
import SearchSVG from '../../assets/images/SearchSVG';
import FontStyles from '../../styles/GlobalFontStyle';
import { InputBox } from '../../components/atoms/InputBox';
import { ButtonBox } from '../../components/atoms/ButtonBox';
import axios from 'axios';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import { color } from '@rneui/base';
import {BASE_URL} from '../../config/config';
import { useDispatch } from 'react-redux';
import { toggleLoading } from '../../../Redux/Action/CommonAction';

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [comfirm_pw, setComfirmPw] = useState('');
    const [email, setEmail]= useState('');
    const [verification_code, setVerificationcode] = useState('');

    const handleUsernameChange = (text) => {
        setUsername(text);
    };
    
    const handlePasswordChange = (text) => {
        setPassword(text);
    };
    const handleComfirmPWChange = (text) =>{
        setComfirmPw(text)
    }
    const handleEmailChange = (text)=>{
        console.log(text)
        setEmail(text)
    }
    const handlVerificationcodeChange = (text)=>{
        setVerificationcode(text)
    }
    const sendEmailCode = async () => {
        try {
            dispatch(toggleLoading(true))
            const payload = {
                "email": email
            };
            if(email == ''){
                Alert.alert('Please enter email');
            }
            console.log(email)
            let { data } = await axios.post(BASE_URL + 'user/UserRegistrationVerificationCode', payload)
            if ( data == null || data.result != 0) console.log("failed")
            else console.log("success")
        } catch(e) {
             console.log(e)
        } finally {
            dispatch(toggleLoading(false))
        }
    };
    
    const submitHandle = async () =>{
        const payload = {
            "email" : email,
            "username" : username,
            "password" : password,
            "verification_code" : verification_code,
            "nickname": "tony",
            "phone": "67767329"
        }
        console.log("payload")
        console.log(payload)
        if(password == ''){
            Alert.alert('please enter password');
        }
        if(username == ''){
            Alert.alert('please enter username');
        }
        let {data} = await axios.post(BASE_URL + 'user/RegistrationRequest', payload)
        console.log(data);
        
        navigation.navigate('Login');
    } 
    return (
        <Background main={true} contentHeight="76%" tabBarSpace={false}>
        
            <View style={RegisterStyle.layout}>
                <Text style={[RegisterStyle.text, FontStyles.medium, FontStyles.bold, { color:"#DC2B37"}]}>Create account</Text>
                <View style={RegisterStyle.InputGroups}>
                    <View style={{width:"100%"}}>
                        <InputBox text="username"
                            borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                            Input={handleUsernameChange}
                            InputRes={username}
                            shadowStyle={{
                                shadowRadius: 20, shadowColor: 'black',
                                shadowOffset: { width: -100, height: -100 },
                            }}
                        />
                    </View>

                    <View style={{ height: "10%" }}></View>

                    <View style={{width:"100%"}}>
                        <InputBox text="password"
                            borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                            Input={handlePasswordChange}
                            InputRes={password}
                            shadowStyle={{
                                shadowRadius: 20, shadowColor: 'black',
                                shadowOffset: { width: -100, height: -100 },
                            }}
                        />
                    </View>
                    <View style={{ height: "10%" }} ></View>
                    <View style={{width:"100%"}}>
                        <InputBox text="comfirm password"
                            borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                            Input={handleComfirmPWChange}
                            InputRes={comfirm_pw}
                            shadowStyle={{
                                shadowRadius: 20, shadowColor: 'black',
                                shadowOffset: { width: -100, height: -100 },
                            }}
                        />
                    </View>
                    <View style={{ height: "10%" }}></View>
                    <View style={{width:"100%"}}>
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
                        <View style={{ height: "10%" }}></View>

                        <View style={{ height: "20%", width: "100%" ,  flexDirection: 'row'}}>
                            <View style={{height:"100%", width:"70%"}}>
                                <InputBox text="verification code" 
                                    Input={ handlVerificationcodeChange}
                                    InputRes={verification_code}
                                    borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                                />
                            </View>

                            <View style={{height:"100%", width: "10%" }}></View>

                            <View style={{height:"100%", width:"20%", justifyContent: "center"}}>
                                <ButtonBox text="get"
                                    borderStyle={{ borderRadius: 10 }}
                                    color="black"
                                    textStyle={{ color: "gray"} } action={sendEmailCode} />
                            </View>
                        </View>

                        <View style={RegisterStyle.ButtonContainer}>
                            <ButtonBox text="Submit"
                                borderStyle={{ borderRadius: 10 }}
                                color="#DC2B37"
                                textStyle={{ color: "white" }} action={submitHandle} />
                        </View>
                </View>
            </View>
        </Background>
    )
}
const RegisterStyle = StyleSheet.create({
    Scrolllayout: {
        height: "80%",
        width: "80%",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
    },
    layout:{
        height: "80%",
        width: "80%",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
    },
    text: {
        height: "20%",
        textAlign: "center",
        justifyContent: "center",
        top: "8%"
    },
    InputGroups: {
        height: "50%",
        width: "100%",
        borderRadius: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    ButtonContainer: {
        height: "45%",
        width:"80%",
        justifyContent: "center",
        
    }
})

export default RegisterScreen;

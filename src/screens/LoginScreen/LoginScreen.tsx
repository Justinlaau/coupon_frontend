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
import Layout from '../../components/templates/Layout';
import { setMessagePopup, toggleMessagePopup } from '../../../Redux/Action/CommonAction';
import KeyboardAvoidingWrapper from '../../components/templates/KeyboardAvoidingWrapper';
import { 
  TOGGLE_SUCCESS_POPUP,
  SET_SUCCESS_MESSAGE, 
  TOGGLE_ERROR_POPUP, 
  SET_ERROR_MESSAGE } from '../../../Redux/Action/ActionType';
import { socket } from '../../socket';

const LoginScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  }


  const handleLogin = async () => {
    // Perform login logic here
    setLoading(true);
    const payload = {
      "username": username,
      "password": password
    }
    if (username.trim() === '' || password.trim() === '') {
      dispatch(setMessagePopup("請輸入用戶名與密碼", SET_ERROR_MESSAGE));
      dispatch(toggleMessagePopup(true, TOGGLE_ERROR_POPUP));
      // Alert.alert('Please enter username and password.');
    }
    else {
      try {
        const { data } = await axios.post(BASE_URL + 'user/LoginRequest', payload)
        // const { data } = await axios.post('http://47.129.1.22:8000/user/LoginRequest', payload)
        console.log("data")
        console.log(data)
        if (data.result == 0) {
          let token = data.token;
          await AsyncStorage.setItem('jwt', token);
          axios.defaults.headers.common['Authorization'] = token;
          socket.auth = { token: token };
          socket.connect();
          dispatch({
            type: SET_BASE_USER,
            data: {
              token: token,
              username: username
            }
          })
          navigation.navigate('Main');
        } else {  
          dispatch(setMessagePopup("用戶名或密碼錯碼", SET_ERROR_MESSAGE));
          dispatch(toggleMessagePopup(true, TOGGLE_ERROR_POPUP));
          // Alert.alert("Username or password is wrong");
        }
        // console.log(response)
      } catch (e) {
        console.log("error")
        console.log(e)
        dispatch(setMessagePopup("用戶名或密碼錯碼", SET_ERROR_MESSAGE));
        dispatch(toggleMessagePopup(true, TOGGLE_ERROR_POPUP));
        // Alert.alert("Username or password is wrong");
      }
    }
    setLoading(false);
  };
  return (
    <KeyboardAvoidingWrapper>
      <Layout showTabBar={false}>
        <Background main={true} contentHeight="76%">
          <View style={LoginStyle.Layout}>
            <View style={LoginStyle.Container}>
              <Text style={[
                LoginStyle.Title,
                FontStyles.small,
                FontStyles.bold,
              ]}
              >
                請註冊或登入
              </Text>
              <View style={LoginStyle.Icon}>
                <SvgXml width={'70'} xml={ProfileSVG} />
              </View>
              <View style={LoginStyle.InputContainer}>
              <InputBox text="用戶名"
                  borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                  Input={handleUsernameChange}
                  InputRes={username}
                  shadowStyle={{
                    shadowRadius: 20, shadowColor: 'black',
                    shadowOffset: { width: -100, height: -100 },
                  }}
                  />
                <View style={{ height: "10%" }}></View>
                <InputBox text="密碼"
                  Input={handlePasswordChange}
                  HideText={true}
                  InputRes={password}
                  borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                  shadowStyle={{
                    shadowRadius: 20, shadowColor: 'black',
                    shadowOffset: { width: -100, height: -100 },
                  }}
                  />
              </View>
              <View style={LoginStyle.Checkbox}>
                <CheckBoxes text="記住我" textStyle={{ color: "#DC2B37" }} color="#DC2B37" />

                <Text style={LoginStyle.forgetPassword}
                  onPress={() => { 
                    navigation.navigate("forgetPassword")
                    console.log("forget password....")
                    }}>
                  忘記密碼
                </Text>
              </View>
              <View style={LoginStyle.ButtonContainer}>
              <ButtonBox text="登入"
                  color="#DC2B37"
                  borderStyle={{ borderRadius: 10 }}
                  isLoading={loading}
                  action={handleLogin}
                  />
              </View>
              <View style={LoginStyle.Divider}>
                <Divider
                  style={{ width: "30%" }}
                  color="gray"
                  insetType="left"
                  width={1}
                  orientation="horizontal"
                  />
                <Text>  沒有帳戶?  </Text>
                <Divider
                  style={{ width: "30%" }}
                  color="gray"
                  insetType="right"
                  width={1}
                  orientation="horizontal"
                  />
              </View>
              <View style={LoginStyle.CreateButton}>
              <ButtonBox text="創建帳戶"
                  borderStyle={{ borderColor: "#DC2B37", borderWidth: 2, borderRadius: 25 }}
                  textStyle={{ color: "#DC2B37" }} boxType="outline" action={() => { navigation.navigate('Register') }} />
              </View>
            </View>
          </View>
        </Background>
      </Layout>
    </KeyboardAvoidingWrapper>
  );
};

const LoginStyle = StyleSheet.create({
  Layout: {
    zIndex: 10,
    height: "100%",
    width: "80%",
    top: "5%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  Container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  InputContainer: {
    height: "21%",
    width: "100%",
    borderRadius: 15,
  },
  Title: {
    top: "0%",
    textAlign: 'center',
    color: '#AD3B41',
    height: "7%",
    zIndex: 11
  },
  Icon: {
    height: "15%",
  },
  ButtonContainer: {
    width: "80%",
    height: "8%",

  },
  Checkbox: {
    top: "3%",
    width: "95%",
    height: "10%",
    display: "flex",
    flexDirection: "row"
  },
  forgetPassword: {
    textAlign: "right",
    width: "60%",
    color: "#DC2B37",
    textDecorationLine: "underline",
    textDecorationColor: '#DC2B37',
  },
  Divider: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: "13%",
    width: "100%",
    justifyContent: "center"
  },
  CreateButton: {
    width: "60%"
  }
});

export default LoginScreen;

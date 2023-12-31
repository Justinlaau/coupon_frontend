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

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
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
      Alert.alert('Please enter username and password.');
    }
    else {
      try {
        const { data } = await axios.post('http://192.168.1.85:8000/user/login/', payload)
        let token = data.token;
        await AsyncStorage.setItem('jwt', token);
        console.log('Login successful');
        // const jwt = await AsyncStorage.getItem('jwt');
        // const headers = {
        //   Authorization: `Bearer ${jwt}`
        // };
        // const response = await axios.get('http://192.168.31.13:8000/user/get_user_info/', { headers });
        // console.log(response)
      } catch (e) {
        Alert.alert("Username or password is wrong");
      }
      // const { data } = await axios.post('http://192.168.31.13:8000/user/login/', payload)
      // console.log(data);
      // setLoading(false);
    }
    navigation.navigate('Main')
    setLoading(false);
  };
  return (
    <Background main={true} contentHeight="76%">
      <View style={LoginStyle.Layout}>
        <View style={LoginStyle.Container}>
          <Text style={[LoginStyle.Title,
          FontStyles.small,
          FontStyles.bold,
          ]}>
            請註冊或登入</Text>
          <View style={LoginStyle.Icon}>
            <SvgXml width={'70'} xml={ProfileSVG} />
          </View>
          <View style={LoginStyle.InputContainer}>
            <InputBox text="account name/ email"
              borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
              Input={handleUsernameChange}
              InputRes={username}
              shadowStyle={{
                shadowRadius: 20, shadowColor: 'black',
                shadowOffset: { width: -100, height: -100 },
              }}
            />
            <View style={{ height: "10%" }}></View>
            <InputBox text="password"
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
            <CheckBoxes text="Remember me" textStyle={{ color: "#DC2B37" }} color="#DC2B37" />

            <Text style={LoginStyle.forgetPassword}
              onPress={() => { console.log("forget password....") }}>
              Forget password?
            </Text>
          </View>
          <View style={LoginStyle.ButtonContainer}>
            <ButtonBox text="Login"
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
            <Text>Don't have account?</Text>
            <Divider
              style={{ width: "30%" }}
              color="gray"
              insetType="right"
              width={1}
              orientation="horizontal"
            />
          </View>
          <View style={LoginStyle.CreateButton}>
            <ButtonBox text="Create account"
              borderStyle={{ borderColor: "#DC2B37", borderWidth: 2, borderRadius: 25 }}
              textStyle={{ color: "#DC2B37" }} boxType="outline" action={() => { navigation.navigate('Register') }} />
          </View>
        </View>
      </View>
    </Background>
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
    width: "100%"
  },
  CreateButton: {
    width: "60%"
  }
});

export default LoginScreen;

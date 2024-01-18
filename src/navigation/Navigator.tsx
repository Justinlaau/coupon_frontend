import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MainScreen from '../screens/MainScreen/MainScreen';
import forgetPasswordScreen from '../screens/forgetPasswordScreen/forgetPasswordScreen';

import {NavigationContainer} from '@react-navigation/native';
import CouponListingScreen from '../screens/CouponListingScreen/CouponListingScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import WalletScreen from '../screens/WalletScreen/WalletScreen';
import CouponItemScreen from '../screens/CouponItemScreen/CouponItemScreen';
import CouponQRCodeScreen from '../screens/QRCode/CouponQRCodeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoading } from '../../Redux/Action/CommonAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { SET_BASE_USER } from '../../Redux/Action/ActionType';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import MapScreen from '../screens/MapScreen/MapScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  const dispatch = useDispatch();

  const initFetch = async () => {
    try {
      console.log("init fetch")
      dispatch(toggleLoading(true));
      const logonToken = await AsyncStorage.getItem('jwt');
      console.log("token: " + logonToken)
      if (logonToken != null) {
        // fetch user info
        axios.defaults.headers.common['Authorization'] = logonToken;
        const request_response = await axios.post(BASE_URL + "user/UserGetUserInfo");
        let username = "";
        if (request_response.data["result"] == 0) {
          username = request_response.data["user"]["username"]
        }
        console.log("username: " + username)
        dispatch({
          type: SET_BASE_USER,
          data: {
            token: logonToken,
            username: username
          }
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(toggleLoading(false));
    }
  }

  useEffect(() => {
    initFetch();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName = "Mainuser"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="CouponListing" component={CouponListingScreen} />
        <Stack.Screen name="forgetPassword" component={forgetPasswordScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="CouponItem" component={CouponItemScreen} />
        <Stack.Screen name="CouponQRCode" component={CouponQRCodeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

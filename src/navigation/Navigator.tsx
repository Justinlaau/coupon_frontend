import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MainScreen from '../screens/MainScreen/MainScreen';
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
import { connectWebSocket } from '../screens/Websocket/Websocket';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  const dispatch = useDispatch();

  const initFetch = () => {
    try {
      dispatch(toggleLoading(true));
      const logonToken = AsyncStorage.getItem('jwt');
      if (logonToken != null) {

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
        initialRouteName = "Main"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="CouponListing" component={CouponListingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="CouponItem" component={CouponItemScreen} />
        <Stack.Screen name="CouponQRCode" component={CouponQRCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

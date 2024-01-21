import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LoginScreen from './src/screens/LoginScreen/LoginScreen'; // Assuming the LoginScreen component is in the same directory
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import {Provider} from 'react-redux';
import Store from './Redux/Store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useDispatch } from 'react-redux';
import { SET_BASE_USER } from './Redux/Action/ActionType';

import Geolocation from '@react-native-community/geolocation';
const locationConfig = {
  skipPermissionRequests: true,
  enableBackgroundLocationUpdates: true,
}
import { socket } from './src/socket';

Geolocation.setRNConfiguration(locationConfig);

const App = () => {
  const setToken = async () => {
    const token = await AsyncStorage.getItem('jwt') || "";
    console.log(token)
    axios.defaults.headers.common['Authorization'] = token;
    socket.auth = { token: token };
    socket.connect();
    return token;
  }

  useEffect(() => {
    setToken();
  }, []);

  return (
    <Provider store={Store}>
      <Navigator />
    </Provider>
  );
};

export default App;
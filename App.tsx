import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LoginScreen from './src/screens/LoginScreen/LoginScreen'; // Assuming the LoginScreen component is in the same directory
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import {Provider} from 'react-redux';
import Store from './Redux/Store/Store';


const App = () => {
  return (
    <Provider store={Store}>
      <Navigator />
    </Provider>
  );
};

export default App;
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LoginScreen from './src/screens/LoginScreen/LoginScreen'; // Assuming the LoginScreen component is in the same directory
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator'

const App = () => {
  return (
    // <NavigationContainer>
    <Navigator />
    // </NavigationContainer>
  );
};

export default App;
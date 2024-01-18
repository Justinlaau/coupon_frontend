import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MainScreen from '../screens/MainScreen/MainScreen';

import { NavigationContainer } from '@react-navigation/native';
import CouponListingScreen from '../screens/CouponListingScreen/CouponListingScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import WalletScreen from '../screens/WalletScreen/WalletScreen';
import { BusinessInformationFormScreen } from '../screens/BusinessInformationFormScreen/InformationScreen';
import forgetPasswordScreen from '../screens/forgetPasswordScreen/forgetPasswordScreen';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BusinessInformationFormScreen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="CouponListing" component={CouponListingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="forgetPassword" component={forgetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

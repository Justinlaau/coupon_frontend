import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MainScreen from '../screens/MainScreen/MainScreen';

import {NavigationContainer} from '@react-navigation/native';
import CouponListingScreen from '../screens/CouponListingScreen/CouponListingScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import WalletScreen from '../screens/WalletScreen/WalletScreen';
import CouponItemScreen from '../screens/CouponItemScreen/CouponItemScreen';
import CouponQRCodeScreen from '../screens/QRCode/CouponQRCodeScreen';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName = "Wallet"
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

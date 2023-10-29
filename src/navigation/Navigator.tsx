import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MainScreen from '../screens/MainScreen/MainScreen';

import {NavigationContainer} from '@react-navigation/native';
import CouponListingScreen from '../screens/CouponListingScreen/CouponListingScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName = "Main"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="CouponListing" component={CouponListingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

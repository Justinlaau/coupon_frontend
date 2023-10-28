import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from '../screens/LoginScreen/LoginScreen'
import MainScreen from '../screens/MainScreen/MainScreen'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Main" component={MainScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MyStack
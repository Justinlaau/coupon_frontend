import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import TabBar from '../../components/templates/TabBar';
import Layout from '../../components/templates/Layout';
import LoginScreenStyle from './LoginScreenStyle';
import Background from '../../components/templates/Background';
import HeaderIcons from '../../components/atoms/HeaderIcons';
const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login logic here
        console.log('Logging in...');
    };

    return (

        <Layout>
            <Background />
            <HeaderIcons />
        </Layout>
    );
};

const loginStyle = StyleSheet.create({
    test: {
        // backgroundColor: 'red',
        height: '100%',
        width: '100%',
    }
})

export default LoginScreen;
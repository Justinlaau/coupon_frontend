import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import Background from '../../components/templates/Background';

const MainScreen = ({ navigation }) => {

    return (
        <View style={MainStyle.test}>
            <Text>hellow</Text>
            <Button
                title="Go to login"
                onPress={() => navigation.navigate('Login')}
            />
            <View>
                <Background />
            </View>
        </View>
    );
};

const MainStyle = StyleSheet.create({
    test: {
        backgroundColor: 'blue',
        height: '100%',
        width: '100%',
    }
})

export default MainScreen;
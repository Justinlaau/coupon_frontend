import React, { useState } from 'react';
import { 
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';



export default function KeyboardAvoidingWrapper({children}){
    return (
        <KeyboardAvoidingView style={{flex:1}}>
            <ScrollView >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
       
    );
}
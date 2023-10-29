import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text , SafeAreaView} from 'react-native';
import Background from '../../components/templates/Background';
import Layout from '../../components/templates/Layout';
import { MagnifierSVG } from '../../assets/images/MagnifierSVG';
import { ProfileSVG } from '../../assets/images/ProfileSVG';
import SearchSVG from '../../assets/images/SearchSVG';
import FontStyles from '../../styles/GlobalFontStyle';
import { InputBox } from '../../components/atoms/InputBox';
import { ButtonBox } from '../../components/atoms/ButtonBox';
const RegisterScreen = ({ navigation }) => {
    const InputRe = (props) => {
        return (
            <View style={{ height: "20%", width: "100%" }}>
            <InputBox text={props.Text}
                borderStyle={{ color: "white", borderRadius: 10, backgroundColor: "white" }}
                shadowStyle={{
                    shadowRadius: 20, shadowColor: 'black',
                    shadowOffset: { width: -100, height: -100 },
                    }} />
            </View>
        )
    }
    return (
        <Background>
            <View style={RegisterStyle.layout}>
                <Text style={[RegisterStyle.text, FontStyles.medium, FontStyles.bold, { color:"#DC2B37"}]}>Create account</Text>
                
                <View style={RegisterStyle.InputGroups}>
                        <InputRe Text="username" />
                        <View style={{ height: "10%" }}></View>
                        <InputRe Text="password" />
                        <View style={{ height: "10%" }}></View>
                        <InputRe Text="comfirm password"/>
                        <View style={{ height: "10%" }}></View>
                        <InputRe Text="email" />
                        <View style={RegisterStyle.ButtonContainer}>
                            <ButtonBox text="Submit"
                                borderStyle={{ borderRadius: 10 }}
                                color="#DC2B37"
                                textStyle={{ color: "white" }} action={() => { console.log("creatttttingg.....") }} />
                        </View>
                    </View>
            </View>
        </Background>
    )
}
const RegisterStyle = StyleSheet.create({
    layout: {
        height: "80%",
        width: "80%",
        alignItems: "center",
    },
    text: {
        height: "20%",
        textAlign: "center",
        justifyContent: "center",
        top: "8%"
    },
    InputGroups: {
        height: "50%",
        width : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    ButtonContainer: {
        height: "45%",
        width:"80%",
        justifyContent: "center",
        
    }
})

export default RegisterScreen;

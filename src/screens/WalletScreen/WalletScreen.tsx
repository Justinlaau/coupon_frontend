import React, { useState } from 'react';
import { View, 
         TextInput,
         StyleSheet,
         Text,
         SafeAreaView, 
         ScrollView, 
         Alert,
         TouchableOpacity} from 'react-native';
import Layout from '../../components/templates/Layout';
import {SvgXml} from 'react-native-svg';
import axios from 'axios';
import DateIconSVG from "../../assets/images/DateIconSVG";
import WalletBackground from '../../components/templates/WalletBackground';


import {
    NativeBaseProvider,
    VStack,
    Center,
    Stack,
    Box,
    Icon,
    Input,
    Container,
    Button,
  } from 'native-base';
import ActualCoupon from '../../components/atoms/ActualCoupon';

const WalletScreen = ({ navigation }) => {
    const [buttonState, setButtonState] = useState(1);


    const pressHandler = (button_id)=>{
        setButtonState(button_id)
    };

    return(
    <Layout>
        <WalletBackground main={true} contentHeight="82%" tabBarSpace={true} >
            <View style={{ flexDirection: 'row', justifyContent: "space-between"}}>  
                <View style={{ width:"35%", marginTop: "5%" , marginLeft: "10%"}}>
                    <TouchableOpacity onPress={()=>pressHandler(1)}
                    style={{
                        borderWidth: 2,
                        alignItems: 'center',
                        padding: 10,
                        borderColor: "#DC2B37",
                        borderRadius: 30,
                        backgroundColor: buttonState == 1 ? "#DC2B37" : "#FFF",
                        right: "10%"
                    }} >
                    <Text style={{
                        color: buttonState == 1 ? "#FFF" : "#DC2B37",
                        fontWeight: 'bold'}}>Reserved Coupon
                    </Text>
                    </TouchableOpacity>
                </View>

                <View style={{width:"35%", marginTop: "5%", marginRight: "10%" }}>
                    <TouchableOpacity onPress={()=>pressHandler(2)} 
                    style={{
                        borderWidth: 2,
                        alignItems: 'center',
                        padding: 10,
                        borderColor: buttonState == 2 ? "#FFF" : "#DC2B37",
                        borderRadius: 30,
                        backgroundColor: buttonState == 2 ? "#DC2B37" : "#FFF",
                        left: "10%"
                    }} >
                        
                    <Text style={{
                        color: buttonState == 2 ? "#FFF" : "#DC2B37",
                        fontWeight: 'bold'}}>Used Coupon
                    </Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{
                flex: 1,
                flexDirection: "row",
                alignItems:'flex-start',
                justifyContent: 'space-around',
                marginTop: "5%" 
                }}>
                <TouchableOpacity  style={{flex: 1, marginLeft: "55%", marginTop: 1}}>
                    <SvgXml width="100%" height="20" xml={DateIconSVG} />
                </TouchableOpacity>
                <Text style={{marginRight: "5%"}}>Arrange with Date</Text>
            </View>

            <ScrollView>
                <ActualCoupon />

            </ScrollView>


        </WalletBackground>
    </Layout>
       
    )
}

export default WalletScreen;

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

})

import { color } from "@rneui/base";
import React from "react";
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity} from "react-native";
import GiftIcon from 'react-native-vector-icons/FontAwesome'


const chin_subtitle ={
    1000: "港幣千元現金券",
    20: "港幣二十元現金券",
    100: "港幣一百元現金券"
}

const eng_subtitle = {
    1000: "ONE THOUSAND",
    20: "TWENTY",
    100: "ONE HUNDRED",
}

const backgroundColor = {
    1000: "#ff5733",
    20: "#ff7e15",
    100: "#FFC300",
}


const ActualCoupon = props =>{
    return (
        <View style={styles.container} >
            <View style={{
                width: deviceWidth - 20,
                flexDirection: "row",
                backgroundColor: "#ff5733",
                height: 200,
                borderRadius: radius,

                shadowColor: '#000',
                shadowOffset:{
                    width: 5,
                    height: 5
                },
                shadowRadius: 5,
                shadowOpacity: 0.75,
                elevation: 10,}}
            >

                <Image style={styles.imageStyle} source={props.image} />
                <View style={styles.CouponDescription}>
                    <GiftIcon name="gift" size={30} style={{color: 'white'}}/>
                    {/* props.text */}
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'white',
                            marginTop:'20%'}}>
                            {props.companyName}
                        </Text>
                        <Text style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: 'white'}}>
                            {chin_subtitle[props.value]}
                        </Text >

                        <Text style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: 'white'}}>
                            {eng_subtitle[props.value]}
                        </Text >

                        <Text style={{
                            fontSize: 6,
                            fontWeight: 'bold',
                            color: 'white',
                            }} >
                            HONG KONG DOLLARS CASHVOCHER
                        </Text>
                        <Text style={{fontSize: 45, color: 'white'}}><Text style={{fontSize: 35}}>$</Text>{props.value}</Text>
                </View>
            </View>
        </View>


    )
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const radius = 20;
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '7%',
    },
    imageStyle:{
        height: 200,
        width: "60%",
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius,
    },

    CouponDescription:{
        padding: 10,
    },
})

export default ActualCoupon;





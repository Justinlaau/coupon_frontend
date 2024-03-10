import { position } from 'native-base/lib/typescript/theme/styled-system';
import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image } from 'react-native';

interface ShopType{
    shopName: string
}

interface CouponType{
    couponName: string
}

interface SearchContextType{
    navigation: any,
    shop: any[],
    coupon: any[]
}

const screenHeight = Dimensions.get("window").height;

const SearchContext = (props : SearchContextType) => {
    return (

        <View style={{position:"absolute", width: "120%", height: screenHeight, zIndex: 300, backgroundColor: "#f0f0f0", overflow: "hidden", top: "8%"}}>
            {props.shop.length === 0? <></>: 
                <>
                    <View style={{height: "5%", justifyContent: "center"}}>
                        <Text style={styles.font}> 商舖 </Text>
                    </View>
                    {props.shop.map((item, index) => (
                        <>
                        <TouchableOpacity style={styles.itms} onPress={() => (props.navigation.navigate("BusinessInformationScreen"))}>
                            <Image source={require("../../assets/images/icon.png")}
                                style={{
                                    width: "10%",
                                    height: "50%"
                                }}
                                />
                            <Text style={styles.font}>{item}</Text>
                        </TouchableOpacity>
                        <View style={styles.line}/>
                        </>
                    ))}
                </>
            }

            {props.coupon.length === 0? <></>:
                <>
                    <View style={{height: "5%", justifyContent: "center"}}>
                        <Text style={styles.font}> 優惠卷 </Text>
                    </View>
                    {props.coupon.map((item, index) => (
                        <>
                        <TouchableOpacity style={styles.itms} onPress={() => (props.navigation.navigate("BusinessInformationScreen"))}>
                            <Image source={require("../../assets/images/icon.png")}
                                style={{
                                    width: "10%",
                                    height: "50%"
                                }}
                                />
                            <Text style={styles.font}>{item}</Text>
                        </TouchableOpacity>
                        <View style={styles.line}/>
                        </>
                    ))}
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    font: {
        fontSize: 20,
        color: "black",
    },
    itms: {
        paddingLeft: "3%",
        height: "10%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    line: {
        width: "100%",
        height: 2,
        backgroundColor: "white"
    }
})

export default SearchContext;
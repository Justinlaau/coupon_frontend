import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import WelcomeSVG from "../../assets/images/Notification/WelcomeSVG";
import { SvgXml } from "react-native-svg";
import AdvertisementSVG from "../../assets/images/Notification/AdvertisementSVG";

interface NotificationDomTypes{
    title: string,
    issueDate: Date,
    messageType: string,
    shortMessage: string,
    longMessage: string | undefined,
}

interface typeToSvG{
    [key: string]: string;
}


const NotificationDom = (props: NotificationDomTypes) => {
    const messageTypeToSVG: typeToSvG = {
        "Welcome": WelcomeSVG,
        "Advertisement": AdvertisementSVG
    }
    return (
        <View style={styles.container}>
            <View style={styles.svgContainer}>
                <SvgXml width={"100%"} height={"100%"} xml={messageTypeToSVG[props.messageType]}/>
            </View>
            <View style={styles.messageContainer}>
                <View style={styles.headContainer}>
                    <Text style={styles.textHeading}>
                        {props.title}
                    </Text>
                    <Text style={styles.textHeading}>
                        {props.issueDate.toLocaleDateString(undefined, { weekday: 'long' , year: 'numeric', month: 'long', day: 'numeric' })}
                    </Text>
                </View>

                <View style={styles.shortMessageContainer}>
                    <Text style={styles.shortMessage}>
                        {props.shortMessage}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        borderRadius: 10,
        marginTop: "3%",

        shadowColor: "#000",
        shadowOpacity: 1,
        shadowOffset: {
            height: 5,
            width: 5
        },
        elevation: 5
    },
    svgContainer: {
        width: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }, 
    messageContainer:{
        marginLeft: "3%",
        marginRight: "3%",
        width: "84%",
        height: "100%",
        display: "flex"
    },
    headContainer:{
        width: "100%",
        marginTop: "2%",
        height: "20%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    shortMessageContainer:{
        height: "76%",
        width: "100%",
        marginTop: "2%",
    },
    textHeading:{
        fontSize: 17,
        color: "orange"
    },
    shortMessage:{
        fontSize: 15,
        color: "black"
    }
})
export default NotificationDom;
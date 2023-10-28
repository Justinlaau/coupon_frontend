import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import SelectionSVG from '../../assets/images/SelectionSVG';
import { CouponGoSVG } from '../../assets/images/CouponGo';
import { NotificationSVG } from '../../assets/images/Notification';

import { SvgXml } from 'react-native-svg';

const HeaderIcons = () => {
    return (
        <View style={HeaderIconsStyle.container}>
            <View style={HeaderIconsStyle.header}>
                <SvgXml xml={SelectionSVG} height={"100%"} ></SvgXml>

                <SvgXml xml={CouponGoSVG} height={"100%"} ></SvgXml>

                <SvgXml xml={NotificationSVG} height={"100%"}></SvgXml>

            </View>
        </View>
    )
}

const HeaderIconsStyle = StyleSheet.create({
    header: {
        height: "3%",
        width: "100%",
        paddingLeft: "5%",
        paddingRight: "5%",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        backgroundColor: "#DC2B37",
        paddingTop: "7%",
        alignContent: "center"
    }
})


export default HeaderIcons;

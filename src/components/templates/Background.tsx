import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BaseLeftSVG } from '../../assets/images/BaseLeftSVG';
import { ProfileSVG } from '../../assets/images/ProfileSVG';
import { BaseRightSVG } from '../../assets/images/BaseRightSVG';
import { CatSVG } from '../../assets/images/CatSVG';
const Background = () => {
    return (
        <View style={BackgroundStyle.redView}>
            <View style={BackgroundStyle.container}>
                <View style={BackgroundStyle.CatView}>
                    <SvgXml width='170' xml={CatSVG} ></SvgXml>
                </View>
                <View style={BackgroundStyle.BaseLeftSVG}>
                    <SvgXml width='130' xml={BaseLeftSVG}></SvgXml>
                </View>
                <View style={BackgroundStyle.BaseRightSVG}>
                    <SvgXml height='130' xml={BaseRightSVG}></SvgXml>
                </View>
                <View style={BackgroundStyle.whiteView} />
            </View>
        </View>
    );
};

const BackgroundStyle = StyleSheet.create({
    redView: {
        height: "100%",
        width: "100%",
        backgroundColor: "#DC2B37",
        justifyContent: 'flex-end',
    },
    container: {
        zIndex: 1,
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',

    },
    whiteView: {
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        height: "73%",
        width: "100%",
        backgroundColor: "#FBFBFC",
        zIndex: 3,
    },

    CatView: {
        zIndex: 7,
        top: "7%",
        flex: 1,
        alignItems: 'center',
        resizeMode: 'contain'
    },
    BaseLeftSVG: {
        left: "-10%",
        top: "7%",
        alignItems: 'flex-start',
        resizeMode: 'contain',
        zIndex: 2
    },
    BaseRightSVG: {
        alignItems: 'flex-end',
        resizeMode: 'contain',
        zIndex: 3
    }
});

export default Background;
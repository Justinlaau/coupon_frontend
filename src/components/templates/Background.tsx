import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BaseLeftSVG} from '../../assets/images/BaseLeftSVG';
import {ProfileSVG} from '../../assets/images/ProfileSVG';
import {BaseRightSVG} from '../../assets/images/BaseRightSVG';
import {CatSVG} from '../../assets/images/CatSVG';
import HeaderIcons from '../atoms/HeaderIcons';
import { Dimensions, ScrollView} from 'react-native';
const { height } = Dimensions.get('window');
const Background = (props: any) => {
    const rec = () => console.log("to verify!~");
    return (
        <View style={[BackgroundStyle.redView, { height }]}>
            <View style={[BackgroundStyle.container]}>
                <View style={[BackgroundStyle.headerContainer]}>
                    <HeaderIcons />
                </View>
                <View style={[BackgroundStyle.CatView]}>
                    <SvgXml width="150" xml={CatSVG} />
                </View>
                <View style={[BackgroundStyle.BaseLeftSVG]}>
                    <SvgXml width="120" xml={BaseLeftSVG} />
                </View>
                
                <View style={[BackgroundStyle.BaseRightSVG]}>
                    <SvgXml width="270" height="270" xml={BaseRightSVG} />
                </View>
                <View style={[BackgroundStyle.whiteView]}>
                    {props.children}
                </View>
            </View>
        </View>
    );
};

const BackgroundStyle = StyleSheet.create({
    redView: {
        height: '100%',
        width: '100%',
        backgroundColor: '#DC2B37',
        position:"absolute"
    },
    headerContainer: {
        position: "absolute",
        top:"4.4%"
    },
    container: {
        zIndex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: "column",
        position: "absolute"
    },
    whiteView: {
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        height: '78%',
        width: '100%',
        backgroundColor: '#FBFBFC',
        zIndex: 2,
        position: "absolute",
        bottom: "0%",

        alignItems:"center"
    },

    CatView: {
        zIndex: 7,
        top: '2%',
        height: "21%",
        alignItems: 'center',
        resizeMode: 'contain',
        position: "absolute",
    },
    BaseLeftSVG: {
        position: 'absolute',
        left: '-5%',
        top: '7%',
        alignItems: 'flex-start',
        resizeMode: 'contain',
        zIndex: 2,
    },
    BaseRightSVG: {
        position: 'absolute',
        top: '0%',
        right: '0%',
        alignItems: 'flex-end',
        resizeMode: 'contain',
        zIndex: 2,
    },
});

export default Background;

import React from 'react';
import TabBar from './TabBar';
import { View, StyleSheet, Text, Image } from 'react-native';
import Background from './Background';

export default function Layout(props: any) {
    return (
        <View style={LayoutStyle.layout}>
            {props.children}
            <TabBar />

        </View>
    )
}

const LayoutStyle = StyleSheet.create({
    layout: {
        height: '100%',
        width: '100%',
    }

})
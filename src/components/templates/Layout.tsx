import React from 'react';
import TabBar from './TabBar';
import { View, StyleSheet, Text, Image } from 'react-native';
import Background from './Background';
import { Dimensions, ScrollView } from 'react-native';
const { height } = Dimensions.get('window');
export default function Layout(props: any) {
    return (
        <View style={[LayoutStyle.layout, { height }]}>
            
            {props.children}
            <TabBar />
            
        </View>
    )
}

const LayoutStyle = StyleSheet.create({
    layout: {
        width: '100%',
    }

})
import React from 'react';
import TabBar from './TabBar';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import Background from './Background';
const { height } = Dimensions.get('window');
export default function Layout(props: {children: any, showTabBar: Boolean}) {
  
  const { height } = Dimensions.get('window');
  return (
    <View style={[LayoutStyle.layout, {height}]}>
      {props.children}
      {
        props.showTabBar ? <TabBar /> : null
      }
    </View>
  );
}

const LayoutStyle = StyleSheet.create({
  layout: {
    height: '100%',
    width: '100%',
  },
});


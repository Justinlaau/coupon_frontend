import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import SelectionSVG from '../../assets/images/SelectionSVG';
import {CouponGoSVG} from '../../assets/images/CouponGo';
import {NotificationSVG} from '../../assets/images/Notification';

import {SvgXml} from 'react-native-svg';

const HeaderIcons = () => {
  return (
    <View style={HeaderIconsStyle.container}>
      <View style={HeaderIconsStyle.header}>
        <SvgXml xml={SelectionSVG} height={'100%'} fill="white"/>
        <SvgXml xml={CouponGoSVG} height={'100%'} />
        <SvgXml xml={NotificationSVG} height={'100%'} />
      </View>
    </View>
  );
};

const HeaderIconsStyle = StyleSheet.create({
  header: {
    height: '3%',
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: 'white',
    paddingTop: '7%',
    alignContent: 'center',
    zIndex:10,
  },
});

export default HeaderIcons;

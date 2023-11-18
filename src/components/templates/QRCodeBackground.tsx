import React from 'react';
import {StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BaseLeftSVG} from '../../assets/images/BaseLeftSVG';
import {ProfileSVG} from '../../assets/images/ProfileSVG';
import {BaseRightSVG} from '../../assets/images/BaseRightSVG';
import LeftArrow from '../../assets/images/LeftArrow';
import {CatSVG} from '../../assets/images/CatSVG';

import { Dimensions, TouchableOpacity } from 'react-native';
import {
  NativeBaseProvider,
  VStack,
  Center,
  Stack,
  Box,
  ScrollView,
  Input,
  Icon,
  ZStack,
  View,
  Heading,
  Hidden,
  Pressable,
} from 'native-base';

const QRCodeBackground = ( props ) => {
  const { height } = Dimensions.get('window');
  return (
    <NativeBaseProvider>
      <View style={[BackgroundStyle.container, {height}]}>
        <View style={{position: "absolute", width: 30, top: 30, left: 10, zIndex: 50}}>
          <TouchableOpacity onPress={() => props.goBack()}>
            <SvgXml width="30" height="30" xml={LeftArrow} />
          </TouchableOpacity>
        </View>
        <View style={BackgroundStyle.BaseLeftSVG}>
          <SvgXml width="100%" xml={BaseLeftSVG} />
        </View>
        <View style={BackgroundStyle.BaseRightSVG}>
          <SvgXml width="100%" height="270" xml={BaseRightSVG} />
        </View>
        {props.children}
      </View>
    </NativeBaseProvider>
  );
};

const BackgroundStyle = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 50,
    height: '100%',
    width: '100%',
    backgroundColor: '#DC2B37',
  },
  BaseLeftSVG: {
    position: 'absolute',
    left: '-8%',
    bottom: '-2%',
    width: '35%',
    alignItems: 'flex-start',
    resizeMode: 'contain',
  },
  BaseRightSVG: {
    position: 'absolute',
    bottom: '-2%',
    right: '-10%',
    width: '66%',
    alignItems: 'flex-end',
    resizeMode: 'contain',
  },

});

export default QRCodeBackground;

import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BaseLeftSVG} from '../../assets/images/BaseLeftSVG';
import {BaseRightSVG} from '../../assets/images/BaseRightSVG';
import {CatSVG} from '../../assets/images/CatSVG';
import LeftArrow from '../../assets/images/LeftArrow';
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
} from 'native-base';

const Background = ( props ) => {
  const { height } = Dimensions.get('window');
  return (
    <NativeBaseProvider>
      <View style={[BackgroundStyle.container, {height}]}>
          {
            props.showGoBack ? (
              <>
                <View style={{position: "absolute", width: 30, top: 30, left: 10, zIndex: 50}}>
                  <TouchableOpacity onPress={() => props.goBack()}>
                    <SvgXml width="30" height="30" xml={LeftArrow} />
                  </TouchableOpacity>
                </View>          
              </>
            ) : null
          }
          {
            props.main ? (
              <>
                <View style={BackgroundStyle.BaseLeftSVG}>
                  <SvgXml width="100%" xml={BaseLeftSVG} />
                </View>
                <View style={BackgroundStyle.BaseRightSVG}>
                  <SvgXml width="100%" height="270" xml={BaseRightSVG} />
                </View>
              </>
            ) : null
          }
          <View h={props.contentHeight} style={[BackgroundStyle.whiteView, props.overflow? {overflow: 'hidden'}: {}]} bottom={props.tabBarSpace ? "8%" : "0%"}>
          { props.main ? (
              <>
                <Heading
                  w="100%"
                  style={BackgroundStyle.Heading}
                  textAlign={'center'}
                  color="light.50"
                >
                  COUPON GO!
                </Heading>
                <View style={BackgroundStyle.CatView}>
                  <SvgXml height="80%" xml={CatSVG} />
                </View>
              </>
            ) : null        
          }
          <Box position="relative" h="100%" w="100%">
            {props.children}
          </Box>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const BackgroundStyle = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: '#DC2B37',
    zIndex: 10,
  },
  Heading: {
    position: 'absolute',
    top: '-19%',
    fontSize: 27
  },
  whiteView: {
    position: 'absolute',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  CatView: {
    position: 'absolute',
    zIndex: 7,
    top: '-15%',
    left: '50%',
    transform: [{ translateX: -105}],
    height: '20%'
  },
  BaseLeftSVG: {
    position: 'absolute',
    left: '-5%',
    top: '5%',
    width: '30%',
  },
  BaseRightSVG: {
    position: 'absolute',
    top: '-4%',
    right: '0%',
    width: '66%',
    resizeMode: 'contain',
  },
});

export default Background;

import React from 'react';
import {StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BaseLeftSVG} from '../../assets/images/BaseLeftSVG';
import {ProfileSVG} from '../../assets/images/ProfileSVG';
import {BaseRightSVG} from '../../assets/images/BaseRightSVG';
import {CatSVG} from '../../assets/images/CatSVG';

import { Dimensions } from 'react-native';
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

const Background = props => {
  const { height } = Dimensions.get('window');
  return (
    <NativeBaseProvider>
      <View style={[BackgroundStyle.container, {height}]}>
        { props.main ? (
          <><Heading
            w="100%"
            style={BackgroundStyle.Heading}
            size="xl"
            textAlign={'center'}
            color="light.50">
            COUPON GO!
          </Heading><View style={BackgroundStyle.CatView}>
              <SvgXml width="100%" xml={CatSVG} />
            </View><View style={BackgroundStyle.BaseLeftSVG}>
              <SvgXml width="100%" xml={BaseLeftSVG} />
            </View><View style={BackgroundStyle.BaseRightSVG}>
              <SvgXml width="100%" height="270" xml={BaseRightSVG} />
            </View></>
         ) : null        
        }
        {
          props.listing ? (
            <>
            </>
          ) : null
        }
        <View h={props.contentHeight} style={BackgroundStyle.whiteView} bottom={props.tabBarSpace ? "8%" : "0%"}>{props.children}</View>
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
  Heading: {
    position: 'absolute',
    zIndex: 7,
    top: '2%',
  },
  whiteView: {
    position: 'absolute',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    width: '100%',
    backgroundColor: '#FBFBFC',
    zIndex: 3,
  },

  CatView: {
    position: 'absolute',
    zIndex: 7,
    top: '4.3%',
    left: '28%',
    width: '44%',
  },
  BaseLeftSVG: {
    position: 'absolute',
    left: '-5%',
    top: '7%',
    width: '30%',
    alignItems: 'flex-start',
    resizeMode: 'contain',
    zIndex: 2,
  },
  BaseRightSVG: {
    position: 'absolute',
    top: '0%',
    right: '0%',
    width: '66%',
    alignItems: 'flex-end',
    resizeMode: 'contain',
    zIndex: 3,
  },

});

export default Background;

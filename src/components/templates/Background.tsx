import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BaseLeftSVG} from '../../assets/images/BaseLeftSVG';
import {ProfileSVG} from '../../assets/images/ProfileSVG';
import {BaseRightSVG} from '../../assets/images/BaseRightSVG';
import {CatSVG} from '../../assets/images/CatSVG';

const Background = props => {
  return (
    <View style={BackgroundStyle.redView}>
      <View style={BackgroundStyle.container}>
        <View style={BackgroundStyle.CatView}>
          <SvgXml width="150" xml={CatSVG} />
        </View>
        <View style={BackgroundStyle.BaseLeftSVG}>
          <SvgXml width="100" xml={BaseLeftSVG} />
        </View>
        <View style={BackgroundStyle.BaseRightSVG}>
          <SvgXml width="270" height="270" xml={BaseRightSVG} />
        </View>
        <View style={BackgroundStyle.whiteView}>{props.children}</View>
      </View>
    </View>
  );
};

const BackgroundStyle = StyleSheet.create({
  redView: {
    height: '100%',
    width: '100%',
    backgroundColor: '#DC2B37',
    justifyContent: 'flex-end',
  },
  container: {
    zIndex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteView: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: '74%',
    width: '100%',
    backgroundColor: '#FBFBFC',
    zIndex: 3,
  },

  CatView: {
    zIndex: 7,
    top: '7%',
    flex: 1,
    alignItems: 'center',
    resizeMode: 'contain',
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
    zIndex: 3,
  },
});

export default Background;

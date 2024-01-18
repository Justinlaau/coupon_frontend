import React from 'react';
import {View, StyleSheet, Text, Image, Button, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import * as bottomIcon from '../../assets/images/BottomIcon';
import {Trans, useTranslation} from 'react-i18next';
import LanguageButton from '../atoms/LanguageButton';
import FontStyles from '../../styles/GlobalFontStyle';
import { useNavigation } from '@react-navigation/native';


class TabItem {
  constructor(image: any, text: any) {
    this.image = image;
    this.text = text;
  }
  getTabItem() {
    const {t, i18n} = useTranslation();
    return (
      <View style={TabBarStyle.TabItems} >
        <View style={TabBarStyle.TabBarIcon}>
          <SvgXml width={'20'} xml={this.image} />
        </View>
        <Text
          style={[
            TabBarStyle.IconDescription,
            FontStyles.small,
            FontStyles.bold,
          ]}>
          {t(this.text)}
        </Text>
      </View>
    );
  }
  getCenterItem() {
    const {t, i18n} = useTranslation();
    return (
      <View style={TabBarStyle.TabItems}>
        <View style={TabBarStyle.CenterIcon}>
          <SvgXml width={'40'} xml={this.image} />
        </View>
        <Text
          style={[
            TabBarStyle.CenterIconDescription,
            FontStyles.small,
            FontStyles.bold,
          ]}>
          {t(this.text)}
        </Text>
      </View>
    );
  }
}

const TabBar = () => {
  const TabItem1JSX = new TabItem(
    bottomIcon.bottom_icon_1,
    'Main',
  ).getTabItem();
  const TabItem2JSX = new TabItem(
    bottomIcon.bottom_icon_2,
    'Today',
  ).getTabItem();
  const TabItem3JSX = new TabItem(
    bottomIcon.bottom_icon_cat,
    "Let's Go!",
  ).getCenterItem();
  const TabItem4JSX = new TabItem(
    bottomIcon.bottom_icon_3,
    'Clock',
  ).getTabItem();
  const TabItem5JSX = new TabItem(
    bottomIcon.bottom_icon_4,
    'Q wallet',
  ).getTabItem();
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  return (
    
    <View style={TabBarStyle.TabBar}>
 
        <View style={TabBarStyle.ItemContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            {TabItem1JSX}
        </TouchableOpacity>
        </View>

        <View style={TabBarStyle.ItemContainer}>
          <TouchableOpacity >
            {TabItem2JSX}
          </TouchableOpacity>
        </View>

      
        <View style={TabBarStyle.ItemContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Map')}>
            {TabItem3JSX}
          </TouchableOpacity>
        </View>
      
      <View style={TabBarStyle.ItemContainer}>{TabItem4JSX}</View>

      <View style={TabBarStyle.ItemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
          {TabItem5JSX}
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const TabBarStyle = StyleSheet.create({
  TabBar: {
    backgroundColor: '#FBFBFC',
    position: 'absolute',
    zIndex: 97,
    bottom: 0,
    height: '8%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -5},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    flexDirection: 'row',
    paddingLeft: '5%',
    paddingRight: '5%',
    flex: 1,
  },
  ItemContainer: {
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  TabItems: {
    height: '100%',
    marginLeft: '5%',
    marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  TabBarIcon: {
    height: '50%',
    resizeMode: 'contain',
  },
  IconDescription: {
    textAlign: 'center',
    color: '#AD3B41',
  },
  CenterIconDescription: {
    textAlign: 'center',
    color: '#AD3B41',
    // marginTop: 38,
    aspectRatio: 10,
    top: '25%',
  },
  CenterIcon: {
    position: 'absolute',
    height: '200%',
    resizeMode: 'contain',
  },
});

export default TabBar;

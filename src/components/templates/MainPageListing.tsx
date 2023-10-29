import React, {useState} from 'react';
import axios from 'axios';
import {StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import CouponCard from '../atoms/CouponCard';
import PopularSVG from '../../assets/images/PopularSVG';
import MerchantSVG from '../../assets/images/MerchantSVG';
import PositionSVG from '../../assets/images/PositionSVG';
import CategorySVG from '../../assets/images/CategorySVG';


import {
  View,
} from 'react-native';
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
  Heading,
  Text,
  HStack,
} from 'native-base';

const MainPageListing = (props) => {
  // image source should from parent
  const addFunc = () => {
    console.log("Helo World Adding Coupon")
  }

  return (
    <NativeBaseProvider>
      <VStack >
        {
          Array(20).fill(1).map((el, i) =>
            <HStack  w="100%" mb="4" py="4" key={i}>
              <CouponCard marb="0" imgSource="https://picsum.photos/200" imgAlt="test" merchantName="木作坊家品有限公司" couponDetail="$100現金卷" addFunc={() => addFunc()}/>
              <CouponCard marb="0" imgSource="https://picsum.photos/200" imgAlt="test" merchantName="木作坊家品有限公司" couponDetail="$100現金卷" addFunc={() => addFunc()}/>
            </HStack>
          )
        }
      </VStack>
    </NativeBaseProvider>
  );
};

const MainPageListingStyle = StyleSheet.create({
  
});

export default MainPageListing;

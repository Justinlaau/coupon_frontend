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
import { BASE_S3_IMG_URL, BASE_URL } from '../../config/config';


const MainPageListing = (props) => {
  
  const addFunc = async (couponGroupId, expireDate) => {
    let {data} = await axios.post(BASE_URL + "coupon/addCoupon", {
      "coupon_group_id": couponGroupId,
      "total": 1,
      "client_id": "1", // fake client id
      "expire_date": expireDate
    })
    console.log("Helo World Adding Coupon")
  }

  return (
    <NativeBaseProvider>
      <VStack style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        {
          props.couponGroups.map((el, i) => 
            <Box w="50%" mb="4" py="4" key={i}>
              <CouponCard useYellowAdd={true} marb="0" imgSource={BASE_S3_IMG_URL + el["image"]} imgAlt={el["title"]} merchantName={el["owner_name"]} couponDetail={el["title"]} 
                          addFunc={() => addFunc(el["coupon_group_id"], el["expire_date"])}/>
            </Box>
          )
        }
      </VStack>
    </NativeBaseProvider>
  );
};

const MainPageListingStyle = StyleSheet.create({
  
});

export default MainPageListing;

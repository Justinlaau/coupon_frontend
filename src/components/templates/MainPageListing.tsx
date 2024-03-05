import React, {PropsWithChildren, useState} from 'react';
import axios from 'axios';
import {StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import CouponCard from '../atoms/CouponCard';
import PopularSVG from '../../assets/images/PopularSVG';
import MerchantSVG from '../../assets/images/MerchantSVG';
import PositionSVG from '../../assets/images/PositionSVG';
import CategorySVG from '../../assets/images/CategorySVG';
import { TOGGLE_INFO_POPUP, SET_INFO_MESSAGE, TOGGLE_ERROR_POPUP, SET_ERROR_MESSAGE } from '../../../Redux/Action/ActionType';
import { toggleMessagePopup, setMessagePopup } from '../../../Redux/Action/CommonAction';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  ViewStyle,
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
  HStack
} from 'native-base';
import { Alert } from 'react-native';
import BASE_S3_IMG_URL, { BASE_URL } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MainPageListingProps = PropsWithChildren<{style: ViewStyle, couponGroups: any, infoPopup: boolean, toggleInfo: any, setInfoMessage: any}>;

const MainPageListing: React.FC<MainPageListingProps> = (props) => {
  const dispatch = useDispatch();
  
  const addFunc = async (couponGroupId: string, expireDate: string) => {
    if(!await AsyncStorage.getItem("jwt")){
      Alert.alert("登入后才可使用COUPONGO優惠服務");
    }else{
      if (props.infoPopup) {
        props.toggleInfo(false);
        return;
      }
      props.setInfoMessage("操作中");
      props.toggleInfo(true);
      // console.log("adding coupon");
      let {data} = await axios.post(BASE_URL + "coupon/addCoupon", {
        "coupon_group_id": couponGroupId,
        "total": 1
      })
  
      if ( data["result"] == 0 ) {
        props.setInfoMessage("成功！！！");
        props.toggleInfo(true);
      } else {
        dispatch(setMessagePopup("你只可以添加同一優惠卷最多5張！", SET_ERROR_MESSAGE));
        dispatch(toggleMessagePopup(true, TOGGLE_ERROR_POPUP));
      }
    }
  }

  // props.couponGroups.map((el, i)=>{
  //   console.log(BASE_S3_IMG_URL + el["image"]);
  // });

  return (
    <NativeBaseProvider>
      <VStack style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        {
          props.couponGroups.map((el, i) => 
            <Box w="50%" py="3" key={i}>
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

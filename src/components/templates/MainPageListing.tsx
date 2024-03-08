import React, {PropsWithChildren, useEffect, useState} from 'react';
import axios from 'axios';
import {StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import {SvgXml} from 'react-native-svg';
import CouponCard from '../atoms/CouponCard';
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

type MainPageListingProps = PropsWithChildren<{style: ViewStyle, infoPopup: boolean, toggleInfo: any, setInfoMessage: any, navigation: any}>;

const MainPageListing: React.FC<MainPageListingProps> = (props) => {
  const dispatch = useDispatch();
  const [couponGroups, setCouponGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  
  const fetchCouponGroups = async () => {
    try {
      setIsLoading(true);
      if (reachedEnd) {
        return;
      }
      let {data} = await axios.post(BASE_URL + "coupon/fetch-coupon-groups-by-page", {
        page: page
      })
      if (data && data.result == 0) {
        let prevCouponGroups = couponGroups;
        let newCouponGroups = data.couponGroups;
        let totalRecord = data.total;
        
        prevCouponGroups = prevCouponGroups.concat(newCouponGroups);
        setCouponGroups(prevCouponGroups);
        setTotalRecord(totalRecord);
        setPage(page + 1);
      }
    } catch (error) {
      console.log("error")
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  const addFunc = async (couponGroupId: string, expireDate: string) => {
    if(!await AsyncStorage.getItem("jwt")){
      Alert.alert("登入后才可使用COUPONGO優惠服務");
    }else{

      props.setInfoMessage("操作中");
      props.toggleInfo(true);
      let {data} = await axios.post(BASE_URL + "coupon/addCoupon", {
        "coupon_group_id": couponGroupId,
        "total": 1
      })
      // console.log("adding coupon");
  
      if ( data["result"] == 0 ) {
        props.setInfoMessage("成功");
        props.toggleInfo(true);
      } else {
        dispatch(setMessagePopup("你只可以添加同一優惠卷最多5張！", SET_ERROR_MESSAGE));
        dispatch(toggleMessagePopup(true, TOGGLE_ERROR_POPUP));
      }
    }
  }

  const ListEndLoader = () => {
    if (!reachedEnd && isLoading) {
      return <ActivityIndicator />;
    }
  }

  useEffect(() => {
    fetchCouponGroups();
  }, []);

  useEffect(() => {
    if (totalRecord != -1 && couponGroups.length >= totalRecord) {
      setReachedEnd(true);
    }
  }, [couponGroups])

  // props.couponGroups.map((el, i)=>{
  //   console.log(BASE_S3_IMG_URL + el["image"]);
  // });

  return (
    <NativeBaseProvider>
      {/* <VStack style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        {
          props.couponGroups.map((el, i) => 
            <Box w="50%" py="3" key={i}>
              <CouponCard useYellowAdd={true} marb="0" imgSource={BASE_S3_IMG_URL + el["image"]} imgAlt={el["title"]} merchantName={el["owner_name"]} couponDetail={el["title"]} 
                addFunc={() => addFunc(el["coupon_group_id"], el["expire_date"])}
                navigation={props.navigation}            
              />
            </Box>
          )
        }
      </VStack> */}
      <FlatList
          data={couponGroups}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => fetchCouponGroups()}
          onEndReachedThreshold={0.8}
          ListFooterComponent={ListEndLoader}
          renderItem={({ item }) => (
              <Box w="50%" py="3">
                  <CouponCard 
                      useYellowAdd={true} 
                      marb="0" 
                      imgSource={BASE_S3_IMG_URL + item["image"]} 
                      imgAlt={item["title"]} 
                      merchantName={item["owner_name"]} 
                      couponDetail={item["title"]} 
                      addFunc={() => addFunc(item["coupon_group_id"], item["expire_date"])}
                      navigation={props.navigation}            
                  />
              </Box>
          )}
      />
    </NativeBaseProvider>
  );
};

const MainPageListingStyle = StyleSheet.create({
  
});

export default MainPageListing;

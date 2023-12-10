import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Background from '../../components/templates/Background';
import Layout from '../../components/templates/Layout';
import {ProfileSVG} from '../../assets/images/ProfileSVG';
import {MagnifierSVG} from '../../assets/images/MagnifierSVG';
import MainPageMenu from '../../components/templates/MainPageMenu';
import MainPageListing from '../../components/templates/MainPageListing';
import ActualCoupon from '../../components/atoms/ActualCoupon';
import MerchantIconSVG from '../../assets/images/MerchantIconSVG';
import { useDispatch } from 'react-redux';
import { toggleLoading } from '../../../Redux/Action/CommonAction';
import {
  NativeBaseProvider,
  VStack,
  Center,
  Stack,
  Box,
  Icon,
  Input,
  ScrollView,
  Container,
  Text,
  Button,
} from 'native-base';
import { BASE_URL, BASE_S3_IMG_URL } from '../../config/config';
import {SvgXml} from 'react-native-svg';
import AddressSVG from '../../assets/images/AddressSVG';
// import Icon from 'react-native-vector-icons/FontAwesome';

const CouponItemScreen = ({navigation, route}) => {
  const params = route.params;
  const coupon = params.coupon
  const [dayLeft, setDayLeft] = useState(0);
  const dispatch = useDispatch();

  const initFetch = () => {
    try {
      dispatch(toggleLoading(true));
      let expireDate = new Date(coupon.expire_date);
      let today = new Date();
      let diff = expireDate.getTime() - today.getTime();
      let days = Math.ceil(diff / (1000 * 3600 * 24));
      setDayLeft(days);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading(false));
    }
  }

  useEffect(() => {
    initFetch();
  }, [])
  

  return (
    <Layout showTabBar={false}>
      <Background main={true} contentHeight="76%" tabBarSpace={false} showGoBack={true} goBack={() => navigation.goBack()}>
        <NativeBaseProvider>
          <Stack space={4} alignItems="center" h="100%">
            <Stack
              direction="row"
              h="17%"
              w="100%"
              style={MainStyle.header}
            >
              <Center w="26%">
                <SvgXml width={"90%"} height={"90%"} xml={MerchantIconSVG}/>
              </Center>
              <Stack w="70%" direction={"row"}>
                <Stack w="70%" h="100%" direction="column" style={{justifyContent: "center"}}>
                  <Box h="15%"/>
                  <Box flexDirection={"row"} h="30%" style={{alignItems: "center"}}>
                    <Text fontWeight="500">{coupon.owner_name}</Text>
                  </Box>
                  <Box flexDirection={"row"} h="30%" style={{alignItems: "center"}}>
                    <SvgXml width="10%" height="80%" xml={AddressSVG}/>
                    <Text fontWeight="300" style={{marginLeft: "2%"}}>{coupon.owner_address}</Text>
                  </Box>
                  <Box h="25%"/>
                </Stack>
                <Stack>
                  <Box h="20%"/>
                  <Box flexDirection={"row"} style={{alignItems: "center"}}>
                    {
                      dayLeft >= 0 ? (
                        <>
                          <Box w="3" h="3" style={{backgroundColor:"#f5d50a", borderRadius: 50, marginRight: "10%"}}/>   
                          <Text style={{textAlignVertical: "center"}} fontSize="xs" fontWeight="300">還有 {dayLeft} 天</Text>
                        </>
                      ) : (
                        <>
                          <Box w="3" h="3" style={{backgroundColor:"red", borderRadius: 50, marginRight: "10%"}}/>   
                          <Text style={{textAlignVertical: "center"}} fontSize="xs" fontWeight="300">過期</Text>
                        </>
                      )
                    }
                  </Box>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="column" style={{height:"75%", borderTopColor: "grey", borderTopWidth: 0.2}}>
              <Box h="5%" />
              <Text fontSize="2xl" fontWeight="600" style={{color: "#db3d3d"}}>憑QR Code即可使用</Text>
              <Text fontWeight="600">{coupon.owner_name} {coupon.title}</Text>
              <ActualCoupon
                  companyName={coupon.owner_name} 
                  value={coupon.value} 
                  image={{uri: BASE_S3_IMG_URL + coupon.image}}
              />
              <Stack h="12%">
                <TouchableOpacity onPress={() => navigation.navigate('CouponQRCode', {coupon: coupon})}>
                <Box w="80%" h="100%" style={{backgroundColor: "#d63838", borderRadius: 20, alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto"}}>
                  <Text fontWeight="600" fontSize="xl" style={{color:"white", textAlignVertical: "center", textAlign: "center"}}>立即使用</Text>
                </Box>
                </TouchableOpacity>
              </Stack>
            </Stack>
          </Stack>
        </NativeBaseProvider>
      </Background>
    </Layout>
  );
};

const MainStyle = StyleSheet.create({
  header: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  }
});

export default CouponItemScreen;

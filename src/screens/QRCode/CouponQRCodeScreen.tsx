import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import Background from '../../components/templates/Background';
import QRCodeBackground from '../../components/templates/QRCodeBackground';
import Layout from '../../components/templates/Layout';
import {ProfileSVG} from '../../assets/images/ProfileSVG';
import {MagnifierSVG} from '../../assets/images/MagnifierSVG';
import MainPageMenu from '../../components/templates/MainPageMenu';
import MainPageListing from '../../components/templates/MainPageListing';
import ActualCoupon from '../../components/atoms/ActualCoupon';
import LeftArrow from '../../assets/images/LeftArrow';
import {CatSVG} from '../../assets/images/CatSVG';
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
  Heading,
} from 'native-base';
import { BASE_URL, BASE_S3_IMG_URL } from '../../config/config';
import {SvgXml} from 'react-native-svg';
import { Buffer } from 'buffer'

// import Icon from 'react-native-vector-icons/FontAwesome';

const CouponQRCodeScreen = ({navigation, route}) => {
  const params = route.params;
  const coupon = params.coupon
  const [qrCode, setQRCode] = useState("https://reactnative.dev/img/tiny_logo.png");

  const fetchCouponQRCode = async (expireDate, clientId, couponId, nums) => {
    let {data} = await axios.post(BASE_URL + "coupon/genUsageCouponQRCode", {
      "expire_date": expireDate,
      "client_id": clientId,
      "coupon_id": couponId,
      "nums": nums
    }, {
      responseType: 'arraybuffer',
    }); 
    
    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;
    setQRCode(base64Image);
  }
  
  useEffect(() => {
    fetchCouponQRCode(coupon.expire_date, coupon.client_id, coupon.coupon_id, 1);
  }, []);

  return (
    <Layout showTabBar={false}>
      <QRCodeBackground goBack={() => navigation.goBack()}>
        <NativeBaseProvider>
          <Stack style={MainStyle.imageHolder}>
            <Heading
              w="100%"
              style={MainStyle.Heading}
              size="xl"
              textAlign={'center'}
              color="light.50"
            >
              COUPON GO!
            </Heading>
            <View style={MainStyle.CatView}>
              <SvgXml height="100%" xml={CatSVG} />
            </View>
            <Image source={{uri: qrCode}} style={{width: 250, height: 250, marginTop: "auto", marginBottom: "auto", marginLeft: "auto", marginRight: "auto"}} />
          </Stack>
        </NativeBaseProvider>
      </QRCodeBackground>
    </Layout>
  );
};

const MainStyle = StyleSheet.create({
  imageHolder: {
    position: "relative",
    width: 300, 
    height: 300, 
    marginBottom: "auto", 
    marginTop: "auto", 
    marginLeft: "auto", 
    marginRight: "auto",
    backgroundColor: "white",
    borderRadius: 50,
    zIndex: 60,
  },
  header: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  content: {
    // overflow: 'scroll',
  },
  Heading: {
    position: 'absolute',
    zIndex: 7,
    top: '-50%',
  },
  CatView: {
    position: 'absolute',
    zIndex: 7,
    top: '-38%',
    left: '50%',
    transform: [{ translateX: -105}],
    height: '40%',
  },
});

export default CouponQRCodeScreen;

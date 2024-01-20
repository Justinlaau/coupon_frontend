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
import { couponSocket } from '../../socket';
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
import BASE_S3_IMG_URL, { BASE_URL } from '../../config/config';
import {SvgXml} from 'react-native-svg';
import { Buffer } from 'buffer'
import { useDispatch } from 'react-redux';
import { toggleLoading, toggleMessagePopup, setMessagePopup } from '../../../Redux/Action/CommonAction';
import { TOGGLE_SUCCESS_POPUP, SET_SUCCESS_MESSAGE, TOGGLE_ERROR_POPUP, SET_ERROR_MESSAGE } from '../../../Redux/Action/ActionType';
import { BackHandler } from 'react-native';
import { useSelector } from 'react-redux';

// import Icon from 'react-native-vector-icons/FontAwesome';

const CouponQRCodeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const params = route.params;
  const coupon = params.coupon
  const [qrCode, setQRCode] = useState("https://reactnative.dev/img/tiny_logo.png");
  const token = useSelector((state: any) => state.authenticationReducer.baseUser.token);
  
  const fetchCouponQRCode = async (couponId: any, nums: any) => {
    try {
      dispatch(toggleLoading(true));
      let {data} = await axios.post(BASE_URL + "coupon/genUsageCouponQRCode", {
        "coupon_id": couponId,
        "nums": nums
      }, {
        responseType: 'arraybuffer',
      }); 
      
      const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;
      setQRCode(base64Image);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading(false));
    }
  }

  useEffect(() => {
    fetchCouponQRCode(coupon.coupon_id, coupon.total);
    couponSocket.auth = {token: token};
    couponSocket.connect();
  }, []);

  couponSocket.on('connect', () => {
    console.log("connected");
  });

  useEffect(() => {
    couponSocket.on('qrcode_scanned_response', (data) => {
      console.log("qrcode_scanned_response");
      console.log(data);
      dispatch(setMessagePopup(data.message, SET_SUCCESS_MESSAGE));
      dispatch(toggleMessagePopup(true, TOGGLE_SUCCESS_POPUP));
    })
  }, [couponSocket])

  // disconnect socket when back button is pressed
  useEffect(() => {
    const handleBackPress = () => {
      couponSocket.disconnect();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <Layout showTabBar={false}>
      <QRCodeBackground goBack={() => {couponSocket.disconnect(); navigation.goBack();}}>
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

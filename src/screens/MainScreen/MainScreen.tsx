import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  RefreshControl,
  ViewStyle,
  Animated,
} from 'react-native';
import Background from '../../components/templates/Background';
import Layout from '../../components/templates/Layout';
import {ProfileSVG} from '../../assets/images/ProfileSVG';
import {MagnifierSVG} from '../../assets/images/MagnifierSVG';
import MainPageMenu from '../../components/templates/MainPageMenu';
import MainPageListing from '../../components/templates/MainPageListing';
import {
  NativeBaseProvider,
  VStack,
  Center,
  Stack,
  Box,
  Text,
  Button,
} from 'native-base';
import {SvgXml} from 'react-native-svg';
import axios from 'axios';
import BASE_S3_IMG_URL, { BASE_URL } from '../../config/config';
import { use } from 'i18next';
import { useDispatch } from 'react-redux';
import { toggleLoading } from '../../../Redux/Action/CommonAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {PropsWithChildren} from 'react';
import { socket } from '../../socket';
import LEDBoard from './LEDBoard';
// import Icon from 'react-native-vector-icons/FontAwesome';

const LED_FONT_SIZE = 24; 

const MainScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [couponGroups, setCouponGroups] = useState([]);
  const [infoPopup, setInfoPopup] = useState(false);
  const [message, setMessage] = useState("成功！！！");
  // const [test, setTest] = useState(false);
  const [userInfo, setUserInfo] = useState({
    "userName": "",
    "userID": ""
  });
  const [notificationInfo, setNotificationInfo] = useState([""]);
  const [currentNotiIndex, setCurrentNotiIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const fetchUserInfo = async () => {
    setUserInfo({
      "userName": "丹",
      "userID": "123123"
    })
  }

  const fetchNotificationInfo = async () => {
    setNotificationInfo([
      "歡迎使用Coupon Go!",
      "Coupon X 即將過期!"
    ])
  }

  const fetchCouponGroups = async () => {
    try {
      dispatch(toggleLoading(true));
      let {data} = await axios.post(BASE_URL + "coupon/getAllCouponGroupsAPI")
      console.log("data")
      console.log(data)
      setCouponGroups(data)
    } catch (error) {
      console.log("error")
      console.log(error)
    } finally {
      dispatch(toggleLoading(false));
    }
  }

  useEffect(() => {
    fetchUserInfo();
    fetchNotificationInfo();
    fetchCouponGroups();
  }, [])

  const toggleInfo = (show: boolean) => {
    setInfoPopup(show)
  }
  const setInfoMessage = (message: string) => {
    setMessage(message)
  };

  type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>
  const FadeInView: React.FC<FadeInViewProps> = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    // const fadeInfoPopup = useSelector((state: any) => state.commonReducer.data.infoPopup);

    useEffect(() => {
      if (!infoPopup) return;
      fadeAnim.setValue(1);
      
      Animated.timing(fadeAnim,
        {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();

      setTimeout(() => {
        toggleInfo(false);
      }, 100)
    }, [infoPopup])

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }

  return (
  <Layout 
    showTabBar={true} 
    isHeading={{"isHeading": true, "userID": userInfo["userID"], "userName": userInfo["userName"]}}
    navigation={navigation}
  >
    <Background main={true} contentHeight="70%" tabBarSpace={true}>

        <NativeBaseProvider>
          <FadeInView style={{position: "absolute", top: "-30%", left: "40%", backgroundColor: "#4BB543", borderRadius: 50 }}>
            <Text style={{paddingHorizontal: "3%", paddingVertical: "1%", color: "white"}}>{ message }</Text>
          </FadeInView>
          <View style={{height: "100%", width: "100%", paddingLeft: "3%", paddingRight: "3%"}}>
            {/* Title */}
            <View style={{height: "9%", paddingTop: "3%", marginBottom: "1.5%", display: "flex", justifyContent: "flex-end"}}>
              <Text style={{fontSize: 25, fontWeight: "bold", height: "100%", textAlignVertical: "bottom"}}>
                Coupon 你今日用咗未！
              </Text>
            </View>

            {/* Line */}
            <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <View style={{width: "100%", backgroundColor: "black", height: 1.5, marginBottom: "1%"}}/>
            </View>

            {/* LED Board */}
            <View style={{height: "6%", backgroundColor: "white"}}>
              <LEDBoard 
                texts={notificationInfo}
                LEDFontSize={LED_FONT_SIZE}
              />
            </View>

            <View style={{height: "83%", backgroundColor: "red"}}>
              <View style={{}}>

              </View>
              <Text>
                  Coupon 你今日用咗未！
              </Text>
            </View>
          </View>
        </NativeBaseProvider>
      </Background>
    </Layout>
  );
};

const MainStyle = StyleSheet.create({
  LEDText:{
    color: '#0f0',
    fontSize: LED_FONT_SIZE,
    textAlignVertical: "center",
    height: "100%"
  }
});

export default MainScreen;

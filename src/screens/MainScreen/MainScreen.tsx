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
// import Icon from 'react-native-vector-icons/FontAwesome';

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

  const fetchUserInfo = async () => {
    setUserInfo({
      "userName": "丹",
      "userID": "123123"
    })
  }

  const fetchNotificationInfo = async () => {
    setNotificationInfo([
      "歡迎使用Coupon Go!",
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
  >
    <Background main={true} contentHeight="70%" tabBarSpace={true}>

        <NativeBaseProvider>
          <FadeInView style={{position: "absolute", top: "-30%", left: "40%", backgroundColor: "#4BB543", borderRadius: 50 }}>
            <Text style={{paddingHorizontal: "3%", paddingVertical: "1%", color: "white"}}>{ message }</Text>
          </FadeInView>
          <Stack space={4} alignItems="center" h="100%">
            <Stack
              direction="row"
              h="15%"
              w="100%"
              style={MainStyle.header}>
              <Box
                style={{flex: 1, justifyContent: 'center', paddingLeft: '7%'}}
                w="70%"
                height="100%"
                _text={{fontSize: '30', fontWeight: '900', textAlign: 'left'}}>
                揾 Coupon !
              </Box>
              <Pressable style={{ height:"100%", width:"25%" }}  onPress={async () => { await AsyncStorage.removeItem("jwt"); axios.defaults.headers.common['Authorization']=""; socket.disconnect(); navigation.navigate("Login") }}>
                <Center height="100%" width="100%">
                    <SvgXml width="45%" xml={ProfileSVG} />
                </Center>
              </Pressable>
            </Stack>
              <ScrollView style={{ height: "100%", width: "100%", paddingHorizontal: "6%", paddingVertical: "5%" }}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => fetchCouponGroups()}
                  />
                }
              >
                <Stack h="50" w="99%" direction="row" mb="9%" mr="auto" ml="auto" style={{alignItems: "center", borderRadius: 10, shadowOffset: {width: 1, height: 1}, backgroundColor: "white", shadowColor: "#000", shadowOpacity: 0.8, shadowRadius: 10, elevation: 6}}>
                  <Center height="100%" width="15%">
                    <SvgXml height="40%" xml={MagnifierSVG} />
                  </Center>
                  <Box w="85%">
                    <TextInput placeholder="搜尋優惠卷?" />
                  </Box>
                </Stack>
                <View style={{ borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth,}}/>
                <Box h="30" mt="2">
                  <Stack direction="row">
                    <Text fontWeight="bold" fontSize="15" w="84%">最熱門優惠卷!</Text>
                  </Stack>
                </Box>
                <Box>
                  <MainPageListing style={{}} couponGroups={couponGroups} infoPopup={infoPopup} toggleInfo={toggleInfo} setInfoMessage={setInfoMessage}/>
                </Box>
              </ScrollView>
          </Stack>
        </NativeBaseProvider>
      </Background>
    </Layout>
  );
};

const MainStyle = StyleSheet.create({
  test: {
    backgroundColor: 'blue',
    height: '100%',
    width: '100%',
  },
  header: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  content: {
    // overflow: 'scroll',
  },
});

export default MainScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable
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
  Icon,
  Input,
  ScrollView,
  Container,
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
// import Icon from 'react-native-vector-icons/FontAwesome';

const MainScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [couponGroups, setCouponGroups] = useState([])

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
    fetchCouponGroups()
  }, [])

  return (
    <Layout showTabBar={true}>
      <Background main={true} contentHeight="68%" tabBarSpace={true}>
        <NativeBaseProvider>
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
              <Pressable style={{ height:"100%", width:"25%" }}  onPress={async () => { await AsyncStorage.removeItem("jwt"); navigation.navigate("Login") }}>
                <Center height="100%" width="100%">
                    <SvgXml width="45%" xml={ProfileSVG} />
                </Center>
              </Pressable>
            </Stack>
              <ScrollView h="100" w="100%" px="6" py="5">
                <Stack h="50" w="99%" direction="row" mb="9%" mr="auto" ml="auto" style={{alignItems: "center", borderRadius: 10, shadowOffset: {width: 1, height: 1}, backgroundColor: "white", shadowColor: "#000", shadowOpacity: 0.8, shadowRadius: 10, elevation: 6}}>
                  <Center height="100%" width="15%">
                    <SvgXml height="40%" xml={MagnifierSVG} />
                  </Center>
                  <Box w="85%">
                    <TextInput placeholder="search coupon ?" />
                  </Box>
                </Stack>
                <Box h="75" mb="9"><MainPageMenu/></Box>
                <View style={{ borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth,}}/>
                <Box h="30" mt="2">
                  <Stack direction="row">
                    <Text fontWeight="bold" fontSize="15" w="84%">Popuplar Coupon</Text>
                    <Text fontWeight="light" color="grey" fontSize="15" onPress={() => navigation.navigate("CouponListing")}>View All</Text>
                  </Stack>
                </Box>
                <Box><MainPageListing couponGroups={couponGroups}/></Box>
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

import React, { useEffect, useRef, useState } from 'react';
import TabBar from './TabBar';
import {
  View, 
  StyleSheet,
  Text, 
  Image, 
  Dimensions, 
  ActivityIndicator, 
  TouchableOpacity, 
  RefreshControl, 
  ViewStyle, 
  Animated, 
  TextInput,
  Pressable,
} from 'react-native';
import Background from './Background';
import { useDispatch, useSelector } from 'react-redux';
import { 
  TOGGLE_SUCCESS_POPUP, 
  TOGGLE_ERROR_POPUP,  
  TOGGLE_OPERATION_POPUP,
} from '../../../Redux/Action/ActionType';
import { toggleMessagePopup } from '../../../Redux/Action/CommonAction';
const { height } = Dimensions.get('window');
import {SvgXml} from 'react-native-svg';
import {MagnifierSVG} from '../../assets/images/MagnifierSVG';
import {ProfileSVG} from '../../assets/images/ProfileSVG';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { socket } from '../../socket';
import Notification1 from '../../assets/images/Notification/Notification1';
import Notification2 from '../../assets/images/Notification/Notification2';
import NotificationBase from '../../assets/images/Notification/NotificationBase';

interface LayoutType{
  children: any | undefined,
  showTabBar: Boolean,
  isHeading: {
    "isHeading": Boolean,
    "userName": String,
  } | {
    "isHeading": Boolean
  },
  navigation: any,
};

export default function Layout(props: LayoutType) {
  const dispatch = useDispatch();
  const commonLoading = useSelector((state: any) => state.commonReducer.data.commonLoading);
  const successPopup = useSelector((state: any) => state.commonReducer.data.successPopup);
  const successPopupMessage = useSelector((state: any) => state.commonReducer.data.successPopupMessage);
  const errorPopup = useSelector((state: any) => state.commonReducer.data.errorPopup);
  const errorPopupMessage = useSelector((state: any) => state.commonReducer.data.errorPopupMessage);
  const operationPopup = useSelector((state: any) => state.commonReducer.data.operationPopup);
  const operationPopupMessage = useSelector((state: any) => state.commonReducer.data.operationPopupMessage);

  const [isFocused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  const notiImages = [NotificationBase, Notification1, NotificationBase, Notification2]

  useEffect(() => {
    const imageTimer = setTimeout(() => {
      const nextIndex = (currentImageIndex + 1) % notiImages.length;
      setCurrentImageIndex(nextIndex);
      startAnimation();
    }, 2000);

    return () => {
      clearTimeout(imageTimer);
    };
  }, [currentImageIndex]);

  const startAnimation = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const interpolatedOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const profileNavigating = async () => {
    if (axios.defaults.headers.common['Authorization'] == ""){
      await AsyncStorage.removeItem("jwt"); 
      axios.defaults.headers.common['Authorization']=""; 
      socket.disconnect(); 
      props.navigation.navigate("Login");
    }
    else{
      props.navigation.navigate("UserProfile");
    }
  }


  return (
    <View style={[LayoutStyle.layout, {height}]}>
      {props.children}
      {
        props.showTabBar ? <TabBar /> : null
      }
      {
        props.isHeading["isHeading"] ? 
        (
        <View style={{position: "absolute", zIndex: 100, width:"100%", height: "5%"}}>
          {/* {isFocused? <></> : 
          ( */}
          <View style={{display: "flex", flexDirection: "row", alignItems: "center", left: 10}}>
            <Pressable onPress={async () => {profileNavigating();}}>
              <View style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                <SvgXml width={30} height={30}  xml={ProfileSVG} />
              </View>
            </Pressable>
            <Text style={{fontSize: 15, color: "white", textAlign: "center"}}> 哈囉, {props.isHeading["userName"]} ! </Text> 
          </View>
          {/* )
          } */}
          {/* <View style={{position: "absolute", right: 10, top: 3, height: "90%", width: isFocused? "95%": "7%", zIndex: 120, 
            backgroundColor: "transparent", borderRadius: 7, flexDirection: "row"}}>
            <View style={{display: "flex", justifyContent: "center", alignContent: "center", height: "100%"}}>
              <SvgXml height="60%" xml={MagnifierSVG} />
            </View>
            <TextInput style={{height: "100%"}} placeholder=''
            onFocus={handleFocus}
            onBlur={handleBlur}
            />
          </View> */}
          <TouchableOpacity style={{position: "absolute", right: 0, height: "100%", width:"10%"}} onPress={() => props.navigation.navigate("Notification")}>

            <View style={{position: "absolute", right: 0, height: "100%", width:"100%", zIndex: 120, 
              backgroundColor: "transparent", borderRadius: 7, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <Animated.View style={{ opacity: interpolatedOpacity }}>
                  <SvgXml width={50} xml={notiImages[currentImageIndex]} />
                  <View style={{backgroundColor: "#E9D14D", width: 15, height: 15, position: "absolute", borderRadius: 50, right: 10}}> 

                  </View>
                </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
        )
        : <></>
      }
      {
        commonLoading ? (
          <>
            <View style={LayoutStyle.loadingStyle}>
              <View style={LayoutStyle.loadingBox}>
                <ActivityIndicator size="large" color="#DC2B37" />
              </View>
            </View>
          </>
        ) : null
      }
      {
        // hardcode for now
        successPopup ? (
          <>
            <View style={LayoutStyle.loadingStyle}>
              <View style={LayoutStyle.messageBox}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10}}>{successPopupMessage}</Text>
                </View>
                <TouchableOpacity onPress={() => dispatch(toggleMessagePopup(false, TOGGLE_SUCCESS_POPUP))}>
                  <View style={{width: 60, height: 40, backgroundColor: "#DC2B37", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                    <Text style={{color: "white"}}>確定</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null
      }
      {
        // hardcode for now
        errorPopup ? (
          <>
            <View style={LayoutStyle.loadingStyle}>
              <View style={LayoutStyle.messageBox}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10}}>{errorPopupMessage}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    dispatch(toggleMessagePopup(false, TOGGLE_ERROR_POPUP))
                    // errorCallback();
                }}>
                  <View style={{width: 60, height: 40, backgroundColor: "#DC2B37", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                    <Text style={{color: "white"}}>確定</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null
      }
      {
        // hardcode for now
        operationPopup ? (
          <>
            <View style={LayoutStyle.loadingStyle}>
              <View style={LayoutStyle.messageBox}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10}}>{operationPopupMessage}</Text>
                </View>
                <TouchableOpacity onPress={() => dispatch(toggleMessagePopup(false, TOGGLE_OPERATION_POPUP))}>
                  <View style={{width: 60, height: 40, backgroundColor: "#DC2B37", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                    <Text style={{color: "white"}}>確定</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null
      }
    </View>
  );
}

const LayoutStyle = StyleSheet.create({
  layout: {
    height: '100%',
    width: '100%',
  },
  loadingStyle: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 99999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingBox: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    elevation: 10,
  },
  messageBox: {
    maxWidth: '80%',
    paddingHorizontal: "3%",
    paddingVertical: "3%",
    // height: "50%",
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    elevation: 10,
  }
});


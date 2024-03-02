import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, Text, Alert, Dimensions, Image, Pressable } from 'react-native';
import axios from 'axios';
import Layout from '../../components/templates/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { interpolate, interpolateColor, useSharedValue, useAnimatedStyle, withDecay, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { toggleLoading, setMessagePopup, toggleMessagePopup } from '../../../Redux/Action/CommonAction';
import { TOGGLE_ERROR_POPUP, SET_ERROR_MESSAGE } from '../../../Redux/Action/ActionType';
import YelloStarSVG from '../../assets/images/ICON/YelloStarSVG';
import AddressSVG from '../../assets/images/AddressSVG';
import CouponCard from '../../components/atoms/CouponCard';
import ActualCoupon from '../../components/atoms/ActualCoupon';
import leftArrowBlack from '../../assets/images/ICON/leftArrowBlackSVG';
import heartLoveSVG from '../../assets/images/ICON/heartLoveSVG';
import Carousel from './Carousel';
import { BASE_URL } from '../../config/config';


const testSources = ["https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_965/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ugpha4iy2ki8kfxbcrlj/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp",
"https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_800,h_600/w_49,x_9,y_9,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/dth3e37mdgjrvzagyipi/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp",
"https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_800,h_600/w_49,x_9,y_9,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/n16jydcu3g190kdyvmqo/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp",
"https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_800,h_600/w_49,x_9,y_9,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/g8glg71bpuive07b166r/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp",
"https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_800,h_600/w_49,x_9,y_9,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/kaokxejyhy7gvnelckmd/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp",
"https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_971/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ampmpuxwqp1mosuoyj3z/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp",
"https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_862/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/mhvfjsrakjv7orl4hpg1/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp",
"https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_861/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/jbjkotwmdstrekbdifki/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp",
"https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_862/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ernrojpm5nzzb1apzwbr/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp"]
const testDescriptions = ["尊享房 花園", "尊享房間 花園-浴室", "尊享房 陽台", "尊享房 陽台-浴室", "開放式套房 海景 陽台", "無邊際泳池", "健身中心", "Café@WM 海鮮盛宴自助午餐 - 冰鎮海鮮", "Café@WM 海鮮盛宴自助午餐 - 和牛越南河粉"]


export const BusinessInformationFormScreen = (navigate: any) => {
    const dispatch = useDispatch();

    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const fromTopDistance = useSharedValue(0.3 * screenHeight);
    const bottomline = useSharedValue(0);

    const [infoPopup, setInfoPopup] = useState(false);
    const [message, setMessage] = useState("成功!!");
    const [selectedSection, setSelectedSection] = useState("coupon");

    const addFunc = async (couponGroupId: string, expireDate: string) => {
        if(!await AsyncStorage.getItem("jwt")){
            Alert.alert("登錄後才可享有COUPONGO服務");
        }else{
            if (infoPopup) {
                setInfoPopup(false);
                return;
            }
            setMessage("操作中");
            setInfoPopup(true);
            let {data} = await axios.post(BASE_URL + "coupon/addCoupon", {
                "coupon_group_id": couponGroupId,
                "total": 1
            })

            if ( data["result"] == 0 ) {
                setMessage("成功!!");
                setInfoPopup(true);
            } else {
                dispatch(setMessagePopup("Add Coupon Failed: " + data["message"], SET_ERROR_MESSAGE));
                dispatch(toggleMessagePopup(true, TOGGLE_ERROR_POPUP));
            }
        }
    }

    const menuRef = useRef({} as any);

    const pan = Gesture.Pan()
        .onChange((event) => {
            if (bottomline.value <= screenHeight) return;
            
            if (event.changeX < 0 && fromTopDistance.value < 0 && bottomline.value + fromTopDistance.value <= screenHeight) {
                fromTopDistance.value = screenHeight - bottomline.value;
            } else if (fromTopDistance.value + event.changeY <= 0.3*screenHeight && bottomline.value + event.changeY > 0) {
                fromTopDistance.value += event.changeY
            } else if (fromTopDistance.value + event.changeY > 0.3*screenHeight) {
                fromTopDistance.value = 0.3*screenHeight
            }
        })
        .onFinalize((event) => {
            fromTopDistance.value = withDecay({
                velocity: event.velocityY * 0.5,
                clamp: [bottomline.value > screenHeight ? screenHeight-bottomline.value : 0.3*screenHeight, 0.3*screenHeight],
            })
        })

    const scrollAnimatedStyle = useAnimatedStyle(() => {
        return {
            top: fromTopDistance.value
        }
    })

    const menuAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(fromTopDistance.value, [150, 120], ["transparent", "#F9FAFB"])
        }
    })

    const floatingButtonStyle = useAnimatedStyle(() => {
        const retColor = interpolateColor(fromTopDistance.value, [150, 120], ["#F9FAFB", "transparent"]);  
        return {
            backgroundColor: retColor
        }
    })

    const displayStyle = useAnimatedStyle(() => {
        const retDisplay = fromTopDistance.value < 150 ? "flex" : "none";
        return {
            display: retDisplay
        }
    })

    const inPageNavigate = (section: string) => {
        let y = menuRef.current[section];
        fromTopDistance.value = withTiming(-y + 125);
        setSelectedSection(section);
    }

    return (
        <GestureHandlerRootView>
            <Layout 
                showTabBar={true}
                isHeading={{ "isHeading": false }}
                navigation={navigate}
            >
                <View style={{ position: "relative", height: "100%" }}>
                    {/* menu */}
                    <Animated.View style={[
                        { position: "absolute", top: 0, left: 0, width: "100%",  height: 120, backgroundColor: "rgb(249 250 251)", zIndex: 200},
                        menuAnimatedStyle
                    ]}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingHorizontal: 30, marginTop: 20 }}>
                            <Pressable
                                style={{ marginRight: "auto" }}
                                onPress={() => { console.log("handle goBack") }}
                            >
                                <Animated.View style={[
                                    { width: 40, height: 40, backgroundColor: "#F9FAFB", justifyContent: "center", alignItems: "center", borderRadius: 50 },
                                    floatingButtonStyle
                                ]}>
                                    <SvgXml xml={leftArrowBlack} width={30} height={40} />
                                </Animated.View>
                            </Pressable>
                            <Animated.View style={[
                                { height: 40, justifyContent: "center", alignItems: "center", opacity: 1, backgroundColor: "#F9FAFB", borderRadius: 50, width: 40},
                                floatingButtonStyle
                            ]}>
                                <SvgXml xml={heartLoveSVG} width={20} height={20} />
                            </Animated.View>
                        </View>
                        <Animated.View style={[{ display: "flex", flexDirection: "row", overflow: "scroll", height: 60, borderTopWidth: 0.2, borderTopColor: "rgb(214 211 209)" }, displayStyle]}>
                            <Pressable onPress={() => inPageNavigate("coupon")}>
                                <View 
                                    style={[
                                        { justifyContent: "center", paddingHorizontal: 16, height: 60},
                                        { borderBottomWidth: selectedSection == "coupon" ? 2 : 0, borderBottomColor: selectedSection == "coupon" ? "rgb(234 88 12)" : "transparent" }
                                    ]}
                                >
                                    <Text style={{ color: selectedSection == "coupon" ? "rgb(234 88 12)" : "black", fontWeight: selectedSection == "coupon" ? "400" : "normal" }}>商戶Coupons</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => inPageNavigate("introduction")}>
                                <View 
                                    style={[
                                        { justifyContent: "center", paddingHorizontal: 16, height: 60},
                                        { borderBottomWidth: selectedSection == "introduction" ? 2 : 0, borderBottomColor: selectedSection == "introduction" ? "rgb(234 88 12)" : "transparent" }
                                    ]}
                                >
                                    <Text style={{ color: selectedSection == "introduction" ? "rgb(234 88 12)" : "black", fontWeight: selectedSection == "introduction" ? "400" : "normal" }}>商戶介紹</Text>
                                </View>
                            </Pressable>
                        </Animated.View>
                        
                    </Animated.View>

                    <Carousel />

                    <GestureDetector gesture={pan}>
                        <Animated.View style={[
                                { position: "absolute", bottom: 0.08*screenHeight, left: 0, minHeight: 0.70*screenHeight, width: "100%", backgroundColor: "rgb(249 250 251)", borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                                scrollAnimatedStyle
                            ]}
                        >
                            <View style={{ paddingHorizontal: "5%", paddingVertical: "8%" }}>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontSize: 24, fontWeight: "900", color: "rgb(28 25 23)" }}>獨家 Staycation 優惠：香港酒店住宿連鎖餐飲</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", marginBottom: 10, alignItems: "center" }}>
                                    <SvgXml xml={YelloStarSVG} width="16" height="16" />
                                    <Text style={{ color: "#ffae00", fontSize: 16, textAlignVertical: "center", marginLeft: 4 }}>4.4</Text>
                                    <Text style={{ fontSize: 16, textAlignVertical: "center", marginLeft: 4 }}> · 10K+ 人參加過</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", marginBottom: 40, alignItems: "center" }}>
                                    <SvgXml xml={AddressSVG} width="16" height="16" />
                                    <Text style={{ fontSize: 16, textAlignVertical: "center", marginLeft: 4 }}>地址s</Text>
                                </View>

                                {/* 商戶 Coupon Section  */}
                                <View 
                                    onLayout={(event) => {
                                        menuRef.current["coupon"] = event.nativeEvent.layout.y;
                                    }}
                                    style={{ marginBottom: 40 }}
                                >
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                        <View style={{ backgroundColor: "rgb(234 88 12)", height: 24, width: 8, borderRadius: 20, marginRight: 10 }}></View>
                                        <Text style={{ fontSize: 20, fontWeight: "900", textAlignVertical: "center", color: "rgb(28 25 23)" }}>商戶Coupons</Text>
                                    </View>
                                    <View>
                                    {
                                        Array(3).fill(0).map((_, index) => {
                                            return (
                                                <ActualCoupon
                                                    companyName={"香港酒店住宿連鎖餐飲"}
                                                    title={"獨家 Staycation 優惠"}
                                                    value={"1000"}
                                                    image={{ uri: "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_965/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ugpha4iy2ki8kfxbcrlj/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp" }}
                                                    couponCategory={1}
                                                    rollAnimated={false}
                                                    rightBar={true}
                                                    availablePercent={0.8}
                                                    addFunc={() => console.log("add")}
                                                />
                                            )
                                        })
                                    }
                                    </View>
                                </View>

                                {/* 商戶介紹 Section  */}
                                <View
                                    onLayout={(event) => {
                                        menuRef.current["introduction"] = event.nativeEvent.layout.y;
                                    }}
                                >
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                        <View style={{ backgroundColor: "rgb(234 88 12)", height: 24, width: 8, borderRadius: 20, marginRight: 10 }}></View>
                                        <Text style={{ fontSize: 20, fontWeight: "900", textAlignVertical: "center", color: "rgb(28 25 23)" }}>商戶介紹</Text>
                                    </View>
                                    {
                                        testSources.map((source, index) => {
                                            return (
                                                <View style={{ marginBottom: 30 }}>
                                                    <Image
                                                        source={{ uri: source }} 
                                                        alt={"香港酒店住宿連鎖餐飲"}
                                                        style={{ width: "100%", minHeight: 200, marginBottom: 10, borderRadius: 20 }}
                                                    />
                                                    <Text style={{ fontSize: 16, textAlign: "center" }}>{ testDescriptions[index] }</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            <View 
                                style={{ width: "100%", height: 10 }}
                                onLayout={(event) => {
                                    bottomline.value = event.nativeEvent.layout.y + 0.08 * screenHeight;
                                }}
                            />
                        </Animated.View>
                    </GestureDetector>
                </View>
            </Layout>
        </GestureHandlerRootView>
    )
}
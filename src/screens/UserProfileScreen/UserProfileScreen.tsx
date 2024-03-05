import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Layout from "../../components/templates/Layout";
import Background from "../../components/templates/Background";
import { useDispatch } from "react-redux";
import { toggleLoading } from '../../../Redux/Action/CommonAction';
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { SvgXml } from "react-native-svg";
import { ProfileSVG } from "../../assets/images/ProfileSVG";

const MarginTop = "5%"

const UserProfileScreen = ({navigation}: any) => {
    const dispatch = useDispatch();
    const nicknameInputRef = useRef(null);
    const [nickName, setNickName] = useState("");

    // Need API for change nickname 

    const [userInfo, setUserInfo] = useState({
        "建立帳號日期": "",
        "電郵": "",
        "匿稱": "訪客",
        "電話": "",
        "用戶名": "anonymous user"
    });

    const fetchGetUserInfo = async () => {
        try {
          dispatch(toggleLoading(true));
          let {data} = await axios.get(BASE_URL + "user/UserGetUserInfo");
          // console.log("data")
          console.log(data)
          setUserInfo({
            "建立帳號日期": data["user"]["create_date"],
            "電郵": data["user"]["email"],
            "匿稱": data["user"]["nickname"], 
            "電話": data["user"]["phone"],
            "用戶名": data["user"]["username"]
        })
            setNickName(data["user"]["nickname"]);
        } catch (error) {
          console.log("error")
          console.log(error)
        } finally {
          dispatch(toggleLoading(false));
        }
    }

    const handleNickName = (text: string) => {
        setNickName(text);
    }

    const updateNickName = async () => {
        try{

            let {data} = await axios.post(BASE_URL + "user/update-nickname", {
                "newNickName": nickName,
                "userName": userInfo["用戶名"]
            })
            
            console.log(data)
            Alert.alert(
                'Alert Title',
                'Alert Message',
            [
              {
                text: '你已成功更新匿稱！',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => navigation.navigate('Main'), 
              },
            ],
            { cancelable: false }
          );

        }catch (error) {
            console.log("error")
            console.log(error)
        } finally {
            dispatch(toggleLoading(false));
        }
    }
    useEffect(() => {
        fetchGetUserInfo();
    }, []);
    
    return (
        <Layout 
            showTabBar={true} 
            isHeading={{"isHeading": true, "userName": userInfo["匿稱"]}}
            navigation={navigation}>
                <Background main={true} contentHeight="76.5%" tabBarSpace={true}>
                    <View style={{width: "100%", height: "100%", alignItems: "center"}}>
                        <View style={{height: "100%", width: "90%"}}>
                            <View style={[styles.center, {width: "100%", height: "10%"}]}>
                                <Text style={[styles.bigFonts, styles.black, styles.boldWords]}>
                                    用戶資料
                                </Text>
                            </View>
                            
                            <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center"}} onPress={()=>navigation.navigate("Login")}>
                                <SvgXml width={75} height={75}  xml={ProfileSVG} />
                            </TouchableOpacity>
                            
                            <View style={{width: "100%", height: "10%"}}>
                                <Text style={[styles.mediumFonts, styles.black, styles.boldWords]}>
                                    用戶名
                                </Text>
                                <View style={[{height: "50%", width: "100%", backgroundColor: "#777777", marginTop: "2%",
                                    borderColor: "black", borderWidth: 1}, 
                                    styles.borderRadius
                                    ]}>
                                    <Text style={[styles.mediumFonts, styles.white, 
                                        {marginLeft: "5%", textAlignVertical: "center", height: "100%"}]}>
                                        {userInfo["用戶名"]}
                                    </Text>
                                </View>
                            </View>

                            <View style={{marginTop: MarginTop, width: "100%", height: "10%"}}>
                                <Text style={[styles.mediumFonts, styles.black, styles.boldWords]}>
                                    匿稱
                                </Text>
                                <View style={[{height: "50%", width: "100%", marginTop: "2%", backgroundColor: "white",
                                    borderColor: "black", borderWidth: 1}, 
                                    styles.borderRadius
                                    ]}>
                                    <TextInput style={[styles.mediumFonts, styles.black, 
                                        {marginLeft: "5%", textAlignVertical: "center", height: "100%",
                                        margin: 0, padding: 0}]}
                                        ref={nicknameInputRef}
                                        placeholder={userInfo["匿稱"]}
                                        onChangeText={handleNickName}>
                                        {userInfo["匿稱"]}
                                    </TextInput>
                                </View>
                            </View>

                            <View style={{marginTop: MarginTop, width: "100%", height: "10%"}}>
                                <Text style={[styles.mediumFonts, styles.black, styles.boldWords]}>
                                    電郵
                                </Text>
                                <View style={[{height: "50%", width: "100%", marginTop: "2%", backgroundColor: "#bbbbbb",
                                    borderColor: "black", borderWidth: 1}, 
                                    styles.borderRadius
                                    ]}>
                                    <Text style={[styles.mediumFonts, styles.black, 
                                        {marginLeft: "5%", textAlignVertical: "center", height: "100%"}]}>
                                        {userInfo["電郵"]}
                                    </Text>
                                </View>
                            </View>

                            <View style={{marginTop: MarginTop, width: "100%", height: "10%"}}>
                                <Text style={[styles.mediumFonts, styles.black, styles.boldWords]}>
                                    電話號碼
                                </Text>
                                <View style={[{height: "50%", width: "100%", marginTop: "2%", backgroundColor: "#bbbbbb",
                                    borderColor: "black", borderWidth: 1}, 
                                    styles.borderRadius
                                    ]}>
                                    <Text style={[styles.mediumFonts, styles.black, 
                                        {marginLeft: "5%", textAlignVertical: "center", height: "100%"}]}>
                                        {userInfo["電話"]}
                                    </Text>
                                </View>
                            </View>

                            <View style={{marginTop: MarginTop, width: "100%", height: "10%"}}>
                                <Text style={[styles.mediumFonts, styles.black, styles.boldWords]}>
                                    建立帳號日期
                                </Text>
                                <View style={[{height: "50%", width: "100%", marginTop: "2%", backgroundColor: "#777777",
                                    borderColor: "black", borderWidth: 1}, 
                                    styles.borderRadius
                                    ]}>
                                    <Text style={[styles.mediumFonts, styles.white, 
                                        {marginLeft: "5%", textAlignVertical: "center", height: "100%"}]}>
                                        {userInfo["建立帳號日期"]}
                                    </Text>
                                </View>
                            </View>

                            <View style={[{marginTop: MarginTop, width: "100%", height: "5%"}, styles.center]}>

                                <TouchableOpacity style={{width: "20%", height: "100%"}} onPress={() => updateNickName()}>
                                    <View style={[{height: "100%", width: "100%", borderRadius: 7, backgroundColor: "#E9D14D",
                                        borderColor: "orange", borderWidth: 1},
                                        styles.center]}>
                                            <Text style={[styles.boldWords, {color: "black"}]}>
                                                更改匿稱
                                            </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Background>
        </Layout> 
    )
};

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    },
    bigFonts: {
        fontSize: 24
    },
    black: {
        color: "black"
    },
    mediumFonts: {
        fontSize: 16
    },
    boldWords:{
        fontWeight: "bold"
    },
    borderRadius: {
        borderRadius: 5
    },
    white: {
        color: "white"
    }
})

export default UserProfileScreen;
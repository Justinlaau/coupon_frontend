import { NativeBaseProvider } from 'native-base';
import React from 'react';
import Layout from '../../components/templates/Layout';
import Background from '../../components/templates/Background';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Center } from 'native-base';
import LeftArrow from '../../assets/images/LeftArrow';
import userSvg from '../../assets/images/ICON/UserSVG';
import { SvgXml } from 'react-native-svg';

type NotificationSenderpropsType = {
  sender: string,
  senderId: string,
  senderRole: string,
}

const NotificationSender = ({navigation, route}: any) => {
  const {sender, senderId, senderRole} = route.params

  return (
    <NativeBaseProvider>
      <Layout
        showTabBar={false} 
        isHeading={{"isHeading": false}}
        navigation={navigation}
      >
        <View style={{"position": "absolute", height: "5%", width: "100%", zIndex: 200,
            display: "flex", flexDirection: "row"
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{height: "100%", width: "5%", marginLeft: "2%", alignItems: "flex-start", justifyContent: "center" }}>
              <SvgXml width="100%" height="100%" xml={LeftArrow} />
            </TouchableOpacity>

            <View style={{height: "100%", width: "30%", marginLeft: "2%", marginTop: "1%"}}>
              <Text style={{fontSize: 22, fontWeight: "bold", color: "white", textAlignVertical: "bottom"}}>
                {sender}
              </Text>
            </View>
        </View>
        <Background main={false} contentHeight="94%" tabBarSpace={false} overflow={true}>
          <View style={{ height:"100%" }}>
            <ScrollView style={{ paddingHorizontal: "2%", paddingTop: 50 }}>

                <View style={{ width: "100%", height: "auto", borderWidth: 1, borderRadius: 8, borderColor: "#f3f4f6", elevation: 20, shadowColor: '#e5e7eb', shadowOffset: {width: -4, height: 4}, shadowOpacity: 0.2, shadowRadius: 8 }}>
                  <View style={{ marginBottom: 4, marginHorizontal: 2, marginTop: 2, backgroundColor: "white", borderRadius: 8 }}>
                    <View>{/** for image */}</View>
                    <View style={{ display: "flex", padding: 10 }}>
                      <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "900", color: "#1B1B1B" }}>龍年釣好運 | 🐲吉祥年釣吉祥魚，釣魚人的專屬龍年福利，漁具尖貨 0 元抽</Text>
                      </View>
                      <View style={{ marginVertical: 4 }}>
                        <Text>😈adasjdi</Text>
                      </View>
                      <View style={{ display: "flex", flexDirection: "row", height: 20, marginVertical: 10 }}>
                        <View style={{ flex: 1 }}>
                          <View style={{ width: 20, height: 20, backgroundColor: "#e5e7eb", padding: 3, borderRadius: 50, overflow: "hidden" }}>
                            <SvgXml xml={userSvg}></SvgXml>
                          </View>
                        </View>
                        <View style={{ flex: 10 }}>
                          <Text>系統通知</Text>
                        </View>
                      </View>
                      <View style={{ height: 1, backgroundColor: "#e5e7eb", marginVertical: 10, opacity: 0.5 }} />
                      <Center>
                        <Text style={{ fontSize: 16, color: "#3b82f6", fontWeight: "600" }}>去查看</Text>
                      </Center>
                    </View>
                  </View>
                </View>

            </ScrollView>
          </View>
        </Background>
      </Layout>
    </NativeBaseProvider>

  )
}

export default NotificationSender;
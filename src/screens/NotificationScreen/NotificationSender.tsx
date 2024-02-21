import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/templates/Layout';
import Background from '../../components/templates/Background';
import { View, TouchableOpacity, Text, ScrollView, RefreshControl } from 'react-native';
import { Center } from 'native-base';
import LeftArrow from '../../assets/images/LeftArrow';
import userSvg from '../../assets/images/ICON/UserSVG';
import { SvgXml } from 'react-native-svg';
import { BASE_URL } from '../../config/config';
import { getEndpoint } from '../../socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Socket } from 'socket.io-client';
import { RoleConstant } from '../../common/roleConstant';
import { toggleLoading } from '../../../Redux/Action/CommonAction';

type NotificationSenderpropsType = {
  sender: string,
  senderId: string,
  senderRole: string,
}

const initMap: any = {}
const initList: any = []

const NotificationSender = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const {sender, senderId, senderRole} = route.params
  const scrollRef = useRef({} as any)
  const [notificationList, setNotificationList] = useState(initList)
  const [notificationMap, setNotificationMap] = useState(initMap)

  const fetchStoredNotification = async () => {
    const notifiMap = await AsyncStorage.getItem("notifiMap-" + senderRole + "-" + senderId);
    const notifiList = await AsyncStorage.getItem("notifiList-" + senderRole + "-" + senderId);
    console.log("notifiMap");
    console.log(notifiMap);
    console.log("notifiList");
    console.log(notifiList);
    if (notifiMap != null && notifiList != null) {
      setNotificationMap(JSON.parse(notifiMap));
      setNotificationList(JSON.parse(notifiList));
    }
  }

  // const saveNotification = async () => {
  //   await AsyncStorage.setItem("notifiMap-" + senderRole + "-" + senderId, JSON.stringify(notificationMap));
  //   await AsyncStorage.setItem("notifiList-" + senderRole + "-" + senderId, JSON.stringify(notificationList));
  // }

  const subscriptionRequest = (clientNotificationSocket: Socket, token: string) => {
    return new Promise((resolve, reject) => [
      clientNotificationSocket.emit('subscribe', {"token": token}, (ack: any) => {
        console.log("ack");
        console.log(ack);
        resolve(ack);
      })
    ])
  }

  async function notificationSubscription(clientNotificationSocket: Socket) {
    console.log("notificationSubscription");
    const token: string = await AsyncStorage.getItem('jwt') || "";
    const result: any = await subscriptionRequest(clientNotificationSocket, token);
    console.log("result");
    console.log(result);

    if (result["result"] == 0) {
      let curNotification: any = {};
      let curNotificationList: any = [];
      const snapshot = result["notification_snapshot"];

      for (let item of snapshot) {
        if (item["sender_role"] != senderRole || item["sender_id"] != senderId) continue;

        const pushMessage = {
          "body": item["body"],
          "createDate": item["create_date"],
          "messageId": item["message_id"],
          "messageType": item["message_type"],
          "notificationStatus": item["notification_status"],
          "notificationType": item["notification_type"],
          "redirectType": item["redirect_type"],
          "redirectUrl": item["redirect_url"],
          "sendDate": item["send_date"],
          "senderId": item["sender_id"],
          "senderRole": item["sender_role"],
          "shortMessage": item["short_message"],
          "title": item["title"],
          "updateDate": item["update_date"]
        };
        curNotificationList.push(item["message_id"]);
        curNotification[item["message_id"]] = pushMessage;
      }
      console.log("curNotificationList");
      console.log(curNotificationList);
      console.log("curNotification");
      console.log(curNotification);
      setNotificationList(curNotificationList);
      setNotificationMap(curNotification);
    }

  }

  const getTitleField = (notiMap: any, messageId: string) => {
    if (notiMap[messageId] != null) {
      return notiMap[messageId]["title"] || "";
    }
    return "";
  }

  const getBodyField = (notiMap: any, messageId: string) => {
    if (notiMap[messageId] != null) {
      return notiMap[messageId]["body"] || "";
    }
    return "";
  }

  const getDisplayTimeField = (notiMap: any, messageId: string) => {
    if (notiMap[messageId] != null) {
      const time = notiMap[messageId]["sendDate"]
      const currentTime = new Date();
      const messageTime = new Date(time);
      const timeDiff = currentTime.getTime() - messageTime.getTime();
      const timeDiffInMins = timeDiff / 60000;
      if (timeDiffInMins < 1440) {
        // return the time
        const todayTime = time.split(" ")[1];
        const todayTimeArr = todayTime.split(":");
        return todayTimeArr[0] + ":" + todayTimeArr[1];
      } else if (timeDiffInMins < 2880) {
        return "昨天";
      } else {
        return time.split(" ")[0];
      }
    }
    return "";
  }

  const pageRefresh = async () => {
    try {
      dispatch(toggleLoading(true));
      var clientNotificationSocket: Socket = getEndpoint("clientNotificationSystemInapp");
      if (clientNotificationSocket != null && clientNotificationSocket.connected) {
        console.log("clientNotificationSocket is connected")
        await notificationSubscription(clientNotificationSocket);
        
        clientNotificationSocket.on("broadcast", async (data: any) => {
          console.log("clientNotification broadcast");
          console.log(data);
          console.log("senderRole: " + senderRole);
          console.log("senderId: " + senderId);
          if (data["sender_role"] != senderRole || data["sender_id"] != senderId) return;
          let curNotification: any = notificationMap;
          let curNotificationList: any = notificationList;
          const newMessage = {
            "body": data["body"],
            "createDate": data["create_date"],
            "messageId": data["message_id"],
            "redirectType": data["redirect_type"],
            "redirectUrl": data["redirect_url"],
            "sendDate": data["send_date"],
            "senderId": data["sender_id"],
            "senderRole": data["sender_role"],
            "shortMessage": data["short_message"],
            "title": data["title"],
            "updateDate": data["update_date"]
          }
          if (!curNotification.hasOwnProperty(data["message_id"])) {
            curNotificationList.push(data["message_id"]);
          }
          curNotification[data["message_id"]] = newMessage;
          setNotificationList(curNotificationList);
          setNotificationMap(curNotification);
        })
      } else {
        console.log("clientNotificationSocket is not connected")
      }
    } catch (error) {
      console.log("error")
      console.log(error)
    } finally {
      scrollRef.current.scrollToEnd({ animated: false })
      dispatch(toggleLoading(false));
    }
  }

  useEffect(() => {
    fetchStoredNotification();
    pageRefresh();
    // saveNotification();
  }, [])

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
          <View style={{ height:"100%", paddingBottom: 50 }}>
            <ScrollView 
              style={{ paddingHorizontal: "2%", paddingTop: 50}}
              ref={el => scrollRef.current = el}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => { pageRefresh() }}
                />
              } 
            >
              {
                notificationList.reverse().map((item: any, index: number) => {
                  return (
                    <View style={{ position: "relative", width: "100%", height: "auto", borderWidth: 1, borderRadius: 8, borderColor: "#f3f4f6", elevation: 20, shadowColor: '#e5e7eb', shadowOffset: {width: -4, height: 4}, shadowOpacity: 0.2, shadowRadius: 8, marginBottom: 50 }}>
                      <View style={{ position: "absolute", height: 20, width: "100%", top: "-12%"}}>
                        <Text style={{ textAlign: "center" }}>{ getDisplayTimeField(notificationMap, item) }</Text>
                      </View>
                      <View style={{ marginBottom: 4, marginHorizontal: 2, marginTop: 2, backgroundColor: "white", borderRadius: 8 }}>
                        <View>{/** for image */}</View>
                        <View style={{ display: "flex", padding: 10 }}>
                          <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "900", color: "#1B1B1B" }}>{getTitleField(notificationMap, item)}</Text>
                          </View>
                          <View style={{ marginVertical: 4 }}>
                            <Text>{getBodyField(notificationMap, item)}</Text>
                          </View>
                          <View style={{ display: "flex", flexDirection: "row", height: 20, marginVertical: 10 }}>
                            <View style={{ flex: 1 }}>
                              <View style={{ width: 20, height: 20, backgroundColor: "#e5e7eb", padding: 3, borderRadius: 50, overflow: "hidden" }}>
                                <SvgXml xml={userSvg}></SvgXml>
                              </View>
                            </View>
                            <View style={{ flex: 10 }}>
                              <Text>{sender}</Text>
                            </View>
                          </View>
                          <View style={{ height: 1, backgroundColor: "#e5e7eb", marginVertical: 10, opacity: 0.5 }} />
                          <Center>
                            <Text style={{ fontSize: 16, color: "#3b82f6", fontWeight: "600" }}>去查看</Text>
                          </Center>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
        </Background>
      </Layout>
    </NativeBaseProvider>

  )
}

export default NotificationSender;
import React, { Component } from 'react';
import { Dispatch,  } from 'redux';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, Button, Alert, Pressable, RefreshControl } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import Layout from '../../components/templates/Layout';
import { SvgXml } from 'react-native-svg';
import LeftArrow from '../../assets/images/LeftArrow';
import Background from '../../components/templates/Background';
import NotificationDom from './NotificationDom';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { clientNotificationSocket, socket } from '../../socket';
import { getEndpoint } from '../../socket';
import userSvg from '../../assets/images/ICON/UserSVG';
import messageSVG from '../../assets/images/ICON/messageSVG';
import heartLoveSVG from '../../assets/images/ICON/heartLoveSVG';
import commentSVG from '../../assets/images/ICON/comment';
import { Box, Center } from 'native-base';
import TabBar from '../../components/templates/TabBar';
import NotificationRow from './NotificationRow';
import { Socket } from 'socket.io-client';
import { RoleConstant } from '../../common/roleConstant';
import { BASE_URL } from '../../config/config';
import axios from 'axios';


interface State {
  navigation: any,
  isPopUp: number,
  systemNotification: any,
  ownerNotification: any,
  ownerNameMap: {[key: string]: string};
};

interface MessageType {
  title: string,
  issueDates: Date,
  messageType: string,
  shortMessage: string,
  longMessage: string
};

interface TimeListType {
  [key: string]: number[];
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class NotificationScreen extends Component<{}, State>  {
  constructor(props: any) {
    super(props);
    this.state = {
      navigation: props.navigation,
      isPopUp: -1,
      systemNotification: {},
      ownerNotification: {},
      ownerNameMap: {},
    };
  }

  componentDidMount(): void {
    var clientNotificationSocket: Socket = getEndpoint("clientNotificationSystemInapp");
    if (clientNotificationSocket != null && clientNotificationSocket.connected) {
      console.log("clientNotificationSocket is connected");
      this.notificationSubscription(clientNotificationSocket);

      clientNotificationSocket.on('broadcast', async (data: any) => {
        console.log("clientNotification broadcast data");
        console.log(data);
        let curSystemNotification: any = this.state.systemNotification;
        let curOwnerNotification: any = this.state.ownerNotification;
        let curOwnerNameMap: any = this.state.ownerNameMap;
        if ( data["sender_role"] == RoleConstant.OWNER) {
          if (!curOwnerNotification.hasOwnProperty(data["sender_id"])) {
            curOwnerNotification[data["sender_id"]] = {};
            const ownerNameRes = await axios.post(BASE_URL + 'business/baseGetOwnerNameByIdsRequest', {"owner_ids": [data["sender_id"]]});
            if (ownerNameRes.data.result == 0) {
              curOwnerNameMap[data["sender_id"]] = ownerNameRes.data.data[0].owner_name;
            }
          }
          curOwnerNotification[data["sender_id"]] = {
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
          };
        } else if (data["sender_role"] == RoleConstant.ADMIN) {
          const curSendDate = new Date(curSystemNotification.sendDate);
          const newSendDate = new Date(data.send_date);
          if (newSendDate > curSendDate) curSystemNotification = data;
        }
        this.setState({systemNotification: curSystemNotification, ownerNotification: curOwnerNotification, ownerNameMap: curOwnerNameMap});
      });
    } else {
      console.log("clientNotificationSocket is not connected");
    }
  }

  async pageRefresh() {
    var clientNotificationSocket: Socket = getEndpoint("clientNotificationSystemInapp");
    if (clientNotificationSocket != null && clientNotificationSocket.connected) {
      console.log("clientNotificationSocket is connected");
      this.notificationSubscription(clientNotificationSocket);
    } else {
      console.log("clientNotificationSocket is not connected");
    }
  }
  
  subscriptionRequest = (clientNotificationSocket: Socket, token: string) => {
    return new Promise((resolve, reject) => [
      clientNotificationSocket.emit('subscribe', {"token": token}, (ack: any) => {
        console.log("ack");
        console.log(ack);
        resolve(ack);
      })
    ])
  }

  async notificationSubscription(clientNotificationSocket: Socket) {
    console.log("notificationSubscription");
    const token: string = await AsyncStorage.getItem('jwt') || "";
    const result: any = await this.subscriptionRequest(clientNotificationSocket, token);
    console.log("result");
    console.log(result);

    if (result["result"] == 0) {
      let curSystemNotification: any = {};
      let curOwnerNotification: any = {};
      const snapshot = result["notification_snapshot"];

      for (let item of snapshot) {
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

        if (item["sender_role"] == RoleConstant.OWNER) {
          if (!curOwnerNotification.hasOwnProperty(item["sender_id"])) curOwnerNotification[item["sender_id"]] = pushMessage;
          else {
            const curSendDate = new Date(curOwnerNotification[item["sender_id"]].sendDate);
            const newSendDate = new Date(pushMessage.sendDate);
            if (newSendDate > curSendDate) curOwnerNotification[item["sender_id"]] = pushMessage;
          }
        } else if (item["sender_role"] == RoleConstant.ADMIN) {
          if (curSystemNotification == null) curSystemNotification = pushMessage;
          else {
            const curSendDate = new Date(curSystemNotification.sendDate);
            const newSendDate = new Date(pushMessage.sendDate);
            if (newSendDate > curSendDate) curSystemNotification = pushMessage;
          }
          
        }
      }

      const ownerIdList = Object.keys(curOwnerNotification);
      console.log("ownerIdList");
      console.log(ownerIdList);
      let curOwnerNameMap: {[key: string]: string} = {};
      const { data } = await axios.post(BASE_URL + 'business/baseGetOwnerNameByIdsRequest', {"owner_ids": ownerIdList});
      console.log("data");
      console.log(data);
      if (data.result == 0) {
        for (let owner of data.data) {
          curOwnerNameMap[owner.owner_id] = owner.owner_name;
        }
      }
      this.setState({systemNotification: curSystemNotification, ownerNotification: curOwnerNotification, ownerNameMap: curOwnerNameMap});
    }

  }

  setIsPopUp = (idx: number) => {
    this.setState(() => ({
      isPopUp: idx
    }));
  };
  
  render() {
    const { navigation, isPopUp, systemNotification, ownerNotification } = this.state; 
    
    return (
      <NativeBaseProvider>
      <Layout 
      showTabBar={true} 
      isHeading={{"isHeading": false}}
      navigation={navigation}
    >
      <View style={{"position": "absolute", height: "5%", width: "100%", zIndex: 200,
          display: "flex", flexDirection: "row"
      }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{height: "100%", width: "5%", marginLeft: "2%", alignItems: "flex-start", justifyContent: "center" }}>
            <SvgXml width="100%" height="100%" xml={LeftArrow} />
          </TouchableOpacity>

          <View style={{height: "100%", width: "80%", marginLeft: "2%", marginTop: "1%"}}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: 22, fontWeight: "bold", color: "white", textAlignVertical: "bottom"}}>
              訊息
            </Text>
          </View>
      </View>
      <Background main={false} contentHeight="87%" tabBarSpace={true} overflow={true}>
        <View style={{ height: "100%" }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => { this.pageRefresh() }}
              />
            }
          >
            <View style={{ display: "flex", flexDirection: "row", height: 120 }}>
              <View style={{flex:1}}></View>
              <Center style={{flex: 6}}>
                <View style={{ backgroundColor: "#e0f2fe", height: 60, width: 60, padding: 10, marginBottom: 3, borderRadius: 22, alignItems: "center", justifyContent: "center"  }}>
                  <SvgXml height={30} width={30} xml={userSvg}></SvgXml>
                </View>
                <Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>關注</Text>
              </Center>
              <Center style={{ flex: 6 }}>
                <View style={{ backgroundColor: "#fee2e2", height: 60, width: 60, padding: 10, marginBottom: 3, borderRadius: 22, alignItems: "center", justifyContent: "center"  }}>
                  <SvgXml height={30} width={30} xml={heartLoveSVG}></SvgXml>
                </View>
                <Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>讚</Text>
              </Center>
              <Center style={{ flex: 6 }}>
                <View style={{ backgroundColor: "#f0fdf4", height: 60, width: 60, padding: 10, marginBottom: 3, borderRadius: 22, alignItems: "center", justifyContent: "center"  }}>
                  <SvgXml height={30} width={30} xml={commentSVG}></SvgXml>
                </View>
                <Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>評論</Text>
              </Center>
              <View style={{flex:1}}></View>
            </View>
            <View>
              {
                <NotificationRow 
                  icon={messageSVG}
                  iconType="svg"
                  sender="訊息通知"
                  senderId="coupongoAdmin"
                  senderRole="admin"
                  shortMessage={systemNotification.shortMessage || "暫無訊息"}
                  time={systemNotification.sendDate || ""}
                  toSenderPage={() => navigation.navigate("NotificationSender", {sender: "訊息通知", senderId: "coupongoAdmin", senderRole: "admin"})}
                />
              }
              {
                Object.keys(ownerNotification).map((key: string) => (
                  <NotificationRow
                    key={key}
                    icon={messageSVG}
                    iconType="svg"
                    sender={this.state.ownerNameMap[key]}
                    senderId={key}
                    senderRole="owner"
                    shortMessage={ownerNotification[key].shortMessage}
                    time={ownerNotification[key].sendDate}
                    toSenderPage={() => navigation.navigate("NotificationSender", {sender: this.state.ownerNameMap[key], senderId: key, senderRole: RoleConstant.OWNER})}
                  />
                ))
              }
            </View>
          </ScrollView>
        </View>
      </Background>
    </Layout>
    </NativeBaseProvider>
    );
    }
  }

  export default NotificationScreen;

  const styles = StyleSheet.create({
      touchableOpacityContainer:{
          width: "100%",
          height: screenHeight * 0.15,
          marginBottom: "2%"
      },
      popUpContainer: {
          position: "absolute",
          width: "96%",
          height: "96%",
          marginLeft: "2%",
          marginTop: "2%",
          backgroundColor: "white",
          borderRadius: 10,
          zIndex: 200
      }
})
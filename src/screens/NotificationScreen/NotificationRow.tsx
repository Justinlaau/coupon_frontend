import React from 'react';
import { Pressable, View, Text, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Center } from 'native-base';

type toSenderPageFunction = {
  (): void
}

type NotificationRowpropsType = {
  icon: string,
  iconType: string,
  sender: string,
  senderId: string,
  senderRole: string,
  shortMessage: string,
  time: string,
  toSenderPage: toSenderPageFunction
}

const NotificationRow = (props: NotificationRowpropsType) => {

  const { icon, iconType, sender, senderId, senderRole, shortMessage, time, toSenderPage } = props;
  
  const timeDisplay = (time: string) => {
    const currentTime = new Date();
    const messageTime = new Date(time);
    const timeDiff = currentTime.getTime() - messageTime.getTime();
    const timeDiffInMins = timeDiff / 60000;
    if (timeDiffInMins < 30) {
      return "剛剛";
    } else if (timeDiffInMins < 60) {
      return `${Math.floor(timeDiffInMins)} 分鐘前`;
    } else if (timeDiffInMins < 1440) {
      return `${Math.floor(timeDiffInMins / 60)} 小時前`;
    } else if (timeDiffInMins < 2880) {
      return "昨天";
    } else {
      return time.split(" ")[0];
    }
  }

  return (
    <Pressable onPress={() => toSenderPage()} style={{ display: "flex", flexDirection: "row", height: 100, padding: 10 }}>
      <Center style={{ flex: 1}}>
        <View style={{ backgroundColor: "#e0f2fe", height: 60, width: 60, borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
          {
            iconType === "svg" ? 
            <SvgXml height={30} width={30} xml={icon}></SvgXml> :
            <Image source={{uri: sender}}/>
          }
        </View>
      </Center>
      <View style={{ flex: 4, justifyContent: "center" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={{ flex: 3, fontSize: 18, fontWeight: "bold", color: "#1B1B1B", marginBottom: 4 }}>{sender}</Text>
          <Text numberOfLines={1} adjustsFontSizeToFit={true} style={{ flex: 1, textAlignVertical: "center" }}>{timeDisplay(time)}</Text>
        </View>
        <Text ellipsizeMode="tail" numberOfLines={1} style={{ color: "#9ca3af" }}>{shortMessage}</Text>
      </View>
    </Pressable>
  )
}

export default NotificationRow;

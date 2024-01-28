import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, Button } from 'react-native';
import Layout from '../../components/templates/Layout';
import { SvgXml } from 'react-native-svg';
import LeftArrow from '../../assets/images/LeftArrow';
import Background from '../../components/templates/Background';
import NotificationDom from './NotificationDom';

interface State {
  navigation: any,
  isPopUp: number,
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

const messagesList: MessageType[] = [{
    title: "歡迎xxx加盟",
    issueDates: new Date(2024, 0, 26),
    messageType: "Welcome",
    shortMessage: "歡迎xxx加盟 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
    longMessage: "test"
  },
  {
    title: "搶！",
    issueDates: new Date(2024, 0, 27),
    messageType: "Advertisement",
    shortMessage: "Mcdonald 推出新優惠卷 快搶",
    longMessage: "test2"
  },
  {
    title: "歡迎xxx加盟",
    issueDates: new Date(2024, 0, 20),
    messageType: "Welcome",
    shortMessage: "歡迎xxx加盟 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
    longMessage: "test3"
  },
  {
    title: "搶！",
    issueDates: new Date(2023, 11, 31),
    messageType: "Advertisement",
    shortMessage: "Mcdonald 推出新優惠卷 快搶",
    longMessage: "test4"
  },
  {
    title: "搶！",
    issueDates: new Date(2023, 10, 31),
    messageType: "Advertisement",
    shortMessage: "Mcdonald 推出新優惠卷 快搶",
    longMessage: "test5"
  },
  {
    title: "搶！",
    issueDates: new Date(2024, 0, 28, 3),
    messageType: "Advertisement",
    shortMessage: "Mcdonald 推出新優惠卷 快搶",
    longMessage: "test6"
  },
  {
    title: "搶！",
    issueDates: new Date(2024, 0, 27, 15),
    messageType: "Advertisement",
    shortMessage: "Mcdonald 推出新優惠卷 快搶",
    longMessage: "test7"
  },
];

var timeList: TimeListType = {
  "hour": [],
  "day": [],
  "week": [],
  "month": [],
  "other": []
};

const timeKeyToMessageMap: {[key: string]: string} = {
  "hour": "最近一小時內",
  "day": "最近一天內",
  "week": "最近一週內",
  "month": "最近一個月內",
  "other": "超過一個月"
};

function calculateTimeDifference(date1: Date, date2: Date): number {
  const differenceInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  return differenceInHours;
}

class NotificationScreen extends Component<{}, State>  {
  constructor(props: any) {
    super(props);
    this.state = {
      navigation: props.navigation,
      isPopUp: -1,
    };
    this.resetTimeList();
    this.messageListInit();
  }
  
  resetTimeList(){
    timeList = {
      "hour": [],
      "day": [],
      "week": [],
      "month": [],
      "other": []
    };    
  }

  messageListInit() {
    messagesList.sort((a, b) => b.issueDates.getTime() - a.issueDates.getTime());
    const currentTime = new Date();

    messagesList.map((el, idx) => {
      const timeDifference = calculateTimeDifference(el.issueDates, currentTime); 
      if (timeDifference < 1){
        timeList.hour.push(idx);
      }else if (timeDifference < 24){
        timeList.day.push(idx);
      }else if (timeDifference < 168){
        timeList.week.push(idx);
      }else if (timeDifference < 744){
        timeList.month.push(idx);
      }else{
        timeList.other.push(idx);
      }
    });
  }

  setIsPopUp = (idx: number) => {
    this.setState(() => ({
        isPopUp: idx
    }));
  };
  
  render() {
    const { navigation, isPopUp } = this.state; 
    
    return (
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
              <Text style={{fontSize: 25, color: "white", textAlignVertical: "bottom"}}>
                  通知
              </Text>
          </View>
      </View>
      <Background main={false} contentHeight="95%" tabBarSpace={false} overflow={true}>
          <ScrollView 
            style={{width: "92%", height: "100%", marginLeft: "4%", position: "absolute", zIndex: 100}}
            showsVerticalScrollIndicator={false}
          >
            {
              Object.keys(timeList).map((key: string) => (
                timeList[key].length === 0 ? <></> :
                <View>
                  <Text style={{fontSize: 30, fontWeight: "bold", color: "#333"}}>
                    {timeKeyToMessageMap[key]}
                  </Text>
                  {timeList[key].map((el) => (
                    <TouchableOpacity style={styles.touchableOpacityContainer} onPress={() => {this.setIsPopUp(el)}}>
                      <NotificationDom 
                      key={el}
                      title={messagesList[el].title}
                      issueDate={messagesList[el].issueDates}
                      messageType={messagesList[el].messageType}
                      shortMessage={messagesList[el].shortMessage}
                      longMessage={messagesList[el].longMessage}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ))
            }
          </ScrollView>
          <View style={[{width: "100%", height: "100%", backgroundColor: "#EEEEEE", position: "absolute", zIndex: 199}, isPopUp !== -1? {"top": 0}: {"top": -10000}]}>
            <View style={[styles.popUpContainer]}>
                  <Text>
                    {this.state.isPopUp === -1 ? "" : messagesList[this.state.isPopUp].longMessage}
                  </Text>
                <Button title="Understand" onPress={() => this.setIsPopUp(-1)}/>
            </View>
          </View>
          
      </Background>
    </Layout>
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
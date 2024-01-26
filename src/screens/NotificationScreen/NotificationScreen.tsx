import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, Button } from 'react-native';
import Layout from '../../components/templates/Layout';
import { SvgXml } from 'react-native-svg';
import LeftArrow from '../../assets/images/LeftArrow';
import Background from '../../components/templates/Background';
import NotificationDom from './NotificationDom';

interface State {
    navigation: any,
    isPopUp: boolean,
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class NotificationScreen extends Component<{}, State>  {
  constructor(props: any) {
    super(props);
    this.state = {
      navigation: props.navigation,
      isPopUp: false,
    };
  }

  setIsPopUp = (flag: boolean) => {
    this.setState(() => ({
        isPopUp: flag
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
        <Background main={false} contentHeight="95%" tabBarSpace={false}>
            <View style={{
                width: "93%", height: "100%", marginLeft: "3.5%", position: "absolute", zIndex: 100
            }}>
                <TouchableOpacity style={styles.touchableOpacityContainer} onPress={() => {this.setIsPopUp(true)}}>
                    <NotificationDom 
                        title="歡迎xxx加盟"
                        issueDate={new Date()}
                        messageType="Welcome Message"
                        shortMessage='歡迎xxx加盟 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
                        longMessage='test'
                        />
                </TouchableOpacity>
            </View>
            <View style={[styles.popUpContainer, isPopUp? {"top": 0}: {"top": -10000}]}>
                <Text>
                    歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟歡迎xxx加盟
                </Text>
                <Button title="Understand" onPress={() => this.setIsPopUp(false)}/>
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
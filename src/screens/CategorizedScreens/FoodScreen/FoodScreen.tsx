import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Layout from '../../../components/templates/Layout';
import Background from '../../../components/templates/Background';
import { SvgXml } from 'react-native-svg';
import { MagnifierSVG } from '../../../assets/images/MagnifierSVG';
import FoodSubpageRouter from './FoodSubpageRouter';
import FilteredCouponListing from '../FilteredCouponListing';
import { ScrollView } from 'native-base';

interface State {
    navigation: any;
}

class FoodScreen extends Component<{}, State>  {
  constructor(props: any) {
    super(props);
    this.state = {
      navigation: props.navigation,
    };
  }


  render() {
    const { navigation } = this.state; 

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
                <Text style={{fontSize: 35, color: "white", textAlignVertical: "center"}}>
                    {"<"}
                </Text>
            </TouchableOpacity>

            <View style={{height: "100%", width: "30%", marginLeft: "2%"}}>
                <Text style={{fontSize: 30, color: "white", textAlignVertical: "center"}}>
                    精選美食
                </Text>
            </View>

          <View style={{position: "absolute", right: 10, top: 3, height: "90%", width: "40%", zIndex: 120, 
            backgroundColor: "white", borderRadius: 7, flexDirection: "row"}}>
            <View style={{display: "flex", justifyContent: "center", alignContent: "center", height: "100%"}}>
              <SvgXml height="40%" xml={MagnifierSVG} />
            </View>
            <TextInput style={{height: "100%"}} placeholder='搜尋優惠卷?'/>
          </View>
        </View>
        <Background main={false} contentHeight="95%" tabBarSpace={false}>
            <View style={{
                width: "93%", height: "100%", marginLeft: "3.5%"
            }}>
                <FoodSubpageRouter height={"25%"} navigation={navigation}/>

                <View style={{
                    height: "73%", backgroundColor: "white", marginTop: "2%", borderRadius: 10
                }}>
                    <View style={{
                        width: "100%", display: "flex", justifyContent: "center", alignItems: "center"
                    }}>
                        <ScrollView>
                            <FilteredCouponListing category={[2]}/>
                        </ScrollView>
                    </View>
                </View>
            </View>
            
        </Background>
      </Layout>
    );
  }
}

export default FoodScreen;
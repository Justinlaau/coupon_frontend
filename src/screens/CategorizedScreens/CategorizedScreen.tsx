import React, { Component } from 'react';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Layout from '../../components/templates/Layout';
import Background from '../../components/templates/Background';
import { SvgXml } from 'react-native-svg';
import { MagnifierSVG } from '../../assets/images/MagnifierSVG';
import SubpageRouter from './SubpageRouter';
import FilteredCouponListing from './FilteredCouponListing';
import { ScrollView } from 'native-base';
import LeftArrow from '../../assets/images/LeftArrow';

type RootStackParamList = {
  Param: {
    screenName: string,
    subcategories: string[],
    subcategoriesPNG: any[],
    category: number
  }
}

type SubcategoriesScreenProps = {
  route: RouteProp<RootStackParamList, 'Param'>;
  navigation: NavigationProp<any>;
};

class CategorizedScreen extends Component<SubcategoriesScreenProps> {
  render() {
    const { screenName, subcategories, subcategoriesPNG, category } = this.props.route.params;

    return (
        <Layout 
        showTabBar={false} 
        isHeading={{"isHeading": false}}
        navigation={this.props.navigation}
      >
        <View style={{"position": "absolute", height: "5%", width: "100%", zIndex: 200,
            display: "flex", flexDirection: "row"
        }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{height: "100%", width: "5%", marginLeft: "2%", alignItems: "flex-start", justifyContent: "center" }}>
              <SvgXml width="100%" height="100%" xml={LeftArrow} />
            </TouchableOpacity>

            <View style={{height: "100%", width: "30%", marginLeft: "2%", marginTop: "1%"}}>
                <Text style={{fontSize: 25, color: "white", textAlignVertical: "bottom"}}>
                    { screenName }
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
                {
                  subcategories.length > 0 ? 
                  <SubpageRouter height={"20%"} navigation={this.props.navigation} subcategories={subcategories} subcategoriesPNG={subcategoriesPNG}/>:
                  <></>
                }
                <View style={{
                  height: "5%"
                }}> 
                  <Text style={{fontSize: 30, fontWeight: "bold", color: "#222"}}>
                      精選優惠卷
                  </Text>
                </View>

                <View style={{
                    height: subcategories.length > 0 ? "73%" : "93%", backgroundColor: "white", marginTop: "2%", borderRadius: 10
                }}>
                    <View style={{
                        width: "100%", display: "flex", justifyContent: "center", alignItems: "center"
                    }}>
                        <ScrollView>
                            <FilteredCouponListing category={[category]}/>
                        </ScrollView>
                    </View>
                </View>
            </View>
            
        </Background>
      </Layout>
    );
  }
}

export default CategorizedScreen;
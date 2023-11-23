import React, { useEffect, useState } from 'react';
import { 
    View, 
    TextInput,
    StyleSheet,
    Text,
    SafeAreaView, 
    ScrollView, 
    Alert,
    TouchableOpacity
} from 'react-native';
import Layout from '../../components/templates/Layout';
import {SvgXml} from 'react-native-svg';
import axios from 'axios';
import DateIconSVG from "../../assets/images/DateIconSVG";
import WalletBackground from '../../components/templates/WalletBackground';
import ActualCoupon from '../../components/atoms/ActualCoupon';
import CouponListingScreen from '../CouponListingScreen/CouponListingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, BASE_S3_IMG_URL } from '../../config/config';

const WalletScreen = ({navigation: { navigate }}) => {
    const [buttonState, setButtonState] = useState(1);
    const [couponList, setCouponList] = useState([]);

    const pressHandler = (button_id)=>{
        setButtonState(button_id)
    };

    const fetchWallet = async () => {
        // let token = await AsyncStorage.getItem('jwt');
        console.log("fetching")
        let {data} = await axios.post(BASE_URL + "coupon/clientWallet", {
            "clientId": "1",
            "sorted": true
        });
        setCouponList(data);
    }

    useEffect(() => {
        fetchWallet();
    }, []);

    return(
    <Layout showTabBar={true}>
        <WalletBackground main={true} contentHeight="82%" tabBarSpace={true} >
            <View style={{ flexDirection: 'row', justifyContent: "space-between"}}>  
                <View style={{ width:"35%", marginTop: "5%" , marginLeft: "10%"}}>
                    <TouchableOpacity onPress={()=>pressHandler(1)}
                    style={{
                        borderWidth: 2,
                        alignItems: 'center',
                        padding: 10,
                        borderColor: "#DC2B37",
                        borderRadius: 30,
                        backgroundColor: buttonState == 1 ? "#DC2B37" : "#FFF",
                        right: "10%"
                    }} >
                    <Text style={{
                        color: buttonState == 1 ? "#FFF" : "#DC2B37",
                        fontWeight: 'bold'}}>Reserved Coupon
                    </Text>
                    </TouchableOpacity>
                </View>

                <View style={{width:"35%", marginTop: "5%", marginRight: "10%" }}>
                    <TouchableOpacity onPress={()=>pressHandler(2)} 
                    style={{
                        borderWidth: 2,
                        alignItems: 'center',
                        padding: 10,
                        borderColor: buttonState == 2 ? "#FFF" : "#DC2B37",
                        borderRadius: 30,
                        backgroundColor: buttonState == 2 ? "#DC2B37" : "#FFF",
                        left: "10%"
                    }} >
                        
                    <Text style={{
                        color: buttonState == 2 ? "#FFF" : "#DC2B37",
                        fontWeight: 'bold'}}>Used Coupon
                    </Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{
                flex: 1,
                flexDirection: "row",
                alignItems:'flex-start',
                justifyContent: 'space-around',
                marginTop: "5%" 
                }}>
                <TouchableOpacity  style={{flex: 1, marginLeft: "55%", marginTop: 1}}>
                    <SvgXml width="100%" height="20" xml={DateIconSVG} />
                </TouchableOpacity>
                <Text style={{marginRight: "5%"}}>Arrange with Date</Text>
            </View>

            <ScrollView style={{height: "80%"}}>
                {
                    couponList.map((coupon, index) => {
                        if (coupon.used < coupon.total && buttonState == 1) {
                            return (
                                <TouchableOpacity key={coupon.coupon_id} onPress={() => navigate("CouponItem", {coupon: coupon})}>
                                <ActualCoupon
                                    companyName={coupon.owner_name} 
                                    value={coupon.value} 
                                    image={{uri: BASE_S3_IMG_URL + coupon.image}}
                                />
                                </TouchableOpacity>
                            )
                        } else if (coupon.used >= coupon.total && buttonState == 2) {
                            return (
                                <ActualCoupon
                                    key={coupon.coupon_id}
                                    companyName={coupon.owner_name} 
                                    value={coupon.value} 
                                    image={{uri: BASE_S3_IMG_URL + coupon.image}}
                                />
                            )
                        } else {
                            return null;
                        }
                    })
                }
            </ScrollView>
        </WalletBackground>
    </Layout>       
    )
}

export default WalletScreen;

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

})

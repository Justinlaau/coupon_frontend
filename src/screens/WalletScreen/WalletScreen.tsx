import React, { useEffect, useState } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    ScrollView, 
    TouchableOpacity,
    RefreshControl,
    Alert
} from 'react-native';
import Layout from '../../components/templates/Layout';
import {SvgXml} from 'react-native-svg';
import axios from 'axios';
import DateIconSVG from "../../assets/images/DateIconSVG";
import WalletBackground from '../../components/templates/WalletBackground';
import ActualCoupon from '../../components/atoms/ActualCoupon';
import CouponListingScreen from '../CouponListingScreen/CouponListingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_S3_IMG_URL, { BASE_URL } from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoading, setCallback, setMessagePopup, toggleMessagePopup } from '../../../Redux/Action/CommonAction';
import { SET_SUCCESS_CALLBACK, SET_ERROR_MESSAGE, TOGGLE_ERROR_POPUP } from '../../../Redux/Action/ActionType';
import { ErrorCode } from '../../common/ErrorCode';

const WalletScreen = ({navigation: { navigate }}: any) => {
    const dispatch = useDispatch();
    const [buttonState, setButtonState] = useState(1);
    const [couponList, setCouponList] = useState([]);

    const pressHandler = (button_id: number)=>{
        setButtonState(button_id)
    };

    const fetchWallet = async () => {
        if(!await AsyncStorage.getItem("jwt")){
            Alert.alert("登入后才能使用錢包功能");
            navigate("Login")
        }else{
            try {
                dispatch(toggleLoading(true));
                let {data} = await axios.post(BASE_URL + "coupon/clientWallet", {
                    "sorted": true
                });
                // TODO: popup callback, developing
                // dispatch(setCallback(() => redirectLogin, SET_SUCCESS_CALLBACK));
                // dispatch(setMessagePopup("Please login to continue.", SET_ERROR_MESSAGE));
                // dispatch(toggleMessagePopup(true, TOGGLE_ERROR_POPUP));
                // return;
    
                console.log("data")
                console.log(data)
                if (data.result == 0 && data.result == ErrorCode.INVALID_USER) {
                    // dispatch(setCallback(() => navigate("Login"), SET_SUCCESS_CALLBACK));
                    navigate("Login");
                }
                console.log(data.couponList);
                setCouponList(data.couponList);
            } catch (error) {
                console.log("fetchWallet error");
                console.log(error);
            } finally {
                dispatch(toggleLoading(false));
            }
        }
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
                        fontWeight: 'bold'}}> 未使用的優惠卷
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
                        fontWeight: 'bold'}}>已使用的優惠卷
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
                <Text style={{marginRight: "5%"}}> 按日期排序 </Text>
            </View>

            <ScrollView style={{height: "80%"}}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => fetchWallet()}
                            />
                        }
                    >                
                    <View style={{width: "92%", marginLeft: "4%"}}>

                {
                    !couponList?navigate("Login") :couponList.map((coupon: any, index) => {
                        if (coupon.used < coupon.total && buttonState == 1) {
                            return (
                                    <TouchableOpacity key={coupon.coupon_id} onPress={() => navigate("CouponItem", {coupon: coupon})}>
                                    <ActualCoupon
                                        title={coupon.title}
                                        companyName={coupon.owner_name} 
                                        value={coupon.value} 
                                        image={{uri: BASE_S3_IMG_URL + coupon.image}}
                                        couponType={coupon.coupon_type}
                                        rollAnimated={false}
                                        rightBar={false}
                                        availablePercent={0}
                                        addFunc={{}}
                                        />
                                    </TouchableOpacity>
                            )
                        } else if (coupon.used >= coupon.total && buttonState == 2) {
                            return (
                                <ActualCoupon
                                title={coupon.title}
                                key={coupon.coupon_id}
                                companyName={coupon.owner_name} 
                                value={coupon.value} 
                                image={{uri: BASE_S3_IMG_URL + coupon.image}}
                                couponType={coupon.coupon_type}
                                rollAnimated={false}
                                rightBar={false}
                                availablePercent={0}
                                addFunc= {{}}
                                />
                                )
                            } else {
                                return null;
                            }
                        })
                    }
                </View>
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

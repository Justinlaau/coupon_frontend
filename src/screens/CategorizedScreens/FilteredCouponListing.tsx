import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import BASE_S3_IMG_URL, { BASE_URL } from '../../config/config';
import { useDispatch } from 'react-redux';
import { toggleLoading, setMessagePopup, toggleMessagePopup } from '../../../Redux/Action/CommonAction';
import { Alert, View } from 'react-native';
import ActualCoupon from '../../components/atoms/ActualCoupon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_ERROR_MESSAGE, TOGGLE_ERROR_POPUP } from '../../../Redux/Action/ActionType';

interface FilteredCouponListingType{
    category: number[],
};

const FilteredCouponListing = (props: FilteredCouponListingType) => {
    const dispatch = useDispatch();
    const [couponGroups, setCouponGroups] = useState([])
    const [message, setMessage] = useState("成功!!");
    const [infoPopup, setInfoPopup] = useState(false);

    const filterCouponGroups = async (filterList: number[]) => {
        try {
          dispatch(toggleLoading(true));

          let { data } = await axios.post(BASE_URL + "coupon/filterCouponGroups", {
            "categories": filterList,
            "address_locode": ""
          })

          setCouponGroups(data)
    
        } catch (error) {
          console.log("error")
          console.log(error)
        } finally {
          dispatch(toggleLoading(false));
        }
    }

    useEffect(() => {
      filterCouponGroups(props.category);
    }, []);

    const addFunc = async (couponGroupId: string, expireDate: string) => {
        if(!await AsyncStorage.getItem("jwt")){
          Alert.alert("登錄後才可享有COUPONGO服務");
        }else{
          if (infoPopup) {
            setInfoPopup(false);
            return;
          }
          setMessage("操作中");
          setInfoPopup(true);
          // console.log("adding coupon");
          let {data} = await axios.post(BASE_URL + "coupon/addCoupon", {
            "coupon_group_id": couponGroupId,
            "total": 1
          })
    
          if ( data["result"] == 0 ) {
            setMessage("成功!!");
            setInfoPopup(true);
          } else {
            dispatch(setMessagePopup("Add Coupon Failed: " + data["message"], SET_ERROR_MESSAGE));
            dispatch(toggleMessagePopup(true, TOGGLE_ERROR_POPUP));
          }
        }
      }
      
    return (
        <View style={{height: "100%", width: "95%"}}>
            {
                couponGroups.map((el, idx) => (
                  <ActualCoupon
                    key={idx}
                    companyName={el["owner_name"]}
                    title={el["title"]}
                    value={el["value"]}
                    image={{ uri: BASE_S3_IMG_URL + el["image"] }}
                    couponCategory={el["coupon_category"]}
                    rollAnimated={false}
                    rightBar={true}
                    availablePercent={el["available"]/el["stock"]}
                    addFunc={() => addFunc(el["coupon_group_id"], el["expire_date"])}
                  />
                  )
                )
            }
        </View>
    );
};

export default FilteredCouponListing;
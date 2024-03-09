import { position } from 'native-base/lib/typescript/theme/styled-system';
import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface ShopType{
    shopName: string
}

interface CouponType{
    couponName: string
}

interface SearchContextType{
    navigation: any,
    shop: any[],
    coupon: any[]
}

const SearchContext = (props : SearchContextType) => {
    return (

        <View style={{position:"absolute", width: "100%", height: "100%", zIndex: 300, backgroundColor: "white"}}>
            {props.shop.length === 0? <></>: 
                <View>
                    <Text> 商舖 </Text>
                    {props.shop.map(() => (
                        <>
                        </>
                    ))}
                </View>
            }

            {props.coupon.length === 0? <></>:
                <View>
                    <Text> 優惠卷 </Text>
                    {props.coupon.map(() => (
                        <>
                        </>
                    ))}
                </View>
            }
        </View>
    )
}

export default SearchContext;
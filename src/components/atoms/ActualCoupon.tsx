import { color } from "@rneui/base";
import { Dict } from "native-base/lib/typescript/theme/tools";
import React, { useEffect, useRef, useState } from "react";
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Animated} from "react-native";
import GiftIcon from 'react-native-vector-icons/FontAwesome'


const numberToChinese = (number: number) => {
    const chineseNumbers: Dict = {
        0: '零',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九',
        10: '十',
        100: '百',
        1000: '千',
        10000: '萬',
        100000: '十萬'
      };
    
      if (number < 0 || number > 99999) {
        throw new Error('Number out of range');
      }

      if (number in chineseNumbers){
        return "港幣" + chineseNumbers[number] + "元現金卷";
      }
    
      let result = '';
      const digits = String(number).split('').map(Number);
      const digitsCount = digits.length;
    
      for (let i = 0; i < digitsCount; i++) {
        const currentDigit = digits[i];
        const currentPlace = digitsCount - i - 1;
    
        if (currentDigit !== 0) {
            if (currentPlace !== 0){
                result += chineseNumbers[currentDigit] + chineseNumbers[10 ** currentPlace];
            }
            else {
                result += chineseNumbers[currentDigit];
                }
        } else {
          if (result !== '' && i !== digitsCount - 1 && digits[i + 1] !== 0) {
            result += chineseNumbers[0];
          }
        }
      }
    
      return "港幣" + result + "元現金卷";
}

const chineseConverter = (str: string) => {
    if (!isNaN(Number(str))){
        return numberToChinese(Number(str));
    }
    
};

const backgroundColor: Dict = {
    0: "#ff5733",
    1: "#ff7e15",
    2: "#FFC300",
}

interface ActualCouponType{
    image: any,
    companyName: string,
    value: string,
    couponType: number,
    rollAnimated: boolean,
};

const ActualCoupon = (props: ActualCouponType) =>{
    const [left, setLeft] = useState(true);

    const widthAnimation = useRef(new Animated.Value(0)).current;

    const onClickToLeft = async () => {
        await Animated.timing(widthAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      setLeft(true);
    };

    const onClickToRight = async () => {
        await Animated.timing(widthAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }).start();
        setLeft(false);
      };
    
    const animatedWidth = widthAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container} >
            <View style={{
                width: deviceWidth - 20,
                flexDirection: "row",
                backgroundColor: backgroundColor[props.couponType],
                height: 200,
                borderRadius: radius,

                shadowColor: '#000',
                shadowOffset:{
                    width: 5,
                    height: 5
                },
                shadowRadius: 5,
                shadowOpacity: 0.75,
                elevation: 10,
                overflow: "hidden"
            }}
            >
                <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={props.image} />
                </View>
                <View style={styles.CouponDescription}>
                    {/* <GiftIcon name="gift" size={30} style={{color: 'white'}}/> */}
                    {/* props.text */}
                    <View style={[styles.frontWords, {backgroundColor: backgroundColor[props.couponType]}]}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'white',
                            marginTop:'20%'}}>
                            {props.companyName}
                        </Text>
                        <Text style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: 'white'}}>
                            {chineseConverter(props.value)}
                        </Text >

                        <Text style={{fontSize: 45, color: 'white'}}><Text style={{fontSize: 35}}>$</Text>{props.value}</Text>
                    </View>
                    { props.rollAnimated? 
                        <TouchableOpacity style={[styles.basedAbs, {zIndex: 7}]} onPress={left? onClickToRight: onClickToLeft} activeOpacity={1}>
                            <Animated.View style={[styles.layeredWords, { width: animatedWidth }]}>
                                <Text numberOfLines={2}>
                                    哈囉 這是條款這是條款這是條款這是條款這是條款這是條款這是條款這是條款這是條款這是條款這是條款這是條款這是條款這是條款這是條款這是條款這是條款
                                </Text>
                            </Animated.View>
                        </TouchableOpacity>
                        : <></>
                    }
                </View>
            </View>
        </View>


    )
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const radius = 20;
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: "5%",
        marginBottom: '5%',
    },
    imageContainer:{
        height: 200,
        width: "35%",
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    imageStyle: {
        height: "80%",
        width: "80%"
    },
    basedAbs:{
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    frontWords:{
        zIndex: 5,
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: 10,
    },
    layeredWords:{
        zIndex: 7,
        backgroundColor: "#F4F4F4",
        position: "absolute",
        height: "100%",
        overflow: "hidden",
    },
    CouponDescription:{
        height: 200,
        width: "65%",
        borderLeftWidth: 2.2,
        borderLeftColor: '#FFFFFF',
        borderStyle: 'dotted',
    },
})

export default ActualCoupon;





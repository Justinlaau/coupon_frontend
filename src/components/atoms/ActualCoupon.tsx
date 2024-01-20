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
        100000: '十萬',
        1000000: '百萬'
      };
      
      if (number < 0 || number > 9999999) {
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
    0: "#FF6C22",
    1: "#FFB22C",
    2: "#DB6144",
}

interface ActualCouponType{
    image: any,
    title: string,
    companyName: string,
    value: string,
    couponType: number,
    rollAnimated: boolean,
    rightBar: boolean,
    availablePercent: number
};

const radius = 10;
const couponHeight = 150;
const ActualCoupon = (props: ActualCouponType) =>{
    const viewRef = useRef<View>(null);
    const [viewHeight, setViewHeight] = useState<number>(0);
  
    const handleLayout = () => {
        viewRef.current?.measure((x: number, y: number, width: number, height: number) => {
        setViewHeight(height);
      });
    };

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
            <TouchableOpacity style={{width: "100%"}}>
                <Text style={{fontWeight: "bold", color: "#4C4C4C", fontSize: 20}}>
                    {props.companyName}
                </Text>
            </TouchableOpacity>
            <View style={[{
                width: "100%",
                flexDirection: "row",
                backgroundColor: backgroundColor[props.couponType],
                height: couponHeight,
                borderRadius: radius,
            }, styles.shadow, props.rightBar? {}: {overflow: "hidden"}]}
            >
                <View style={[styles.imageContainer]}>
                    <Image style={styles.imageStyle} source={props.image} />
                </View>
                <View style={[styles.CouponDescription, props.rightBar? {width: "50%"} : {width: "65%"}]}>
                    {/* <GiftIcon name="gift" size={30} style={{color: 'white'}}/> */}
                    {/* props.text */}
                    <View style={[styles.frontWords, {backgroundColor: backgroundColor[props.couponType]}]}>
                        <View style={[styles.frontContainer]}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                                {props.title}
                            </Text>
                            <Text style={{
                                fontSize: 13,
                                fontWeight: 'bold',
                                color: 'white'}}>
                                {chineseConverter(props.value)}
                            </Text >
                            <Text style={{fontSize: 45, color: 'white'}}><Text style={{fontSize: 35}}>$</Text>{props.value}</Text>
                        </View>
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
                {
                    props.rightBar ? 
                    <View style={{width: "15%", backgroundColor: "white", height: "100%"}}>
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center", height: "70%", width: "100%"}}
                            ref={viewRef} onLayout={handleLayout}>
                            <View style={{position: "absolute", width: "50%", height: "90%", backgroundColor: backgroundColor[props.couponType], opacity: 0.3, 
                            borderRadius: 30, top: 0.1 * viewHeight
                            }}>
                            </View>
                            <View style={{position: "absolute", width: "50%", backgroundColor: backgroundColor[props.couponType], borderRadius: 30,
                            top: (props.availablePercent) * viewHeight, height: (1 - props.availablePercent) * viewHeight
                            }}>
                            </View>
                            <View style={{position: "absolute", width: 30, height: 30, backgroundColor: backgroundColor[props.couponType], 
                            borderRadius: 30, borderColor: "white", borderWidth: 3,
                            top: (props.availablePercent) * viewHeight - 18 }}>
                            </View>
                        </View>
                        <View style={{height: "30%", width: "100%"}}>
                            <TouchableOpacity style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Text style={{fontSize: 30, color: "orange"}}>
                                    搶
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : <></>
                }
            </View>
        </View>


    )
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: "5%",
        marginBottom: '5%',
    },
    imageContainer:{
        height: couponHeight,
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
    },
    frontContainer:{
        height: "100%",
        width: "100%",
        display: "flex",
        marginLeft: "7%",
        justifyContent: "center",
        alignContent: "center"
    },
    shadow: {
        shadowColor: '#000000',
        shadowOffset:{
            height: 5,
            width: 9,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 5,
    },
    layeredWords:{
        zIndex: 7,
        backgroundColor: "#F4F4F4",
        position: "absolute",
        height: "100%",
        overflow: "hidden",
    },
    CouponDescription:{
        height: couponHeight,
        borderLeftWidth: 2.2,
        borderLeftColor: '#FFFFFF',
        borderStyle: 'dotted',
        overflow: "hidden"
    },
})

export default ActualCoupon;





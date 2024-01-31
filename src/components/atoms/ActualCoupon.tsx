import { color } from "@rneui/base";
import { Dict } from "native-base/lib/typescript/theme/tools";
import React, { useEffect, useRef, useState } from "react";
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Animated} from "react-native";
import { SvgXml } from "react-native-svg";
import GiftSVG from "../../assets/images/GiftSVG";

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

const backgroundColor = [
    "#FF6C22", "#FFB22C", "#DB6144"
]

interface ActualCouponType{
    image: any,
    title: string,
    companyName: string,
    value: string,
    couponCategory: number,
    rollAnimated: boolean,
    rightBar: boolean,
    availablePercent: number,
    addFunc: any,
};

const radius = 10;
const couponHeight = 150;
const ActualCoupon = (props: ActualCouponType) =>{
    const viewRef = useRef<View>(null);
    const [viewHeight, setViewHeight] = useState<number>(0);
    const [viewWidthWelcome, setViewWidthWelcome] = useState(0);
    const [viewWidthCouponGo, setViewWidthCouponGo] = useState(0);

    const onViewLayoutWelcome = () => {
        viewRef.current?.measure((x: number, y: number, width: number, height: number) => {
            setViewWidthWelcome(width);
        });
    };

    const onViewLayoutCouponGo = () => {
        viewRef.current?.measure((x: number, y: number, width: number, height: number) => {
            setViewWidthCouponGo(width);
        });
    };
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
                backgroundColor: backgroundColor[Number(props.couponCategory)],
                height: couponHeight,
                borderRadius: radius,
            }, styles.shadow, props.rightBar? {}: {overflow: "hidden"}]}
            >
                <View style={[styles.imageContainer]}>
                    <Image style={styles.imageStyle} source={props.image} resizeMode="stretch"/>
                </View>
                <View style={[styles.CouponDescription, props.rightBar? {width: "50%"} : {width: "65%"}]}>
                    {/* <GiftIcon name="gift" size={30} style={{color: 'white'}}/> */}
                    {/* props.text */}
                    <View style={[styles.frontWords, {backgroundColor: backgroundColor[Number(props.couponCategory)]? backgroundColor[Number(props.couponCategory)] : "grey"}]}>
                        {props.rightBar? <></> :
                            <View style={{position: "absolute", width: "100%", height: "100%", display: "flex",
                                justifyContent: "flex-start", alignItems: "center"
                                }}>
                                <Text style={{position: "absolute", transform: [{ rotate: '270deg' }], alignSelf: "flex-end", fontSize: 13, color: "white",
                                    paddingRight: "17%", paddingTop: "7%"}}>
                                    歡迎使用
                                </Text>

                                <Text style={{position: "absolute", transform: [{ rotate: '270deg' }], alignSelf: "flex-end", color: "white", fontSize: 20, 
                                    paddingTop: "40%", paddingRight: "5%"}}>
                                    COUPON GO
                                </Text>
                            </View>
                        }
                        <View style={[styles.frontContainer]}>
                            <SvgXml width={20} height={20} xml={GiftSVG}/>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'white'}} 
                                numberOfLines={1}>
                                {props.title}
                            </Text>
                            <Text style={{
                                fontSize: 13,
                                fontWeight: 'bold',
                                color: 'white'}}
                                numberOfLines={1}>
                                {chineseConverter(props.value)}
                            </Text >
                            <Text style={{fontSize: 40, color: 'white'}} numberOfLines={1}><Text style={{fontSize: 35}}>$</Text>{props.value}</Text>
                        </View>
                    </View>
                    { props.rollAnimated? 
                        <TouchableOpacity style={[styles.basedAbs, {zIndex: 7}]} onPress={left? onClickToRight: onClickToLeft} activeOpacity={1}>
                            <Animated.View style={[styles.layeredWords, { width: animatedWidth }]}>
                                <Text numberOfLines={2}>
                                    五人同行才可以享有半價優惠。
                                    所有權力均由本店保留。
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
                            <View style={{position: "absolute", width: "50%", height: "90%", backgroundColor: backgroundColor[Number(props.couponCategory)], opacity: 0.3, 
                            borderRadius: 30, top: 0.1 * viewHeight
                            }}>
                            </View>
                            <View style={{position: "absolute", width: "50%", backgroundColor: backgroundColor[Number(props.couponCategory)], borderRadius: 30,
                            top: (props.availablePercent) * viewHeight, height: (1 - props.availablePercent) * viewHeight
                            }}>
                            </View>
                            <View style={{position: "absolute", width: 30, height: 30, backgroundColor: backgroundColor[Number(props.couponCategory)], 
                            borderRadius: 30, borderColor: "white", borderWidth: 3,
                            top: (props.availablePercent) * viewHeight - 18 }}>
                            </View>
                        </View>
                        <View style={{height: "30%", width: "100%"}}>
                            <TouchableOpacity onPress={() => props.addFunc()} style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
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
        marginLeft: "3%",
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
        height: "100%",
        width: "100%",
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius
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
        display: "flex",
        flexDirection: "column"
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
        borderStyle: 'dashed',
        overflow: "hidden",
    },
})

export default ActualCoupon;





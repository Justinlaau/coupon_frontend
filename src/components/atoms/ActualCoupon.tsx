import { color } from "@rneui/base";
import React from "react";
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity} from "react-native";
import GiftIcon from 'react-native-vector-icons/FontAwesome'


const numberToChinese = (number: number) => {
    const chineseNumbers = {
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
    if (!isNaN(str)){
        return numberToChinese(Number(str));
    }
    
};

const backgroundColor = {
    1000: "#ff5733",
    20: "#ff7e15",
    100: "#FFC300",
}

interface ActualCouponType{
    image: any,
    companyName: string,
    value: string,

};

const ActualCoupon = (props: ActualCouponType) =>{
    return (
        <View style={styles.container} >
            <View style={{
                width: deviceWidth - 20,
                flexDirection: "row",
                backgroundColor: "#ff5733",
                height: 200,
                borderRadius: radius,

                shadowColor: '#000',
                shadowOffset:{
                    width: 5,
                    height: 5
                },
                shadowRadius: 5,
                shadowOpacity: 0.75,
                elevation: 10,}}
            >

                <Image style={styles.imageStyle} source={props.image} />
                <View style={styles.CouponDescription}>
                    {/* <GiftIcon name="gift" size={30} style={{color: 'white'}}/> */}
                    {/* props.text */}
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
            </View>
        </View>


    )
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const radius = 20;
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '7%',
    },
    imageStyle:{
        height: 200,
        width: "45%",
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius,
    },

    CouponDescription:{
        height: 200,
        padding: 10,
        width: "50%",
        borderLeftWidth: 2.2,
        borderLeftColor: '#FFFFFF',
        borderStyle: 'dotted',
        marginLeft: "4%"
    },
})

export default ActualCoupon;





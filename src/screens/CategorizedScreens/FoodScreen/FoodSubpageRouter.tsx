import { ScrollView } from 'native-base';
import React, { useRef, useState } from 'react';
import { 
    View, 
    StyleSheet, 
    DimensionValue, 
    TouchableOpacity, 
    Text,
    Animated,
    LayoutChangeEvent
} from 'react-native';
import { SvgXml } from 'react-native-svg';

{/* import SVG */}
import BurgerSVG from '../../../assets/images/Food/BurgerSVG';
import CHFoodSVG from '../../../assets/images/Food/CHFoodSVG';
import DessertSVG from '../../../assets/images/Food/DessertSVG';
import FastFoodSVG from '../../../assets/images/Food/FastFoodSVG';
import FChickenSVG from '../../../assets/images/Food/FChickenSVG';
import JPFoodSVG from '../../../assets/images/Food/JPFoodSVG';
import KebabSVG from '../../../assets/images/Food/KebabSVG';
import KFoodSVG from '../../../assets/images/Food/KFoodSVG';
import PizzaSVG from '../../../assets/images/Food/PizzaSVG';
import SaladSVG from '../../../assets/images/Food/SaladSVG';
import ThaiFoodSVG from '../../../assets/images/Food/ThaiFoodSVG';
import WFoodSVG from '../../../assets/images/Food/WFoodSVG';

interface FoodSubpageRouterType {
    navigation: any,
    height: DimensionValue | undefined,
}

const FoodSubpageRouter = (props : FoodSubpageRouterType) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const handleScroll = (event: any) => {
        const { contentOffset } = event.nativeEvent;
        scrollX.setValue(contentOffset.x);
        // console.log("container", containerWidth);
        // console.log(scrollViewWidth);
    };

    const [containerWidth, setContainerWidth] = useState<number>(0);

    const handleContainerLayout = (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setContainerWidth(width);
    };

    const scrollViewRef = useRef<any>(null);
    const [scrollViewWidth, setScrollViewWidth] = useState<number>(0);
  
    const handleContentSizeChange = (contentWidth: number) => {
        scrollViewRef.current?.measure((width: number) => {
          setScrollViewWidth(Math.max(width, contentWidth));
        });
    };
    
    const handleLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setScrollViewWidth(width);
    };

    const [scrollBarContainerWidth, setScrollBarContainerWidth] = useState<number>(0);
    const handleScrollBarContainerLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setScrollBarContainerWidth(width);
      };
  
    return (
        <View onLayout={handleContainerLayout} style={[{height: props.height}, styles.baseContainer]}>
            <ScrollView 
                horizontal 
                contentContainerStyle={[styles.container]}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                onLayout={handleLayout}
                onContentSizeChange={handleContentSizeChange}
                ref={scrollViewRef}
            >
                <View style={styles.row}>
                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={FastFoodSVG}/>
                        <Text style={styles.text}> 快餐 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={BurgerSVG}/>
                        <Text style={styles.text}> 漢堡包 </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={PizzaSVG}/>
                        <Text style={styles.text}> 薄餅 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={CHFoodSVG}/>
                        <Text style={styles.text}> 中餐 </Text>
                    </TouchableOpacity>                    
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={WFoodSVG}/>
                        <Text style={styles.text}> 西餐 </Text>
                    </TouchableOpacity>                    

                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={JPFoodSVG}/>
                        <Text style={styles.text}> 日本菜 </Text>
                    </TouchableOpacity>                    
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={KFoodSVG}/>
                        <Text style={styles.text}> 韓國菜 </Text>
                    </TouchableOpacity>   

                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={ThaiFoodSVG}/>
                        <Text style={styles.text}> 泰國菜 </Text>
                    </TouchableOpacity>      
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={KebabSVG}/>
                        <Text style={styles.text}> 土耳其烤肉 </Text>
                    </TouchableOpacity>   

                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={FChickenSVG}/>
                        <Text style={styles.text}> 炸雞 </Text>
                    </TouchableOpacity>   
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={SaladSVG}/>
                        <Text style={styles.text}> 沙律 </Text>
                    </TouchableOpacity>   

                    <TouchableOpacity style={styles.item}>
                        <SvgXml xml={DessertSVG}/>
                        <Text style={styles.text}> 甜品 </Text>
                    </TouchableOpacity>   
                </View>

            </ScrollView>

            <View style={{height: "5%", marginBottom: "2%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <View onLayout={handleScrollBarContainerLayout} style={styles.scrollBarContainer}>
                    <Animated.View
                    style={[
                        styles.scrollbar,
                        {
                            transform: [
                                {
                                    translateX: scrollX.interpolate({
                                        inputRange: [0, scrollViewWidth - containerWidth],
                                        outputRange: [0, scrollBarContainerWidth * 0.5],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                    />

                </View>
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    baseContainer:{
        marginTop: "5%",
        backgroundColor: "white",
        borderRadius: 10,
    },
    container: {
        marginTop: "3%",
        height: "92%",
        flexGrow: 1
    },
    row: {
        flexDirection: 'column',
        height: "100%",
        width: 100
    },
    item: {
        width: 100,
        margin: 5,
        flex: 1,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },
    scrollbar: {
        width: "50%",
        backgroundColor: 'red',
        height: "100%",
        borderRadius: 20
    },
    scrollBarContainer:{
        backgroundColor: "grey",
        height: "100%",
        width: "10%",
        borderRadius: 20
    },
    text: {
        color: "black"
    }
});

export default FoodSubpageRouter;
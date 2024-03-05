import { ScrollView } from 'native-base';
import React, { useRef, useState } from 'react';
import { 
    View, 
    StyleSheet, 
    DimensionValue, 
    TouchableOpacity, 
    Text,
    Animated,
    LayoutChangeEvent, 
    Image
} from 'react-native';

// import { SvgXml } from 'react-native-svg';

{/* import SVG */}
// import BurgerSVG from '../../assets/images/Food/BurgerSVG';
// import CHFoodSVG from '../../assets/images/Food/CHFoodSVG';
// import DessertSVG from '../../assets/images/Food/DessertSVG';
// import FastFoodSVG from '../../assets/images/Food/FastFoodSVG';
// import FChickenSVG from '../../assets/images/Food/FChickenSVG';
// import JPFoodSVG from '../../assets/images/Food/JPFoodSVG';
// import KebabSVG from '../../assets/images/Food/KebabSVG';
// import KFoodSVG from '../../assets/images/Food/KFoodSVG';
// import PizzaSVG from '../../assets/images/Food/PizzaSVG';
// import SaladSVG from '../../assets/images/Food/SaladSVG';
// import ThaiFoodSVG from '../../assets/images/Food/ThaiFoodSVG';
// import WFoodSVG from '../../assets/images/Food/WFoodSVG';

interface SubpageRouterType {
    navigation: any,
    height: DimensionValue | undefined,
    subcategories: string[],
    subcategoriesPNG: any
}

const SubpageRouter = (props : SubpageRouterType) => {
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
  
    var subrouterlisting = [];

    for (let i = 0; i < props.subcategories.length; i += 2) {
        if (i === props.subcategories.length - 1) {
            subrouterlisting.push(
                <View style={styles.row}>
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={props.subcategoriesPNG[i]}/>
                            <View style={styles.shadow}/>
                        </View>
                        <Text style={styles.text}> {props.subcategories[i]} </Text>
                    </TouchableOpacity>

                    <View style={styles.item}>

                    </View>
                </View>
            )
        }else{
            subrouterlisting.push(
                <View style={styles.row}>
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={props.subcategoriesPNG[i]}/>
                            <View style={styles.shadow}/>
                        </View>
                        <Text style={styles.text}> {props.subcategories[i]} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={props.subcategoriesPNG[i + 1]}/>
                            <View style={styles.shadow}/>
                        </View>                        
                        <Text style={styles.text}> {props.subcategories[i + 1]} </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }       
    
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
                {subrouterlisting}
            </ScrollView>

            {
                props.subcategories.length > 8 ? 
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
                </View> :
                <></>
            }
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
        backgroundColor: "#d3d3d3",
        height: "100%",
        width: "10%",
        borderRadius: 20
    },
    text: {
        color: "black"
    },
    imageContainer: {
        width: 45,
        height: 45,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "white",
    },
    shadow:{
        // position: 'absolute',
        // zIndex: 5,
        // bottom: 0,
        // left: 0,
        // right: 0,
        // height: 8,
        // shadowColor: 'black',
        // shadowOpacity: 0.7,
        // shadowOffset: { width: 0, height: 4 },
        // shadowRadius: 2,
        // elevation: 2,
        // borderRadius: 10
    },
    image: {
        height: 45,
        width: 45,
        resizeMode: "contain",
        borderRadius: 10,
        position: "absolute",
        zIndex: 20
    }
});

export default SubpageRouter;
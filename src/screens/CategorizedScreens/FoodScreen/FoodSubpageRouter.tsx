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
                    <View style={styles.item}>
                        <Text>
                            廣東菜
                        </Text>
                    </View>
                    <View style={styles.item}>           
                        <Text>
                            日本菜
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item} />
                    <View style={styles.item} />
                </View>
                <View style={styles.row}>
                    <View style={styles.item} />
                    <View style={styles.item} />
                </View>
                <View style={styles.row}>
                    <View style={styles.item} />
                    <View style={styles.item} />
                </View>
                <View style={styles.row}>
                    <View style={styles.item} />
                    <View style={styles.item} />
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
    },
    item: {
        width: 100,
        margin: 5,
        flex: 1,
        backgroundColor: 'gray',
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
});

export default FoodSubpageRouter;
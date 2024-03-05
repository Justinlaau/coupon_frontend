import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, Text, Alert, ScrollView, Dimensions, FlatList, PanResponder, Image } from 'react-native';
import Animated, { interpolate, useSharedValue, useAnimatedStyle, withDecay, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';


type CarouselProps = {
  style: string,
  data: any,
}

const Carousel = () => {

  const screenWidth = Dimensions.get("window").width;
  const scrollX = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const images = ["https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_965/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ugpha4iy2ki8kfxbcrlj/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp", "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_861/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/jbjkotwmdstrekbdifki/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp","https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_965/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ugpha4iy2ki8kfxbcrlj/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp", "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_861/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/jbjkotwmdstrekbdifki/KlookExclusive:WMHotelHongKong,VignetteCollectionStaycationPackage.webp"];
  
  const pan = Gesture.Pan()
    .onChange((event) => {
      console.log(event.changeX);
      console.log(currentIndex.value);
      if ((currentIndex.value === 0 && event.changeX > 0) || (Math.abs(currentIndex.value) == images.length-1 && event.changeX <= 0)) return;
      scrollX.value += event.changeX;
      offsetX.value += event.changeX;
    })
    .onFinalize((event) => {
      let newIndex = 0
      if ( offsetX.value < 0) {
        if (Math.abs(offsetX.value) >= screenWidth * 0.5) {
          newIndex += 1;
        }
      } else {
        if (offsetX.value >= screenWidth * 0.5) {
          newIndex -= 1;
        }
      }

      currentIndex.value -= newIndex;
      scrollX.value = withTiming(screenWidth * currentIndex.value);
      offsetX.value = 0;
    })
  
  const animatedStyles = useAnimatedStyle(() => ({
    left: scrollX.value,
  }));

  const dotStyles = (index: number) => {
    return useAnimatedStyle(() => {
      
      const width = index == Math.abs(currentIndex.value) ? 10 : 7;
      const height = index == Math.abs(currentIndex.value) ? 10 : 7;
      // const backgroundColor = index == currentIndex.value ? "#F9FAFB" : "#E5E7EB";
      const backgroundColor = index == currentIndex.value ? "white" : "#E5E7EB";
      return {
        width,
        height,
        backgroundColor,
      }
    })
  }

  return (
      <View style={{ height: "33%", display: "flex", flexDirection: "row" }}>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              { position: "relative"},
            ]}
          >
            <Animated.View style={[animatedStyles, { display: "flex", flexDirection: "row", height: "100%"}] }>
              {
                images.map((image, index) => {
                  return (
                    <Image 
                      source={{ uri: image }}
                      style={{ width: screenWidth, height: "100%" }}
                    />
                  )
                })
              }
            </Animated.View>
            <View style={{ position: "absolute", top: '80%', left: (screenWidth /2 - images.length * 10 ), display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 10, width: images.length * 20 }}>
              {
                images.map((image, index) => {
                  return (
                    <Animated.View 
                      style={[
                        { margin: 5, borderRadius: 5, elevation: 5},
                        dotStyles(index)
                      ]} 
                    />
                  )
                })
              }
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
  )
}

export default Carousel;
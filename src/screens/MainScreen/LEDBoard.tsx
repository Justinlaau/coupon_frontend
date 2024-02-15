import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface LEDBoardType{
    texts: string[],
    LEDFontSize: number,
    navigation: any,
    isFocused: boolean
};

const LEDBoard = (props: LEDBoardType ) => {
    const viewRef = useRef<View>(null);
    const handleLayout = () => {
      viewRef.current?.measure((x: number, y: number, width: number, height: number) => {
        setTextBottom(height);
        });
    };
  
    const [textBottom, setTextBottom] = useState(0);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const translateY = useRef(new Animated.Value(textBottom)).current;

    useEffect(() => {
    const animationDuration = 1500; 
    const stayDuration = 1500;
    const fadeDuration = 700;

    Animated.sequence([
        Animated.timing(translateY, {
        toValue: -5,
        duration: animationDuration,
        useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -5,
          duration: stayDuration,
          useNativeDriver: true,
          }),
        Animated.timing(translateY, {
          toValue: -textBottom,
          duration: fadeDuration,
          useNativeDriver: true,
          }),
        Animated.timing(translateY, {
        toValue: textBottom,
        duration: 0,
        useNativeDriver: true,
        }),
    ]).start(() => {
        const nextIndex = (currentTextIndex + 1) % props.texts.length;
        setCurrentTextIndex(nextIndex);
    });
    }, [props.texts, currentTextIndex, translateY, textBottom]);

    return (
    // <TouchableOpacity style={{height: "100%", width: "100%"}} 
    //   onPress={() => props.navigation.navigate("Notification")}
    //   activeOpacity={1}  
    // >
      <View ref={viewRef} onLayout={handleLayout} style={styles.container}>
          <View style={styles.background}>
              {/* {Array.from(Array(650), (_, i) => <View key={i} style={styles.dot} />)} */}
          </View>
          <Animated.View style={[styles.textContainer, { transform: [{ translateY }] }]}>
              {props.isFocused? <></> : <Text style={styles.text}>{props.texts[currentTextIndex]}</Text>}
          </Animated.View>
      </View>
    // </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: "100%",
    height: "100%",
    backgroundColor: "#EEEEEE",
    position: "absolute",
    zIndex: -100,
    justifyContent: "center",
    alignItems: "center"
  },
  background: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#EEEEEE',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: "100%",
    position: "absolute"
  },
  text: {
    color: '#555',
    fontSize: 20,
    textAlignVertical: "bottom",
    height: "100%"
  },
});

export default LEDBoard;
import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface LEDBoardType{
    texts: string[],
    LEDFontSize: number,
    navigation: any,
};

const LEDBoard = (props: LEDBoardType ) => {
    const viewRef = useRef<View>(null);
    const handleLayout = () => {
      viewRef.current?.measure((x: number, y: number, width: number, height: number) => {
        setTextRight(width);
        });
    };
  
    const [textRight, setTextRight] = useState(0);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const translateX = useRef(new Animated.Value(textRight)).current;

    useEffect(() => {
    const currentText = props.texts[currentTextIndex];
    const textWidth = currentText.length * props.LEDFontSize; 
    const animationDuration = textWidth * props.LEDFontSize; 

    Animated.sequence([
        Animated.timing(translateX, {
        toValue: -textWidth,
        duration: animationDuration,
        useNativeDriver: true,
        }),
        Animated.timing(translateX, {
        toValue: textRight,
        duration: 0,
        useNativeDriver: true,
        }),
    ]).start(() => {
        const nextIndex = (currentTextIndex + 1) % props.texts.length;
        setCurrentTextIndex(nextIndex);
    });
    }, [props.texts, currentTextIndex, translateX, textRight]);

    return (
    <TouchableOpacity style={{height: "100%", width: "100%"}} 
      onPress={() => props.navigation.navigate("Notification")}
      activeOpacity={1}  
    >
      <View ref={viewRef} onLayout={handleLayout} style={styles.container}>
          <View style={styles.background}>
              {/* {Array.from(Array(650), (_, i) => <View key={i} style={styles.dot} />)} */}
          </View>
          <Animated.View style={[styles.textContainer, { transform: [{ translateX }] }]}>
              <Text style={styles.text}>{props.texts[currentTextIndex]}</Text>
          </Animated.View>
      </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
    height: "100%",
    backgroundColor: "#EEEEEE"
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
    color: '#dd0000',
    fontSize: 20,
    textAlignVertical: "top",
    height: "100%"
  },
});

export default LEDBoard;
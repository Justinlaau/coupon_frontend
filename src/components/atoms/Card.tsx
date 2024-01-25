import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

const Card = ({
  maxVisibleItems,
  item,
  index,
  dataLength,
  animatedValue,
  currentIndex,
  prevIndex,
}) => {
  const IMAGE_WIDTH = 100;
  const IMAGE_HEIGHT = 100;
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [40, 1, 100],
    );
    const translateX2 = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [100, 1, -100],
    );
    const scale = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [1, 1, 1],
    );
    const opacity = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [1, 1, 0],
    );


    return {
      transform: [
        {
          translateX: index === prevIndex.value ? translateX2 : translateX,
        },
        {scale},
      ],
      opacity:
        index < currentIndex.value + maxVisibleItems - 1
          ? opacity
          : index === currentIndex.value + maxVisibleItems - 1
          ? withTiming(1)
          : withTiming(0),
    };
    
  });
  
  
  return (
    <FlingGestureHandler
      key="right"
      direction={Directions.RIGHT}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          if (currentIndex.value !== 0) {
            animatedValue.value = withTiming((((currentIndex.value = ((currentIndex.value -1) % 8)))));
            prevIndex.value = currentIndex.value - 1;
          }else{
            animatedValue.value = withTiming(currentIndex.value+=7);
          }
        }
      }}>
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            // if (currentIndex.value !== dataLength - 1) {
              animatedValue.value = withTiming((((currentIndex.value = ((currentIndex.value + 1) % 8)))));
              prevIndex.value = currentIndex.value;
            // }
          }
        }}>
        <Animated.Image
          source={item.image}
          style={[
            styles.image,
            {
              zIndex: dataLength - index,
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
            },
            animatedStyle,
          ]}
        />
        
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default Card;

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    borderRadius: 20,
  },
});
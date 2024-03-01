import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

interface LoginAnimationProps{
  navigation: any
}

const LoginAnimation = (props: LoginAnimationProps) => {
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    props.navigation.navigate('Main'); 
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require("../../assets/videos/loginAnimation.mp4")}
        style={styles.videoPlayer}
        resizeMode="cover"
        onEnd={handleVideoEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoPlayer: {
    flex: 1,
  },
});

export default LoginAnimation;
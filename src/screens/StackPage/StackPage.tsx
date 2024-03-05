import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CardContainer from '../../components/atoms/CardContainer';

const StackPage = () => {
  const data = [
    {
      image: require('../../assets/images/icon.png'),
    },
    {
        image: require('../../assets/images/icon.png'),
    },
    {
        image: require('../../assets/images/icon.png'),
    },
    {
        image: require('../../assets/images/icon.png'),
    },
    {
        image: require('../../assets/images/icon.png'),
    },
    {
        image: require('../../assets/images/icon.png'),
    },
    {
        image: require('../../assets/images/icon.png'),
    },
    {
        image: require('../../assets/images/icon.png'),
    },
  ];

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <CardContainer data={data} maxVisibleItems={8} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default StackPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

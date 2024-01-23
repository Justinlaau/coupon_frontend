import React from 'react';
import { View, StyleSheet, DimensionValue, TouchableOpacity, Text } from 'react-native';

interface PageRouterType {
    navigation: any,
    height: DimensionValue | undefined,
}

const PageRouter = (props : PageRouterType) => {
  return (
    <View style={[styles.container, {height: props.height}]}>
      <View style={styles.row}>
        <TouchableOpacity style={{width: '24%', height: "100%", backgroundColor: "grey"}} onPress={() => props.navigation.navigate("FoodMain")}>
          <Text>
            美食精選
          </Text>
        </TouchableOpacity>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
      <View style={styles.row}>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "1%",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: "1%",
    height: "50%"
  },
  box: {
    width: '24%',
    backgroundColor: 'gray',
  },
});

export default PageRouter;
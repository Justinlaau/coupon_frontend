import React from 'react';
import {StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import PopularSVG from '../../assets/images/PopularSVG';
import MerchantSVG from '../../assets/images/MerchantSVG';
import PositionSVG from '../../assets/images/PositionSVG';
import CategorySVG from '../../assets/images/CategorySVG';

import {
  View,
} from 'react-native';
import {
  NativeBaseProvider,
  VStack,
  Center,
  Stack,
  Box,
  ScrollView,
  Input,
  Icon,
  ZStack,
  Heading,
  Text,
} from 'native-base';

const MainPageMenu = (props) => {
  return (
    <NativeBaseProvider>
      <Stack direction="row" h="100%" w="100%">
        <VStack width="25%" height="100%" alignItems="center">
          <Box h="80%" mb="0.5">
            <SvgXml height="100%" xml={(CategorySVG)} />
          </Box>
          <Text fontSize="10">分類</Text>
        </VStack>
        <VStack width="25%" height="100%" alignItems="center">
          <Box h="80%" mb="0.5">
            <SvgXml height="100%" xml={(PositionSVG)} />
          </Box>
          <Text fontSize="10">定位</Text>
        </VStack>
        <VStack width="25%" height="100%" alignItems="center">
          <Box h="80%" mb="0.5">
            <SvgXml height="100%" xml={(PopularSVG)} />
          </Box>
          <Text fontSize="10">最多人氣</Text>
        </VStack>
        <VStack width="25%" height="100%" alignItems="center">
          <Box h="80%" mb="0.5">
            <SvgXml height="100%" xml={(MerchantSVG)} />
          </Box>
          <Text fontSize="10">常用商戶</Text>
        </VStack>
      </Stack>
    </NativeBaseProvider>
  );
};

const MainPageMenuStyle = StyleSheet.create({
  
});

export default MainPageMenu;

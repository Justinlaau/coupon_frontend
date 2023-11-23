import React from 'react';
import {StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import AddSVG from '../../assets/images/AddSVG';
import AddYellowSVG from '../../assets/images/AddYellowSVG';

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
  AspectRatio,
  Image,
  Button,
} from 'native-base';

const CouponCard = (props) => {
  return (
    <NativeBaseProvider>
      <Box w="90%" h="220" mb={props.marb} borderRadius={15} bg="white" mx="4%" style={{shadowOffset:  {width: 1, height: 1}, shadowColor: "#000", shadowOpacity: 0.8, shadowRadius: 2, elevation: 2}}>
        <Box>
          <AspectRatio w="100%" bg="white" ratio={16/14} borderRadius={15}>
            <Image source={{
              uri: props.imgSource,
            }} alt={props.imgAlt} borderRadius={15} w="100%" h="100%" />
          </AspectRatio>
        </Box>
        <Stack direction="column" px="4%" py="4%" bg="white" borderBottomRadius={15} h="32.5%">
          <Text fontSize="9" color="#A9A8A8">{props.merchantName}</Text>
          <Stack direction="row" alignItems="center" alignContent="center">
            <Text w="80%" fontWeight="bold" fontSize="md">{props.couponDetail}</Text>
            <Box>
              <Button onPress={() => props.addFunc()} variant="ghost" w="8" h="8">
                <SvgXml width="24" xml={AddSVG} />
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </NativeBaseProvider>
  );
};

const CouponCardStyle = StyleSheet.create({
  
});

export default CouponCard;

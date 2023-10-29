import React from 'react';
import {StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import PopularSVG from '../../assets/images/PopularSVG';
import MerchantSVG from '../../assets/images/MerchantSVG';
import PositionSVG from '../../assets/images/PositionSVG';
import CategorySVG from '../../assets/images/CategorySVG';

import {
  View,
  ScrollView,
} from 'react-native';
import {
  NativeBaseProvider,
  VStack,
  Center,
  Stack,
  Box,
  Input,
  Icon,
  ZStack,
  Heading,
  Text,
  Pressable
} from 'native-base';

const AddressSubMenu = (props) => {
  return (
    <Box w="100%" py="3%" display="flex" flexWrap="wrap" flexDirection="row">
        {props.subMenu?.map((value) => (
          <Pressable borderColor="indigo.800" p="1" px="4" m="2" borderRadius={20} borderWidth={1.5} >
            <Text fontWeight="black" fontSize="10" color="indigo.800">{value.addressCategoryName}</Text>
          </Pressable>
          // <Box key={value.addressCategoryId}>
          //   {value.addressCategoryName}
          // </Box>
        ))}
    </Box>
  );
}

const TypeSubMenu = (subType) => {
  return (<></>);
}

const ListingMainPageDropDownMenu = (props) => {

  return (
    <NativeBaseProvider>
      {
        props.selectedMenu === 1 ? (
          <Box minH="80" maxH="160" pb="3%" w="100%" bg="white" position="absolute" shadow={2} top={props.topD} borderBottomRadius="50" zIndex={10000}>
            <ScrollView nestedScrollEnabled>
              <Pressable w="100%" h="60" onPress={() => props.showSubMenu(0, 0)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>不限</Text></Box>
              </Pressable>
              <Pressable w="100%" h="60" onPress={() => {props.showSubMenu(0, 1); console.log("asds")}} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>香港</Text></Box>
              </Pressable>
              { props.selectedSubMenu == 1 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={props.addressCategory["HongKong"]}/>
                </Box>
              ) : null}
              <Pressable w="100%" h="60" onPress={() => props.showSubMenu(0, 2)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>九龍</Text></Box>
              </Pressable>
              { props.selectedSubMenu == 2 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={props.addressCategory["Kowloon"]}/>
                </Box>
              ) : null}
              <Pressable w="100%" h="60" onPress={() => props.showSubMenu(0, 3)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>新界</Text></Box>
              </Pressable>
              { props.selectedSubMenu == 3 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={props.addressCategory["NewTerritories"]}/>
                </Box>
              ) : null}
            </ScrollView>
          </Box>
        ) : 
        (
          <Box></Box>
        )
      }
    </NativeBaseProvider>
  );
};

const ListingMainPageDropDownMenuStyle = StyleSheet.create({
  
});

export default ListingMainPageDropDownMenu;

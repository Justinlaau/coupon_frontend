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
  Pressable,
  Checkbox,
} from 'native-base';

const AddressSubMenu = (props) => {
  return (
    <Box w="100%" py="3%" display="flex" flexWrap="wrap" flexDirection="row">
        {props.subMenu?.map((value) => (
          <Pressable borderColor="indigo.800" p="1" px="4" m="2" borderRadius={20} borderWidth={1.5} onPress={() => {console.log("selected address_type: " + value.address_type); props.setSelectedAddressCategory(value.address_type)}}>
            <Text fontWeight="black" fontSize="10" color="indigo.800">{value.addressCategoryName}</Text>
          </Pressable>
        ))}
    </Box>
  );
}

const TypeCategorySubMenu = (props) => {
  const updateState = (value) => {
    console.log("value: " + value)
    if (props.selectedTypeCategory.value == true) {
      props.setSelectedTypeCategory({
        ...props.selectedTypeCategory,
        value: false
      })
    } else {
      props.setSelectedTypeCategory({
        ...props.selectedTypeCategory,
        value: true
      })
    }
    console.log("updated selected Category")
    console.log(props.selectedTypeCategory)
  }

  return (
    <Box w="100%" py="3%">
      {props.typeCategory?.map((value) => (
        <Box p="1" m="2" borderBottomWidth={0.2} borderBottomColor="grey" marginTop="auto" marginBottom="auto" py="5%" display="flex" flexDirection="row">
          <Text fontWeight="black" fontSize="12" w="92%">{value.typeCategoryName}</Text>
          <Pressable onPress={() => {console.log("sdfdf"); updateState(value.typeCategoryName)}} bg="black" w="10">
            <Checkbox value="d"/>
          </Pressable>
        </Box>
      ))}
    </Box>
  )
}

const ListingMainPageDropDownMenu = (props) => {

  return (
    <NativeBaseProvider>
      {
        props.selectedMenu === 1 ? (
          <Box minH="90" maxH="60%" pb="3%" w="100%" bg="white" position="absolute" shadow={2} top={0} borderBottomRadius="50" zIndex="1000">
            <ScrollView>
              <Pressable w="100%" h="60" onPress={() => props.showSubMenu(0, 0)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>不限</Text></Box>
              </Pressable>
              <Pressable w="100%" h="60" onPress={() => {props.showSubMenu(0, 1); console.log("asds")}} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>香港</Text></Box>
              </Pressable>
              { props.selectedSubMenu == 1 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={props.addressCategory["HongKong"]} setSelectedAddressCategory={props.setSelectedAddressCategory}/>
                </Box>
              ) : null}
              <Pressable w="100%" h="60" onPress={() => props.showSubMenu(0, 2)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>九龍</Text></Box>
              </Pressable>
              { props.selectedSubMenu == 2 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={props.addressCategory["Kowloon"]} setSelectedAddressCategory={props.setSelectedAddressCategory}/>
                </Box>
              ) : null}
              <Pressable w="100%" h="60" onPress={() => props.showSubMenu(0, 3)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>新界</Text></Box>
              </Pressable>
              { props.selectedSubMenu == 3 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={props.addressCategory["NewTerritories"]} setSelectedAddressCategory={props.setSelectedAddressCategory}/>
                </Box>
              ) : null}
            </ScrollView>
          </Box>
        ) : 
        (
          <Box minH="30%" maxH="46%" pb="3%" w="100%" bg="white" position="absolute" shadow={2} top={0} borderBottomRadius="50" zIndex="1000">
            <ScrollView>
              <Box w="85%" display="flex" alignSelf="center" minH="20">
                <TypeCategorySubMenu typeCategory={props.typeCategory} setSelectedTypeCategory={props.setSelectedTypeCategory} selectedTypeCategory={props.selectedTypeCategory} />
              </Box>
            </ScrollView>
          </Box>
        )
      }
    </NativeBaseProvider>
  );
};

const ListingMainPageDropDownMenuStyle = StyleSheet.create({
  
});

export default ListingMainPageDropDownMenu;

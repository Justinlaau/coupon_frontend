import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import PopularSVG from '../../assets/images/PopularSVG';
import MerchantSVG from '../../assets/images/MerchantSVG';
import PositionSVG from '../../assets/images/PositionSVG';
import CategorySVG from '../../assets/images/CategorySVG';
import CheckBoxSVG from '../../assets/images/CheckBoxSVG';
import CheckBoxEmptySVG from '../../assets/images/CheckBoxEmptySVG';
import { ButtonBox } from '../atoms/ButtonBox';


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
          <Pressable borderColor="indigo.800" p="1" px="4" m="2" borderRadius={20} borderWidth={1.5} onPress={
            () => {
              console.log("selected address_type: " + value.addressType); 
              props.setSelectedAddressCategory(value.addressType);
              props.showDropDownMenu(0)
            }
          }>
            <Text fontWeight="black" fontSize="10" color="indigo.800">{value.addressCategoryName}</Text>
          </Pressable>
        ))}
    </Box>
  );
}

const TypeCategorySubMenu = (props) => {
  // here should be a

  const updateState = (value: string) => {
    console.log("value: " + value)
    console.log("previous value is true: " + props.selectedTypeCategory[value]);
    let prevSelectedTypeCategory: {[key: string]: boolean} = props.selectedTypeCategory;
    if (props.selectedTypeCategory[value] == true) {
      prevSelectedTypeCategory[value] = false;
      props.setSelectedTypeCategory(prevSelectedTypeCategory)
    } else {
      prevSelectedTypeCategory[value] = true;
      props.setSelectedTypeCategory(prevSelectedTypeCategory)
    }
    console.log("updated selected Category")
    console.log(props.selectedTypeCategory)
  }

  return (
    <Box w="100%" py="3%">
      {props.typeCategory?.map((value) => (
        <Box key={value.typeCategoryName} p="1" m="2" borderBottomWidth={0.2} borderBottomColor="grey" marginTop="auto" marginBottom="auto" py="5%" display="flex" flexDirection="row">
          <Text fontSize="12" w="92%">{value.typeCategoryName}</Text>
            {/* <Checkbox onChange={() => {updateState(value.typeCategoryName)}}><Box/></Checkbox> */}
            { props.selectedTypeCategory[value.typeCategoryName] == true ? (
                <Pressable onPress={() => updateState(value.typeCategoryName)}><SvgXml height="25" width="25" xml={CheckBoxSVG} /></Pressable>
              ) : (
                <Pressable onPress={() => updateState(value.typeCategoryName)}><SvgXml height="25" width="25" xml={CheckBoxEmptySVG} /></Pressable>
              )
            }
        </Box>
      ))}
    </Box>
  )
}

const initialObjectState: {[key: string]: boolean} = {}

const ListingMainPageDropDownMenu = (props) => {
  const [localSelectedStates, setLocalSelectedStates] = useState(initialObjectState)
  
  const onCancel = () => {
    console.log("cancel selection");
    props.setSelectedTypeCategory({...localSelectedStates});
    props.showDropDownMenu(0);
  }

  const onConfirm = async () => {
    setLocalSelectedStates({...props.selectedTypeCategory});
    props.showDropDownMenu(0);
    if (props.selectedTypeCategory['ALL'] == true) {
      props.fetchCouponGroups();
    } else {
      props.filterCouponGroups();
    }
  }

  const updateState = (value: string) => {
    console.log("value: " + value)
    console.log("previous value is true: " + props.selectedTypeCategory[value]);
    let prevSelectedTypeCategory: {[key: string]: boolean} = props.selectedTypeCategory;
    if (props.selectedTypeCategory[value] == true) {
      prevSelectedTypeCategory[value] = false;
      props.setSelectedTypeCategory({...prevSelectedTypeCategory})
    } else {
      if (value == 'ALL') {
        for (let key in prevSelectedTypeCategory) {
          prevSelectedTypeCategory[key] = false;
        }
      } else {
        prevSelectedTypeCategory['ALL'] = false;
      }
      prevSelectedTypeCategory[value] = true;
      props.setSelectedTypeCategory({...prevSelectedTypeCategory})
    }
  }


  useEffect(() => {
    let originalState: {[key: string]: boolean} = {};
    props.typeCategory?.map((value) => {
      originalState[value.typeCategoryName] = props.selectedTypeCategory[value.typeCategoryName];
    })
    setLocalSelectedStates({...originalState});
  }, [])

  return (
    <NativeBaseProvider>
      {
        props.selectedMenu === 1 ? (
          <Box minH="90" maxH="470" pb="3%" w="100%" bg="white" position="absolute" shadow={2} top={0} borderBottomRadius="50" zIndex="1000">
            <ScrollView>
              <Pressable w="100%" h="60" onPress={() => props.showSubMenu(0, 0)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>不限</Text></Box>
              </Pressable>
              <Pressable w="100%" h="60" onPress={() => {props.showSubMenu(0, 1); console.log("asds")}} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>香港</Text></Box>
              </Pressable>
              { props.selectedSubMenu == 1 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={props.addressCategory["HongKong"]} setSelectedAddressCategory={props.setSelectedAddressCategory} showDropDownMenu={props.showDropDownMenu}/>
                </Box>
              ) : null}
              <Pressable w="100%" h="60" onPress={() => props.showSubMenu(0, 2)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>九龍</Text></Box>
              </Pressable>
              { props.selectedSubMenu == 2 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={props.addressCategory["Kowloon"]} setSelectedAddressCategory={props.setSelectedAddressCategory} showDropDownMenu={props.showDropDownMenu}/>
                </Box>
              ) : null}
              <Pressable w="100%" h="60" onPress={() => props.showSubMenu(0, 3)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>新界</Text></Box>
              </Pressable>
              { props.selectedSubMenu == 3 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={props.addressCategory["NewTerritories"]} setSelectedAddressCategory={props.setSelectedAddressCategory} showDropDownMenu={props.showDropDownMenu}/>
                </Box>
              ) : null}
            </ScrollView>
          </Box>
        ) : 
        (
          <Box minh="30%" maxH="470" w="100%" bg="white" position="absolute" shadow={2} top={0} borderBottomRadius="50" zIndex="1000">
            <ScrollView>
              <Box w="85%" display="flex" alignSelf="center" minH="20">
                {/* <TypeCategorySubMenu typeCategory={props.typeCategory} setSelectedTypeCategory={props.setSelectedTypeCategory} selectedTypeCategory={props.selectedTypeCategory} /> */}
                <Box w="100%" py="3%">
                  {props.typeCategory?.map((value) => (
                    <Box key={value.typeCategoryName} p="1" m="2" borderBottomWidth={0.2} borderBottomColor="grey" marginTop="auto" marginBottom="auto" py="5%" display="flex" flexDirection="row">
                      <Text fontSize="12" w="92%">{value.typeCategoryName}</Text>
                        {/* <Checkbox onChange={() => {updateState(value.typeCategoryName)}}><Box/></Checkbox> */}
                        { props.selectedTypeCategory[value.typeCategoryName] == true ? (
                            <Pressable onPress={() => updateState(value.typeCategoryName)}><SvgXml height="25" width="25" xml={CheckBoxSVG} /></Pressable>
                          ) : (
                            <Pressable onPress={() => updateState(value.typeCategoryName)}><SvgXml height="25" width="25" xml={CheckBoxEmptySVG} /></Pressable>
                          )
                        }
                    </Box>
                  ))}
                </Box>
              </Box>
            </ScrollView>
            <Box w="100%" h="90" pt="3%" borderBottomRadius="50">
                <Box w="100%" h="100%" display="flex" flexDirection="row" justifyContent="space-evenly">
                  <Box h="65%" w="30%" borderColor="red.500" borderWidth="2" borderRadius="50" alignItems="center" justifyContent="center"><Text onPress={() => onCancel()} color="red.500" fontWeight="bold">取消</Text></Box>
                  <Box h="65%" w="30%" bg="red.500" borderRadius="50" alignItems="center" justifyContent="center"><Text onPress={() => onConfirm()} fontWeight="bold" color="white">確定</Text></Box>
                </Box>
            </Box>
          </Box>
        )
      }
    </NativeBaseProvider>
  );
};

const ListingMainPageDropDownMenuStyle = StyleSheet.create({
  
});

export default ListingMainPageDropDownMenu;

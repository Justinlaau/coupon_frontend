import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Layout from '../../components/templates/Layout';
import {SvgXml} from 'react-native-svg';
import AddYellowSVG from '../../assets/images/AddYellowSVG';
import Background from '../../components/templates/Background';
import LeftArrow from '../../assets/images/LeftArrow';
import { MagnifierSVG } from '../../assets/images/MagnifierSVG';
import AddressSVG from '../../assets/images/AddressSVG'
import TypeCategorySVG from '../../assets/images/TypeCategorySVG';
import CouponCard from '../../components/atoms/CouponCard';
import ListingPageDropDownMenu from '../../components/templates/ListingPageDropDownMenu';
import axios from 'axios';

import {
  View,
  TextInput,
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
  AspectRatio,
  Image,
  Button,
  HStack,
  Pressable
} from 'native-base';

const CouponListingScreen = ({navigation}) => {
  const [selectedMenu, setSelectedMenu] = useState(0)
  const [selectedSubMenu, setSelectedSubMenu] = useState(0)
  const [addressCategory, setAddressCategory] = useState({})
  const [selectedSubMenuItem, setSelectedSubMenuItem] = useState(0)
  // const dispatch = useDispatch();

  const addFunc = () => {
    console.log("Helo World Adding Coupon")
  }

  // dispatch addressCategoryTree 

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
  const showDropDownMenu = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu(0)
    } else {
      setSelectedMenu(menu)
    }
  }

  const showSubMenu = (menu, subMenu) => {
    if (selectedSubMenu === subMenu) {
      setSelectedSubMenu(0)
    } else {
      setSelectedSubMenu(subMenu)
    }
  }
  
  const fetchAddressCategory = async () => {
    try {
      // dispatch(toggleField("isLoading"))
      let {data} = await axios.get("http://192.168.31.249:8000/business/get_all_address_categories")
      // console.log("data")
      // console.log(data)
      let HongKongList = []
      let KowloonList = []
      let NewTerritoriesList = []
      Object.entries(data["Hong Kong"].nodes).map(([key, value]) => {
          Object.entries(value.nodes).map(([key, value]) => {
          HongKongList.push( {
            addressCategoryId: value.address_category_id,
            addressCategoryName: value.address_category_name,
            addressCategoryLocode: value.address_category_locode,
            addressType: value.address_type,
            addressCategoryParentId: value.address_parent_id,
          })
        })
      })
      Object.entries(data["Kowloon"].nodes).map(([key, value]) => {
        Object.entries(value.nodes).map(([key, value]) => {
          KowloonList.push( {
            addressCategoryId: value.address_category_id,
            addressCategoryName: value.address_category_name,
            addressCategoryLocode: value.address_category_locode,
            addressType: value.address_type,
            addressCategoryParentId: value.address_parent_id,
          })
        })
      })
      Object.entries(data["New Territories"].nodes).map(([key, value]) => {
        Object.entries(value.nodes).map(([key, value]) => {
          NewTerritoriesList.push( {
            addressCategoryId: value.address_category_id,
            addressCategoryName: value.address_category_name,
            addressCategoryLocode: value.address_category_locode,
            addressType: value.address_type,
            addressCategoryParentId: value.address_parent_id,
          })
        })
      })
      setAddressCategory({
        "HongKong": HongKongList,
        "Kowloon": KowloonList,
        "NewTerritories": NewTerritoriesList
      })
      console.log("\n")
      // console.log("addressCategory")
      // console.log(addressCategory)
    } catch(error) {
      console.log("error")
      console.log(error)
    } finally {
      // dispatch(toggleField("isLoading"))
    }
  }

  useEffect(() => {
    fetchAddressCategory()
  }, [])

  return (
    <NativeBaseProvider>
      <Layout>
        <Background listing={true} contentHeight="78%">
          <Box position="relative" h="100%" w="100%">
            <View style={{position:"absolute" ,top: "-8%", width: "70%", height:"8%", left:"4%"}}>
              <Stack direction="row" w="100%" h="78%">
                <Box w="10%" mr="3%"><SvgXml width="100%" height="100%" xml={LeftArrow} /></Box>
                <VStack direction="row" w="76%" borderRadius="10" bg="white" alignItems="left">
                  <Center height="100%" width="15%">
                    <SvgXml height="40%" xml={MagnifierSVG} />
                  </Center>
                  <TextInput textAlignVertical='center'  placeholder="search coupon ?" />
                </VStack>
              </Stack>
            </View>
            <Box w="100%" h="14%">
              <Stack direction="row" w="100%" h="100%">
                <Box w="50%" h="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                  <SvgXml width="10%" height="50%" xml={AddressSVG}/>
                  <Text onPress={() => showDropDownMenu(1)} fontWeight="black" ml="1%">地區</Text>
                </Box>
                <Box w="50%" h="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                  <SvgXml width="10%" height="50%" xml={TypeCategorySVG}/>
                  <Text onPress={() => showDropDownMenu(2)} fontWeight="black" ml="2%">類別</Text>
                </Box>
              </Stack>
            </Box>
            <Box position="absolute" zIndex="10000" w="100%">
              {/* <ListingPageDropDownMenu 
                topD="0"
                showDropDownMenu={showDropDownMenu} 
                showSubMenu={showSubMenu}
                selectedMenu={selectedMenu}
                selectedSubMenu={selectedSubMenu}
                addressCategory={addressCategory}
                selectedSubMenuItem={selectedSubMenuItem}
              /> */}
              {
        selectedMenu === 1 ? (
          <Box minH="80" maxH="160" pb="3%" w="100%" bg="white" position="absolute" shadow={2} top={0} borderBottomRadius="50" zIndex={10000}>
            <ScrollView nestedScrollEnabled>
              <Pressable w="100%" h="60" onPress={() => showSubMenu(0, 0)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>不限</Text></Box>
              </Pressable>
              <Pressable w="100%" h="60" onPress={() => {showSubMenu(0, 1); console.log("asds")}} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>香港</Text></Box>
              </Pressable>
              { selectedSubMenu == 1 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={addressCategory["HongKong"]}/>
                </Box>
              ) : null}
              <Pressable w="100%" h="60" onPress={() => showSubMenu(0, 2)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>九龍</Text></Box>
              </Pressable>
              { selectedSubMenu == 2 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={addressCategory["Kowloon"]}/>
                </Box>
              ) : null}
              <Pressable w="100%" h="60" onPress={() => showSubMenu(0, 3)} alignItems="center">
                <Box w="85%" h="100%" display="flex" justifyContent="center" borderBottomWidth={0.2} borderBottomColor="grey"><Text>新界</Text></Box>
              </Pressable>
              { selectedSubMenu == 3 ? (
                <Box w="85%" display="flex" alignSelf="center" minH="20" borderBottomWidth={0.2} borderBottomColor="grey">
                  <AddressSubMenu subMenu={addressCategory["NewTerritories"]}/>
                </Box>
              ) : null}
            </ScrollView>
          </Box>
        ) : 
        (
          <Box></Box>
        )
      }
            </Box>
            <Box>
              <ScrollView>
                <VStack px="4%">
                  {
                    Array(20).fill(1).map((el, i) =>
                      <HStack  w="100%" mb="4" py="4" key={i}>
                        <CouponCard useYellowAdd={true} marb="0" imgSource="https://picsum.photos/200" imgAlt="test" merchantName="木作坊家品有限公司" couponDetail="$100現金卷" addFunc={() => addFunc()}/>
                        <CouponCard useYellowAdd={true} marb="0" imgSource="https://picsum.photos/200" imgAlt="test" merchantName="木作坊家品有限公司" couponDetail="$100現金卷" addFunc={() => addFunc()}/>
                      </HStack>
                    )
                  }
                </VStack>
              </ScrollView>
            </Box>
          </Box>
        </Background>
      </Layout>
    </NativeBaseProvider>
  );
};

const CouponListingScreenStyle = StyleSheet.create({
  
});

export default CouponListingScreen;

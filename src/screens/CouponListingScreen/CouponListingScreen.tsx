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
  const [selectedTypeCategory, setSelectedTypeCategory] = useState({})
  const [selectedAddressCategory, setSelectedAddressCategory] = useState("")
  const [TypeCategory, setTypeCategory] = useState({})
  // const dispatch = useDispatch();

  const addFunc = () => {
    console.log("Helo World Adding Coupon")
  }

  //TODO: Fake Category Type (Back End Not Ready)
  const fetchTypeCategory = () => {
    let ss = {}
    let fakeTypeCategory = ["全選", "飲食", "超市", "便利店", "百貨公司", "美容", "化妝品", "服裝", "潮流", "電子", "電器", "家居", "傢俬", "寵物", "玩具", "運動", "戶外", "汽車", "零售"]
    let ret = fakeTypeCategory.map((value, index) => {
      ss[value] = false;
      return {
        typeCategoryId: index,
        typeCategoryName: value
      }
    })
    setTypeCategory(ret)
    setSelectedTypeCategory(ss);
    console.log(ss);
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
    fetchTypeCategory()
  }, [])

  return (
    <NativeBaseProvider>
      <Layout>
        <Background listing={true} contentHeight="78%" tabBarSpace={true}>
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
            { selectedMenu != 0 ? (
                <Box position="absolute" zIndex="1000" w="100%" h="86%" top="14%">
                  <ListingPageDropDownMenu 
                    topD="0"
                    showDropDownMenu={showDropDownMenu} 
                    showSubMenu={showSubMenu}
                    setSelectedTypeCategory={setSelectedTypeCategory}
                    setSelectedAddressCategory={setSelectedAddressCategory}
                    selectedMenu={selectedMenu}
                    selectedSubMenu={selectedSubMenu}
                    addressCategory={addressCategory}
                    selectedSubMenuItem={selectedSubMenuItem}
                    typeCategory={TypeCategory}
                    selectedTypeCategory={selectedTypeCategory}
                  />
              </Box>
              ): null
            }
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

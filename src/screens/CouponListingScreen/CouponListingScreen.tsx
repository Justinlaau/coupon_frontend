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
import { useDispatch } from 'react-redux';
import { toggleLoading } from '../../../Redux/Action/CommonAction';
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
import BASE_S3_IMG_URL, { BASE_URL } from '../../config/config';
import ActualCoupon from '../../components/atoms/ActualCoupon';

const initialObjectState: {[key: string]: boolean} = {}

const CouponListingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState(0)
  const [selectedSubMenu, setSelectedSubMenu] = useState(0)
  const [addressCategory, setAddressCategory] = useState({})
  const [selectedSubMenuItem, setSelectedSubMenuItem] = useState(0)
  const [selectedTypeCategory, setSelectedTypeCategory] = useState(initialObjectState)
  const [selectedAddressCategory, setSelectedAddressCategory] = useState("")
  const [TypeCategory, setTypeCategory] = useState([])
  const [couponGroups, setCouponGroups] = useState([])

  const addFunc = async (couponGroupId, expireDate) => {
    let {data} = await axios.post(BASE_URL + "coupon/addCoupon", {
      "coupon_group_id": couponGroupId,
      "total": 1,
      "expire_date": expireDate
    })
    // console.log("Adding Coupon")
  }

  //TODO: Fake Category Type (Back End Not Ready)
  const fetchTypeCategory = async () => {
    let {data} = await axios.get(BASE_URL + "coupon/AllCouponCategories") || []
    let ss : {[key: string]: boolean} = {}
    let ret = [{typeCategoryId: 0, typeCategoryName: "ALL"}]
    data.map(value => {
      ss[value["couponCategoryName"]] = false;
      ret.push({
        typeCategoryId: value["couponCategoryId"],
        typeCategoryName: value["couponCategoryName"]
      })
    })
    ss["ALL"] = true;
    setTypeCategory(ret)
    setSelectedTypeCategory({...ss});
  }

  const fetchCouponGroups = async () => {
    try {
      let {data} = await axios.post(BASE_URL + "coupon/getAllCouponGroupsAPI")
      console.log("data")
      console.log(data)
      setCouponGroups(data)
    } catch (error) {
      console.log("error")
      console.log(error)
    }
  }

  // TODO: allow filter by address category
  const filterCouponGroups = async () => {
    try {
      let filterList = []
      for (let category of TypeCategory) {
        if (selectedTypeCategory[category.typeCategoryName]) {
          filterList.push(category.typeCategoryId)
        }
      }
      // console.log("filterList")
      // console.log(filterList)
      let {data} = await axios.post(BASE_URL + "coupon/filterCouponGroups", {
        "categories": filterList,
      })
      // console.log("data")
      // console.log(data)
      setCouponGroups(data)
    } catch (error) {
      console.log("error")
      console.log(error)
    }
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
      let {data} = await axios.get(BASE_URL + "business/get_all_address_categories")
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
        // Object.entries(value.nodes).map(([key, value]) => {
          NewTerritoriesList.push( {
            key: value.address_category_id,
            addressCategoryId: value.address_category_id,
            addressCategoryName: value.address_category_name,
            addressCategoryLocode: value.address_category_locode,
            addressType: value.address_type,
            addressCategoryParentId: value.address_parent_id,
          })
        // })
      })

      // KowloonList.forEach(item=> console.log(item))
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

  const initFetch = () => {
    try {
      dispatch(toggleLoading(true));
      fetchAddressCategory()
      fetchTypeCategory()
      fetchCouponGroups()
    } catch (error) {
      console.log("error")
      console.log(error)
    } finally {
      dispatch(toggleLoading(false));
    }
  }

  useEffect(() => {
    initFetch()
  }, [])

  return (
    <NativeBaseProvider>
      <Layout showTabBar={true}>
        <Background listing={true} contentHeight="78%" tabBarSpace={true}>
            <View style={{position:"absolute" ,top: "-8%", width: "70%", height:"8%", left:"4%"}}>
              <Stack direction="row" w="100%" h="78%">
                <Box w="10%" mr="3%">
                  <Pressable onPress={() => navigation.goBack()}>
                    <SvgXml width="100%" height="100%" xml={LeftArrow} />
                  </Pressable>
                </Box>
                <VStack direction="row" w="76%" borderRadius="10" bg="white" alignItems="left" style={{alignItems: "center"}}>
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
                    filterCouponGroups={() => filterCouponGroups()}
                    fetchCouponGroups={() => fetchCouponGroups()}
                  />
              </Box>
              ): null
            }
            <Box w="100%" h="86%">
              <ScrollView>
                <Stack px="4%" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                  {
                    couponGroups.map((el, i) => 
                        <ActualCoupon
                        companyName={el["title"]} 
                        value={el["value"]} 
                        image={{uri: BASE_S3_IMG_URL + el["image"]}}
                        couponType={el["coupon_type"]}
                        rollAnimated={false}
                        rightBorder={false}
                        />
                    )
                  }
                </Stack>
              </ScrollView>
            </Box>
        </Background>
      </Layout>
    </NativeBaseProvider>
  );
};

const CouponListingScreenStyle = StyleSheet.create({
  
});

export default CouponListingScreen;

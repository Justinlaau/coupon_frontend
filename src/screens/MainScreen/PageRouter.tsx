import React, { useState } from 'react';
import { View, StyleSheet, DimensionValue, TouchableOpacity, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import PageRouterItems from './PageRouterItems';

{/* SVG Routing */}
import FoodSVG from '../../assets/images/ICON/FoodSVG';
import FoodSVGonClick from '../../assets/images/ICON/FoodSVGonClick';
import SupermarketSVG from '../../assets/images/ICON/SupermarketSVG';
import SupermarketSVGonClick from '../../assets/images/ICON/SupermarketSVGonClick';
import RecreationSVG from '../../assets/images/ICON/RecreationSVG';
import RecreationSVGonClick from '../../assets/images/ICON/RecreationSVGonClick';
import ClothesSVG from '../../assets/images/ICON/ClothesSVG';
import ClothesSVGonClick from '../../assets/images/ICON/ClothesSVGonClick';
import BeautySVG from '../../assets/images/ICON/BeautySVG';
import BeautySVGonClick from '../../assets/images/ICON/BeautySVGonClick';
import FashionSVG from '../../assets/images/ICON/FashionSVG';
import FashionSVGonClick from '../../assets/images/ICON/FashionSVGonClick';
import LivingSVG from '../../assets/images/ICON/LivingSVG';
import LivingSVGonClick from '../../assets/images/ICON/LivingSVGonClick';
import ShopSVG from '../../assets/images/ICON/ShopSVG';
import ShopSVGonClick from '../../assets/images/ICON/ShopSVGonClick';

interface PageRouterType {
    navigation: any,
    height: DimensionValue | undefined,
}

const boxWidth = "19%"

const PageRouter = (props : PageRouterType) => {
  const [onClickFood, setOnClickFood] = useState(false);
  const [onClickSuperMarket, setOnClickSuperMarket] = useState(false);
  const [onClickRecreation, setOnClickRecreation] = useState(false);
  const [onClickClothes, setOnClickClothes] = useState(false);
  const [onClickBeauty, setOnClickBeauty] = useState(false);
  const [onClickFashion, setOnClickFashion] = useState(false);
  const [onClickLiving, setOnClickLiving] = useState(false);
  const [onClickShop, setOnClickShop] = useState(false);
  const [sth, setSth] = useState(false);


  return (
    <View style={[styles.container, {height: props.height}]}>
      <View style={styles.row}>
        <PageRouterItems
            setOnClick={setOnClickFood}
            onClick={onClickFood}
            xml={FoodSVG}
            xmlOnClick={FoodSVGonClick}
            navigateString="FoodMain"
            boxWidth={boxWidth}
            navigation={props.navigation}
            title="美食"
        />

        <PageRouterItems
            setOnClick={setOnClickSuperMarket}
            onClick={onClickSuperMarket}
            xml={SupermarketSVG}
            xmlOnClick={SupermarketSVGonClick}
            navigateString="Main"
            boxWidth={boxWidth}
            navigation={props.navigation}
            title="超巿"
        />

        <PageRouterItems
            setOnClick={setOnClickRecreation}
            onClick={onClickRecreation}
            xml={RecreationSVG}
            xmlOnClick={RecreationSVGonClick}
            navigateString="Main"
            boxWidth={boxWidth}
            navigation={props.navigation}
            title="休閒娛樂"
        />     

        <PageRouterItems
            setOnClick={setOnClickClothes}
            onClick={onClickClothes}
            xml={ClothesSVG}
            xmlOnClick={ClothesSVGonClick}
            navigateString="Main"
            boxWidth={boxWidth}
            navigation={props.navigation}
            title="服裝"
        />   

        <PageRouterItems
            setOnClick={setOnClickBeauty}
            onClick={onClickBeauty}
            xml={BeautySVG}
            xmlOnClick={BeautySVGonClick}
            navigateString="Main"
            boxWidth={boxWidth}
            navigation={props.navigation}
            title="美容化妝"
        />           
      </View>
      <View style={styles.row}>
        <PageRouterItems
            setOnClick={setOnClickFashion}
            onClick={onClickFashion}
            xml={FashionSVG}
            xmlOnClick={FashionSVGonClick}
            navigateString="Main"
            boxWidth={boxWidth}
            navigation={props.navigation}
            title="時尚潮流"
          />           
        <PageRouterItems
            setOnClick={setOnClickLiving}
            onClick={onClickLiving}
            xml={LivingSVG}
            xmlOnClick={LivingSVGonClick}
            navigateString="Main"
            boxWidth={boxWidth}
            navigation={props.navigation}
            title="生活家居"
          />           
        <PageRouterItems
            setOnClick={setOnClickShop}
            onClick={onClickShop}
            xml={ShopSVG}
            xmlOnClick={ShopSVGonClick}
            navigateString="Main"
            boxWidth={boxWidth}
            navigation={props.navigation}
            title="禮券"
          />          
       <PageRouterItems
            setOnClick={setSth}
            onClick={sth}
            xml={ShopSVG}
            xmlOnClick={ShopSVGonClick}
            navigateString="Main"
            boxWidth={boxWidth}
            navigation={props.navigation}
            title="禮券"
          />          
       <PageRouterItems
            setOnClick={setSth}
            onClick={sth}
            xml={ShopSVG}
            xmlOnClick={ShopSVGonClick}
            navigateString="Main"
            boxWidth={boxWidth}
            navigation={props.navigation}
            title="禮券"
          />          
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
    width: boxWidth,
    backgroundColor: 'gray',
  },
});

export default PageRouter;
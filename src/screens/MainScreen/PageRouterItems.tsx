import React, { useState } from 'react';
import { DimensionValue, TouchableOpacity, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface PageRouterItems{
    setOnClick: React.Dispatch<React.SetStateAction<boolean>>,
    onClick: boolean,
    xml: any,
    xmlOnClick: any,
    navigateString: string,
    boxWidth: DimensionValue | undefined,
    navigation: any,
    title: string,
}

const PageRouterItems = (props: PageRouterItems) => {
    return (
        <TouchableOpacity style={{width: props.boxWidth, height: "100%", display: 'flex', justifyContent: "center", alignItems: "center"}} 
        onPress={() => props.navigation.navigate(props.navigateString)}
        onPressIn={() => props.setOnClick(true)}
        onPressOut={() => props.setOnClick(false)}
        activeOpacity={1}
        >
        { props.onClick? 
          <SvgXml height={45} width={45} xml={props.xmlOnClick} />
          : <SvgXml height={45} width={45} xml={props.xml} />
        }
        <Text style={{fontSize: 13, color: "black"}}>
          {props.title}
        </Text>
      </TouchableOpacity>
    )
}

export default PageRouterItems;
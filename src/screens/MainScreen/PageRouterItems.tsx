import React, { useState } from 'react';
import { View, DimensionValue, TouchableOpacity, Text } from 'react-native';
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
        <View style={{     
          shadowColor: "#000",
          shadowOffset: {
              height: 3,
              width: 3
          },
          elevation: 3,
          backgroundColor: "white", 
          borderRadius: 10
        }}>
          { props.onClick? 
            <SvgXml height={45} width={45} xml={props.xmlOnClick} />
            : <SvgXml height={45} width={45} xml={props.xml} />
          }
        </View>
        <Text style={{fontSize: 13, color: "black"}}>
          {props.title}
        </Text>
      </TouchableOpacity>
    )
}

export default PageRouterItems;
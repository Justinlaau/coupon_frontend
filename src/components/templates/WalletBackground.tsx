import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BaseLeftSVG} from '../../assets/images/BaseLeftSVG';
import {ProfileSVG} from '../../assets/images/ProfileSVG';
import {BaseRightSVG} from '../../assets/images/BaseRightSVG';
import BackIcon from 'react-native-vector-icons/FontAwesome'
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  View,
  Heading,
  Hidden,
} from 'native-base';
import { LittleCatSVG } from '../../assets/images/LittleCatSVG';


const WalletBackground = (props) => {
  const { height } = Dimensions.get('window');
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <View style={[BackgroundStyle.container, {height}]}>
        { props.main ? (
          <>
          <View style={{flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'}}>
                <TouchableOpacity 
                style={{ width: '15%'}}
                onPress={()=>{ navigation.navigate("Main")}}>

                  <BackIcon 
                      name="chevron-left"
                      style={{
                          color: "#FFF",
                          position: "relative",
                          marginLeft: 20,
                          top: "5%",
                      }}
                      size={25}>             
                    </BackIcon>
                </TouchableOpacity>
            <Heading
                w="100%"
                style={BackgroundStyle.Heading}
                size="xl"
                textAlign={'center'}
                color="light.50"
                fontSize={20}>
                Q Wallet
            </Heading>
            <SvgXml width="100%" height="8%"  xml={LittleCatSVG} style={BackgroundStyle.LittleCatView} />
          </View>
            <View style={BackgroundStyle.BaseRightSVG}>
            <SvgXml width="100%" height="270" xml={BaseRightSVG} />
          </View>
        </>
         ) : null        
        }
        {
          props.listing ? (
            <>
            </>
          ) : null
        }
        <View h={props.contentHeight} style={BackgroundStyle.whiteView} bottom={props.tabBarSpace ? "8%" : "0%"}>
          <Box position="relative" h="100%" w="100%">
            {props.children}
          </Box>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const BackgroundStyle = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 50,
    height: '100%',
    width: '100%',
    backgroundColor: '#DC2B37',
  },
  Heading: {
    position: 'absolute',
    zIndex: 7,
    top: '5%',
  },
  whiteView: {
    position: 'absolute',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    width: '100%',
    backgroundColor: '#FBFBFC',
    zIndex: 3,
  },

  LittleCatView: {
    position: 'relative',
    zIndex: 7,
    top: '6%',
    left: "8%"
  },

  BaseLeftSVG: {
    position: 'absolute',
    left: '-5%',
    top: '7%',
    width: '30%',
    alignItems: 'flex-start',
    resizeMode: 'contain',
    zIndex: 2,
  },
  BaseRightSVG: {
    position: 'absolute',
    top: '0%',
    right: '0%',
    width: '66%',
    alignItems: 'flex-end',
    resizeMode: 'contain',
    zIndex: 3,
  },

});

export default WalletBackground;

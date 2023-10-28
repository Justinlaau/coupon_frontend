import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text, SearchIcon} from 'react-native';
import Background from '../../components/templates/Background';
import Layout from '../../components/templates/Layout';
import {ProfileSVG} from '../../assets/images/ProfileSVG';
import SearchSVG from '../../assets/images/SearchSVG';
import {
  NativeBaseProvider,
  VStack,
  Center,
  Stack,
  Box,
  ScrollView,
  Input,
  Icon,
} from 'native-base';
import {SvgXml} from 'react-native-svg';
// import Icon from 'react-native-vector-icons/FontAwesome';


const MainScreen = ({navigation}) => {
  return (
    <Layout>
      <Background>
        <NativeBaseProvider>
          <Stack space={4} alignItems="center" h="100%">
            <Stack
              direction="row"
              h="15%"
              w="100%"
              bg="rose.50"
              style={MainStyle.header}>
              <Box
                style={{flex: 1, justifyContent: 'center', paddingLeft: '7%'}}
                w="70%"
                height="100%"
                _text={{fontSize: '30', fontWeight: '900', textAlign: 'left'}}>
                揾 Coupon !
              </Box>
              <Center height="100%" width="25%">
                <SvgXml width="45%" xml={ProfileSVG} />
              </Center>
            </Stack>
            <VStack h="85%" w="100%" px="6">
              <ScrollView>
                <Center h="15%">
                  <Input
                        placeholder="Search Coupon?"
                        InputLeftElement={<SvgXml width="10%" xml={SearchIcon} />}
                    />
                </Center>
                <Center
                  w="80"
                  h="10"
                  bg="indigo.700"
                  rounded="md"
                  shadow={3}
                  mb="4"
                />
                <Center
                  w="80"
                  h="10"
                  bg="indigo.700"
                  rounded="md"
                  shadow={3}
                  mb="4"
                />
                <Center
                  w="80"
                  h="10"
                  bg="indigo.700"
                  rounded="md"
                  shadow={3}
                  mb="4"
                />
                <Center
                  w="80"
                  h="10"
                  bg="indigo.700"
                  rounded="md"
                  shadow={3}
                  mb="4"
                />
                <Center
                  w="80"
                  h="10"
                  bg="indigo.700"
                  rounded="md"
                  shadow={3}
                  mb="4"
                />
              </ScrollView>
            </VStack>
          </Stack>
        </NativeBaseProvider>
      </Background>
    </Layout>
  );
};

const MainStyle = StyleSheet.create({
  test: {
    backgroundColor: 'blue',
    height: '100%',
    width: '100%',
  },
  header: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  content: {
    // overflow: 'scroll',
  },
});

export default MainScreen;

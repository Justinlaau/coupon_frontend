// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import axios from 'axios';
// import Background from '../../components/templates/Background';
// import QRCodeBackground from '../../components/templates/QRCodeBackground';
// import Layout from '../../components/templates/Layout';
// import {ProfileSVG} from '../../assets/images/ProfileSVG';
// import {MagnifierSVG} from '../../assets/images/MagnifierSVG';
// import MainPageMenu from '../../components/templates/MainPageMenu';
// import MainPageListing from '../../components/templates/MainPageListing';
// import ActualCoupon from '../../components/atoms/ActualCoupon';
// import LeftArrow from '../../assets/images/LeftArrow';
// import {CatSVG} from '../../assets/images/CatSVG';
// import {connectWebSocket} from '../Websocket/Websocket';
// import io from 'socket.io-client';
// import { BASE_WS_URL } from '../../config/config';
// import {
//   NativeBaseProvider,s
//   VStack,
//   Center,
//   Stack,
//   Box,
//   Icon,
//   Input,
//   ScrollView,
//   Container,
//   Text,
//   Button,
//   Heading,
// } from 'native-base';
// import { BASE_URL, BASE_S3_IMG_URL } from '../../config/config';
// import {SvgXml} from 'react-native-svg';
// import { Buffer } from 'buffer'
// import { useDispatch } from 'react-redux';
// import { toggleLoading, toggleMessagePopup, setMessagePopup } from '../../../Redux/Action/CommonAction';
// import { TOGGLE_SUCCESS_POPUP, SET_SUCCESS_MESSAGE, TOGGLE_ERROR_POPUP, SET_ERROR_MESSAGE } from '../../../Redux/Action/ActionType';
// import { RNCamera } from 'react-native-camera';


// // import Icon from 'react-native-vector-icons/FontAwesome';

// const QRCodeScanning = ({navigation}) => {
//   const dispatch = useDispatch();
//   const [scanning, setScanning] = useState(true);
//   const cameraRef = useRef(null);
  
//   const confirmScan = async (qrcodeId) => {
//     let result = false;
//     try {
//       dispatch(toggleLoading(true))
//       let {data} = await axios.post(BASE_URL + "coupon/merchantScanCoupon", {
//         "qrcodeId": qrcodeId
//       })
//       result = data.result;
//     } catch (error) {
//       result = false
//       console.log(error)
//     } finally {
//       dispatch(toggleLoading(false))
//     }
//     return result;
//   }

//   const onBarCodeRead = async (e: any) => {
//     if (scanning) {
//       setScanning(false)
//     } else  {
//       return;
//     }
//     console.log(e.data)
//     let result = await confirmScan(e.data)
//     dispatch(toggleLoading(false))
//     // if (cameraRef.current) {
//     //   // Stop recording if currently recording video
//     //   cameraRef.current.stopCamera();
//     // }
//     if (result) {
//       dispatch(setMessagePopup("Successfully scanned the coupon!", SET_SUCCESS_MESSAGE))
//       dispatch(toggleMessagePopup(true, TOGGLE_SUCCESS_POPUP))
//     } else {
//       dispatch(setMessagePopup("Failed to scan the coupon!", SET_ERROR_MESSAGE))
//       dispatch(toggleMessagePopup(true, TOGGLE_ERROR_POPUP))
//     }
//     navigation.navigate('Wallet')
//   }

//   return (
//     <Layout showTabBar={false}>
//       <QRCodeBackground goBack={() => navigation.goBack()}>
//         <NativeBaseProvider>
//           <Stack style={MainStyle.imageHolder}>
//             <Heading
//               w="100%"
//               style={MainStyle.Heading}
//               size="xl"
//               textAlign={'center'}
//               color="light.50"
//             >
//               COUPON GO!
//             </Heading>
//             <View style={MainStyle.CatView}>
//               <SvgXml height="100%" xml={CatSVG} />
//             </View>
//             <RNCamera
//               ref={cameraRef}
//               style={{width: 250, height: 250, marginTop: "auto", marginBottom: "auto", marginLeft: "auto", marginRight: "auto"}}
//               type={RNCamera.Constants.Type.back}
//               barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
//               flashMode={RNCamera.Constants.FlashMode.auto}
//               captureAudio={false}
//               onBarCodeRead={(e) => onBarCodeRead(e)}
//             />
//             {/* <Image source={{uri: qrCode}} style={{width: 250, height: 250, marginTop: "auto", marginBottom: "auto", marginLeft: "auto", marginRight: "auto"}} /> */}
//           </Stack>
//         </NativeBaseProvider>
//       </QRCodeBackground>
//     </Layout>
//   );
// };

// const MainStyle = StyleSheet.create({
//   imageHolder: {
//     position: "relative",
//     width: 300, 
//     height: 300, 
//     marginBottom: "auto", 
//     marginTop: "auto", 
//     marginLeft: "auto", 
//     marginRight: "auto",
//     backgroundColor: "white",
//     borderRadius: 50,
//     zIndex: 60,
//   },
//   header: {
//     borderTopRightRadius: 50,
//     borderTopLeftRadius: 50,
//   },
//   content: {
//     // overflow: 'scroll',
//   },
//   Heading: {
//     position: 'absolute',
//     zIndex: 7,
//     top: '-50%',
//   },
//   CatView: {
//     position: 'absolute',
//     zIndex: 7,
//     top: '-38%',
//     left: '50%',
//     transform: [{ translateX: -105}],
//     height: '40%',
//   },
// });

// export default QRCodeScanning;

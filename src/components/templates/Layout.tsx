import React, { useEffect, useRef } from 'react';
import TabBar from './TabBar';
import {View, StyleSheet, Text, Image, Dimensions, ActivityIndicator, TouchableOpacity, RefreshControl, ViewStyle, Animated} from 'react-native';
import Background from './Background';
import { useDispatch, useSelector } from 'react-redux';
import { 
  TOGGLE_SUCCESS_POPUP, 
  TOGGLE_ERROR_POPUP,  
  TOGGLE_OPERATION_POPUP,
} from '../../../Redux/Action/ActionType';
import { toggleMessagePopup } from '../../../Redux/Action/CommonAction';
const { height } = Dimensions.get('window');

export default function Layout(props: {children: any, showTabBar: Boolean}) {
  const dispatch = useDispatch();
  const commonLoading = useSelector((state: any) => state.commonReducer.data.commonLoading);
  const successPopup = useSelector((state: any) => state.commonReducer.data.successPopup);
  const successPopupMessage = useSelector((state: any) => state.commonReducer.data.successPopupMessage);
  const errorPopup = useSelector((state: any) => state.commonReducer.data.errorPopup);
  const errorPopupMessage = useSelector((state: any) => state.commonReducer.data.errorPopupMessage);
  const operationPopup = useSelector((state: any) => state.commonReducer.data.operationPopup);
  const operationPopupMessage = useSelector((state: any) => state.commonReducer.data.operationPopupMessage);

  return (
    <View style={[LayoutStyle.layout, {height}]}>
      {props.children}
      {
        props.showTabBar ? <TabBar /> : null
      }
      {
        commonLoading ? (
          <>
            <View style={LayoutStyle.loadingStyle}>
              <View style={LayoutStyle.loadingBox}>
                <ActivityIndicator size="large" color="#DC2B37" />
              </View>
            </View>
          </>
        ) : null
      }
      {
        // hardcode for now
        successPopup ? (
          <>
            <View style={LayoutStyle.loadingStyle}>
              <View style={LayoutStyle.messageBox}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10}}>{successPopupMessage}</Text>
                </View>
                <TouchableOpacity onPress={() => dispatch(toggleMessagePopup(false, TOGGLE_SUCCESS_POPUP))}>
                  <View style={{width: 60, height: 40, backgroundColor: "#DC2B37", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                    <Text style={{color: "white"}}>確定</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null
      }
      {
        // hardcode for now
        errorPopup ? (
          <>
            <View style={LayoutStyle.loadingStyle}>
              <View style={LayoutStyle.messageBox}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10}}>{errorPopupMessage}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    dispatch(toggleMessagePopup(false, TOGGLE_ERROR_POPUP))
                    // errorCallback();
                }}>
                  <View style={{width: 60, height: 40, backgroundColor: "#DC2B37", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                    <Text style={{color: "white"}}>確定</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null
      }
      {
        // hardcode for now
        operationPopup ? (
          <>
            <View style={LayoutStyle.loadingStyle}>
              <View style={LayoutStyle.messageBox}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10}}>{operationPopupMessage}</Text>
                </View>
                <TouchableOpacity onPress={() => dispatch(toggleMessagePopup(false, TOGGLE_OPERATION_POPUP))}>
                  <View style={{width: 60, height: 40, backgroundColor: "#DC2B37", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                    <Text style={{color: "white"}}>確定</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null
      }
    </View>
  );
}

const LayoutStyle = StyleSheet.create({
  layout: {
    height: '100%',
    width: '100%',
  },
  loadingStyle: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 99999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingBox: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    elevation: 10,
  },
  messageBox: {
    maxWidth: '80%',
    paddingHorizontal: "3%",
    paddingVertical: "3%",
    // height: "50%",
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    elevation: 10,
  }
});


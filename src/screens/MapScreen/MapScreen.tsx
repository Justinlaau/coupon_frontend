import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Platform,
  Dimensions
} from 'react-native';
import MapView,
{ PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle }
  from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export default class MapScreen extends Component{
    render(){
        return (
        <View>
            <MapView
            provider={PROVIDER_GOOGLE}>
            </MapView>
        </View>
        )
    }
}
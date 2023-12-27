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
import Layout from '../../components/templates/Layout';


export default class MapScreen extends Component{

    state = {
        markers: [],
        coordinates: [],
        initialPosition: {
            latitude: 0,
            longitude: 0,            
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
        }
    }

    componentDidMount() {
        this.requestLocationPermission();
    }

    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          console.log('iPhone: ' + response);
    
          if (response === 'granted') {
            this.locateCurrentPosition();
          }
        } else {
          var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          console.log('Android: ' + response);
    
          if (response === 'granted') {
            this.locateCurrentPosition();
          }
        }
      }

    locateCurrentPosition = () => {
        Geolocation.getCurrentPosition(
          position => {
            console.log(JSON.stringify(position));
    
            let initialPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
    
            this.setState({ initialPosition });
          }
        )
      }

    render(){
        return (
        <Layout showTabBar={true}>
            <View style={{height: "100%", width: "100%", backgroundColor: "black"}}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    ref={map => this._map = map}
                    style={styles.map}
                    showsUserLocation={true}
                    initialRegion={this.state.initialPosition}>
                </MapView>
            </View>
        </Layout>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
      },
})
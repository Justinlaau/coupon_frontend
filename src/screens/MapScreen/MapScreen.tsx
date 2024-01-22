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
import Carousel from 'react-native-snap-carousel';


export default class MapScreen extends Component{

    state = {
        markers: [],
        coordinates: [
          { name: '7-Eleven 1', latitude: 22.281080, longitude: 114.175590},
          { name: '7-Eleven 2', latitude: 22.278633638083072, longitude: 114.17193079846916},
          { name: 'Pacific Coffee', latitude: 22.28108630910841, longitude: 114.17463338202094},
        ],
        initialPosition: {
            latitude: 0,
            longitude: 0,            
            latitudeDelta: 0.055,
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
              latitudeDelta: 0.055,
              longitudeDelta: 0.035
            }
            console.log(initialPosition)
            this.setState({ initialPosition: initialPosition });

            this._map.animateToRegion({
              latitude: this.state.initialPosition.latitude,
              longitude: this.state.initialPosition.longitude,
              latitudeDelta: 0.055,
              longitudeDelta: 0.035
            });
          }
        );
      }

    onCarouselItemChange = (index) => {
        let location = this.state.coordinates[index];
        console.log(location);
        this.onMarkerPressed(location, index);
        this.state.markers[index].showCallout();
      }
    
    onMarkerPressed = (location, index) => {
        this._map.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.055,
          longitudeDelta: 0.035
        });
        this._carousel.snapToItem(index);
        this.forceUpdate();
      }

    renderCarouselItem = ({ item }) =>(
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Image style={styles.cardImage} source={item.image} />
      </View>
    )

    render(){
        return (
        <Layout 
          showTabBar={true} 
          isHeading={{"isHeading": false, "userID": "", "userName": ""}}
        >
            <View style={{height: "100%", width: "100%", backgroundColor: "black"}}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    ref={map => this._map = map}
                    style={styles.map}
                    showsUserLocation={true}
                    initialRegion={this.state.initialPosition}>
                {
                  this.state.coordinates.map((marker, index) => (
                    <Marker
                      key={marker.name}
                      ref={ref => this.state.markers[index] = ref}
                      onPress={() => this.onMarkerPressed(marker, index)}
                      coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    >
                      <Callout>
                        <Text>{marker.name}</Text>
                      </Callout>

                    </Marker>
                  ))
                }

                </MapView>

                <Carousel
                  ref={(c) => { this._carousel = c; }}
                  data={this.state.coordinates}
                  containerCustomStyle={styles.carousel}
                  renderItem={this.renderCarouselItem}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={300}
                  removeClippedSubviews={false}
                  onSnapToItem={(index) => this.onCarouselItemChange(index)}
                />
            </View>
        </Layout>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
      },
    carousel: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 48
      },
    cardContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: 200,
        width: 300,
        padding: 24,
        borderRadius: 24
      },
    cardImage: {
        height: 120,
        width: 300,
        bottom: 0,
        position: 'absolute',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
      },
    cardTitle: {
        color: 'white',
        fontSize: 22,
        alignSelf: 'center'
      }
})
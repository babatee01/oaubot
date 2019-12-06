import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions} from 'react-native';
import * as Permissions from 'expo-permissions';
import PolyLine from '@mapbox/polyline';
import MapView  from 'react-native-maps';
import Geolocation from '../../components/Geolocation';
import Search from '../../components/Search';
import firebase from 'react-native-firebase';


export default class Main extends Component {
  constructor (props){
    super(props);
    this.state = {
      currentUser:null,
      locationQuery: '',
      destinationQuery: '',
      ready: false,
      where: {
        lat: null,
        long: null,
      },
      error: null,

    }
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoFailure = this.geoFailure.bind(this);
    
  }

   async componentDidMount() {
     const { status } = await Permissions.getAsync(Permissions.LOCATION);
     const { currentUser } = firebase.auth();

     if( status !== 'granted') {
       const response = await Permissions.askAsync(Permissions.LOCATION);
     }
    
    let geoOption = {
      enableHighAccuracy: true,
      timout: 20000,
      maximumAge: 60 * 60,
    }
    this.setState({ready: false, error: null, currentUser });
    
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOption)
    

  }

  geoSuccess ( position ) {
    
    const {latitude, longitude } = position.coords;

    this.setState({ready: true, where: {
      lat: latitude,
      long: longitude,
    }})
  }

  geoFailure ( error ) {
    this.setState({error: error.message})

  }

  
  render() {
    const { currentUser } = this.state;
    console.log(currentUser)
    return (
        
        <View style={styles.container}  >
        {this.state.ready && (

        <MapView
          showsUserLocation
          style = {styles.mapStyle}
          region = {{
            latitude: this.state.where.lat,
            longitude: this.state.where.long,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.1021
          }}
        >
        
        </MapView>
        )}
        { !this.state.ready && (
          <Geolocation 
          message = 'Loading...'
          />
        )}
        { this.state.error && (
          <Geolocation 
          message = {this.state.error}
          />
        )}
        
        {
          this.state.ready && (
                <Search 
                whereLat = {this.state.where.lat}
                whereLong = {this.state.where.long}
                />
          )}
        </View>
      
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  
  mapStyle: {
    zIndex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
  },
});

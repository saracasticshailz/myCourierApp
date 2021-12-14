import { StyleSheet, View,Image ,Text,SafeAreaView,StatusBar} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect,useState } from "react"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions" 


const ViewMap = () => {
    const handleLocationPermission = async () => { 
      let permissionCheck = '';
      if (Platform.OS === 'ios') {
        permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  
        if (
          permissionCheck === RESULTS.BLOCKED ||
          permissionCheck === RESULTS.DENIED
        ) {
          const permissionRequest = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
          permissionRequest === RESULTS.GRANTED
            ? console.warn('Location permission granted.')
            : console.warn('location permission denied.');
        }
      }
  
      if (Platform.OS === 'android') {
        permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  
        if (
          permissionCheck === RESULTS.BLOCKED ||
          permissionCheck === RESULTS.DENIED
        ) {
          const permissionRequest = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          permissionRequest === RESULTS.GRANTED
            ? console.warn('Location permission granted.')
            : console.warn('location permission denied.');
        }
      }
    };
  
    useEffect(() => {
      handleLocationPermission()
    }, [])
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 19.566490,
            longitude: 74.650520,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true} 
        />
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  })
  
  export default ViewMap;
  
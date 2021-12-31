import { StyleSheet, View,Image ,Text,SafeAreaView,StatusBar} from 'react-native';
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect,useState,Component } from "react"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions" 
import  MapmyIndiaGL  from  'mapmyindia-map-react-native-beta';

MapmyIndiaGL.setMapSDKKey("db7d087ab67a71109cbc057e694a8319");//place your mapsdkKey
MapmyIndiaGL.setRestAPIKey("");//your restApiKey
MapmyIndiaGL.setAtlasClientId("33OkryzDZsLkd_neC1Aj859UKpsG3A1qjGwTvNO-a4nvwJvUKyfduw-8J55guJkndZuc8Z3-pPsHuWi1aWEwzA==");//your atlasClientId key
MapmyIndiaGL.setAtlasClientSecret("lrFxI-iSEg9VgCF51T7HzlVBBXZ0a_MbxhAbZkVDBLLEOClYsQsYohaM7junOHoJXMOCWHtPcPDwkOe8dR4YG-JXljPoItOs"); //your atlasClientSecret key
MapmyIndiaGL.setAtlasGrantType("");

export default class ViewMap extends Component {
  render() {
    return (
      <View style={{flex:1}}>
          <MapmyIndiaGL.MapView style={{flex:1}} >
		  <MapmyIndiaGL.Camera
                ref={c  => (this.camera = c)}
                zoomLevel={12}
                minZoomLevel={4}
                maxZoomLevel={22}
                centerCoordinate={[77.231409,28.6162]}
                 />
		 </MapmyIndiaGL.MapView>
      </View>
    );
  }
}
// const ViewMap = () => {
//     const handleLocationPermission = async () => { 
//       let permissionCheck = '';
//       if (Platform.OS === 'ios') {
//         permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  
//         if (
//           permissionCheck === RESULTS.BLOCKED ||
//           permissionCheck === RESULTS.DENIED
//         ) {
//           const permissionRequest = await request(
//             PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//           );
//           permissionRequest === RESULTS.GRANTED
//             ? console.warn('Location permission granted.')
//             : console.warn('location permission denied.');
//         }
//       }
  
//       if (Platform.OS === 'android') {
//         permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  
//         if (
//           permissionCheck === RESULTS.BLOCKED ||
//           permissionCheck === RESULTS.DENIED
//         ) {
//           const permissionRequest = await request(
//             PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//           );
//           permissionRequest === RESULTS.GRANTED
//             ? console.warn('Location permission granted.')
//             : console.warn('location permission denied.');
//         }
//       }
//     };
  
//     useEffect(() => {
//       handleLocationPermission()
//     }, [])
  
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="dark-content" />
//         <MapView
//           style={styles.map}
//           provider={PROVIDER_GOOGLE}
//           initialRegion={{
//             latitude: 19.566490,
//             longitude: 74.650520,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           showsUserLocation={true} 
//         />
//       </SafeAreaView>
//     )
//   }
  
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  })
  

  
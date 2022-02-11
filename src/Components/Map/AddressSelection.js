import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import Toast from 'react-native-simple-toast';
import { IconButton, Colors } from 'react-native-paper';
import {_storeData} from '../../utils/storage';
import { navigate } from '../../../RootNavigation';
import Constant from '../../utils/Constant'


Mapmyindia.setClientId("33OkryzDZsLkd_neC1Aj859UKpsG3A1qjGwTvNO-a4nvwJvUKyfduw-8J55guJkndZuc8Z3-pPsHuWi1aWEwzA==");
Mapmyindia.setClientSecret("lrFxI-iSEg9VgCF51T7HzlVBBXZ0a_MbxhAbZkVDBLLEOClYsQsYohaM7junOHoJXMOCWHtPcPDwkOe8dR4YG-JXljPoItOs");
Mapmyindia.setRestApiKey("db7d087ab67a71109cbc057e694a8319");

class AddressSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      lat: 0,
      lng: 0,
      label: '',
      eLoc:'',
      formattedAddress:''
    };

    console.log('AddressSelection props: '+ props);
  }

  async componentDidMount() {
    this.geoCodeApi('chandigadh');
  }

  geoCodeApi(placeName) {
    // Mapmyindia.atlas_geocode({address: placeName}, response => {
    //   const longitude = response.copResults.longitude;
    //   const latitude = response.copResults.latitude;
    //   const eLoc = response.copResults.eLoc;
    //   this.setState({
    //     // lat: parseFloat(latitude),
    //     // lng: parseFloat(longitude),
    //     // lat: '18.978050',
    //     // lng: '73.106087',
    //     eLoc:eLoc
    //   });
    //   console.log(response);

    //   Toast.show(
    //     `Longitude :${longitude} Latitude :${latitude} Eloc :${eLoc}`,
    //     Toast.LONG,
    //   );
    //   this.setState({
    //     label: response.copResults.formattedAddress,
    //   });
    // });

    // ===========================
    MapmyIndiaGL.RestApi.geocode({address:placeName})
    .then(response => {
    const data = JSON.parse(response);
    console.log("geocode : "+response);
          const eloc = data.results[0].eLoc;
          const formattedAddress=data.results[0].formattedAddress;
                this.setState({
        eLoc:eloc,
        formattedAddress:formattedAddress
      });

    this._getDistanceViaeLoc();
    })
    .catch(error => console.log(error.code,error.message));


  } ;

_getDistanceViaeLoc(){
  console.log(this.state.eLoc);

    MapmyIndiaGL.RestApi.distance({coordinates:['mmi000',this.state.eLoc]}) 
    .then(response => { 
      const data = JSON.parse(response); 
      //       this.setState({
      //   // lat: parseFloat(latitude),
      //   // lng: parseFloat(longitude),
      //   // lat: '18.978050',
      //   // lng: '73.106087',
      // });
      console.log("_getDistanceViaeLoc : "+response);
    
      // this.camera.moveWithEloc(this.state.eLoc, 200)
     this.camera.flyWithEloc(this.state.eLoc,2000)
    }) 
    .catch(error => console.log(error.code,error.message));
  };

  onClick() {
    if (this.state.query.trim().length > 0) {
      // this.setState({
      //   markerLat: this.state.lat,
      //   markerLng: this.state.lng,       
      // });
      this.geoCodeApi(this.state.query);
      Keyboard.dismiss();
      // this.moveCamera(this.state.lng,this.state.lat);
    } else {
      Toast.show('please enter Address');
    }
  }

  onConfirm()
{
  //this.props.changeFromAddress(this.state.formattedAddress);
  // if(formattedAddress){
  //  _storeData('from',this.state.formattedAddress);
   // _storeData(Constant.fromELOC,this.state.fromELOC);
   if(this.props.route.params.flag == 'from'){
    this.props.navigation.navigate('Dashboard',{
      formattedAddress:this.state.formattedAddress,
      flag:'from'

    });
   }else if(this.props.route.params.flag == 'to'){
    this.props.navigation.navigate('Dashboard',{
      formattedAddress:this.state.formattedAddress,
      flag:'to'

    });
   }

    
  // }
  
}

_storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(
      key,
      value
    );
  } catch (error) {
    // Error saving data
  }
};

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 1,
            paddingRight: 1,
          }}>
          <TextInput
            placeholder="Enter address details"
            style={{borderWidth: 1, borderRadius: 4,height:40,padding:10,margin:5,minWidth:200}}
            onChangeText={text =>this.setState({query: text}) }
          />
          <IconButton
    icon="magnify"
    color={Colors.black}
    text='icon'
    size={20}
    onPress={() => this.onClick()}
  />
            <Button title="Confirm" onPress={() => this.onConfirm()} />

        </View>
        <MapmyIndiaGL.MapView style={{flex: 1}}>  
          <MapmyIndiaGL.Camera
            zoomLevel={17}
            ref={c => (this.camera = c)}
            centerELoc={this.state.eLoc}
          />

          <MapmyIndiaGL.PointAnnotation
            id="markerId"
            title="Marker"
            show
            zoomLevel={15}
           eLoc={this.state.eLoc}
          // style={{}}
           centerELoc={this.state.eLoc}
            >
            <MapmyIndiaGL.Callout title={this.state.label} />
          </MapmyIndiaGL.PointAnnotation>
        </MapmyIndiaGL.MapView>
      </View>
    );
  }
}

export default AddressSelection;




























// import { StyleSheet, View,Image ,Text,SafeAreaView,StatusBar,TouchableOpacity,Animated,TextInput} from 'react-native';
// // import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import React, { useEffect,useState,Component } from "react"
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions" 
// import  MapmyIndiaGL  from  'mapmyindia-map-react-native-beta';
// import styles from '../Style/StyleGlobal'
// import PasswordInputText from 'react-native-hide-show-password-input';
// import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
// import Toast from 'react-native-simple-toast';


// MapmyIndiaGL.setMapSDKKey("db7d087ab67a71109cbc057e694a8319");//place your mapsdkKey
// MapmyIndiaGL.setRestAPIKey("db7d087ab67a71109cbc057e694a8319");//your restApiKey
// MapmyIndiaGL.setAtlasClientId("33OkryzDZsLkd_neC1Aj859UKpsG3A1qjGwTvNO-a4nvwJvUKyfduw-8J55guJkndZuc8Z3-pPsHuWi1aWEwzA==");//your atlasClientId key
// MapmyIndiaGL.setAtlasClientSecret("lrFxI-iSEg9VgCF51T7HzlVBBXZ0a_MbxhAbZkVDBLLEOClYsQsYohaM7junOHoJXMOCWHtPcPDwkOe8dR4YG-JXljPoItOs"); //your atlasClientSecret key
// MapmyIndiaGL.setAtlasGrantType("client_credentials");

// Mapmyindia.setClientId("33OkryzDZsLkd_neC1Aj859UKpsG3A1qjGwTvNO-a4nvwJvUKyfduw-8J55guJkndZuc8Z3-pPsHuWi1aWEwzA==");
// Mapmyindia.setClientSecret("lrFxI-iSEg9VgCF51T7HzlVBBXZ0a_MbxhAbZkVDBLLEOClYsQsYohaM7junOHoJXMOCWHtPcPDwkOe8dR4YG-JXljPoItOs");
// Mapmyindia.setRestApiKey("db7d087ab67a71109cbc057e694a8319");


// // const ViewMap = () => {

  
// //     return (
// //       <SafeAreaView style={styles.container}>
// //         <StatusBar barStyle="dark-content" />
        
// //         {/* <MapView
// //           style={styles.map}
// //           provider={PROVIDER_GOOGLE}
// //           initialRegion={{
// //             latitude: 19.566490,
// //             longitude: 74.650520,
// //             latitudeDelta: 0.0922,
// //             longitudeDelta: 0.0421,
// //           }}
// //           showsUserLocation={true} 
// //         /> */}
// //       </SafeAreaView>
// //     )
// //   }
   
  
//   export default class AddressSelection extends React.Component {
//     //   constructor(){
//     //       super(this.props);
//     //   //    this.handleLocationPermission();
//     //   }
//     static navigationOptions = {
//       title: 'Home',
//       headerStyle: {
//         backgroundColor: '#f4511e',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     };
//     state = {
//       searchAdd:'',
//       getLocationPermission:false.valueOf,
//       eloc:''
//     };
//      handleLocationPermission = async () => { 
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
//       this.setState({getLocationPermission:true})
//     };
  
//     // useEffect(() => {
//     //   handleLocationPermission()
//     // }, []);

//     async componentDidMount() {
//        // this.geoCodeApi('lucknow');
//       }
//       geoCodeApi(placeName) {
//         Mapmyindia.atlas_geocode({address: placeName}, response => {
//           const longitude = response.copResults.longitude;
//           const latitude = response.copResults.latitude;
//           const eLoc = response.copResults.eLoc;
//           this.setState({
//             lat: parseFloat(latitude),
//             lng: parseFloat(longitude),
//           });
//           console.log(response);
    
//           Toast.show(
//             `Longitude :${longitude} Latitude :${latitude} Eloc :${eLoc}`,
//             Toast.LONG,
//           );
//           this.setState({
// //            label: response.copResults.formattedAddress,
//             eloc:`${eLoc}`
//           });
//           if(eLoc){
//             Mapmyindia.placeDetails({eloc: 'VBED4P'}, (response) => {

//                 //alert(JSON.stringify(response));
//                 console.log(this.state.eLoc+" : "+ response);
    
                
//                 });
//           }
        
//         });
//       }

//     render() {
//       const { password } = this.state;
//       return (
//         <View style={styles.mainView}>
//           <View style={styles.headerView}>
//             {/* <Text style={styles.smallHeader}>The password must be at least 8 characters in length.Password must be contain at least one letter.</Text> */}
//           </View>
  
//           <View style={{margin:10 }}>
//            <View style={styles.inputView}>
//           <TextInput 
//            placeholder="search your address here!" 
//             placeholderTextColor="#003f5c"
//             borderColor='#000000'
//             multiline
//             onChangeText={text => this.setState({searchAdd:text})}/>
//         </View>
              
//           </View>
//           <TouchableOpacity style={styles.bottomView} 
//           onPress={() => this.geoCodeApi(this.state.searchAdd)}>
//             <Text style={styles.loginText}>SUBMIT</Text>
//           </TouchableOpacity>
  
  
//         </View>
  
  
//       );
//     }
//   }


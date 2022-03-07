import React, { useContext, useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from '../Style/StyleGlobal';
import Constant from '../../utils/Constant';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import RootNavigation from './../../../RootNavigation'
import UserDetailsContext from '../../stateManagement/UserDetailsProvider';
import { Toast } from 'native-base';
import { ActivityIndicator } from 'react-native';
import { _retrieveData, _storeData } from '../../utils/storage';
import CheckBox from '@react-native-community/checkbox';
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import SmsRetriever from 'react-native-sms-retriever';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';


//import AsyncStorageLib from '@react-native-async-storage/async-storage';


export default function LoginScreen (props) {
    const [mobNo,setMobNo]=useState();
   // const {token,setTokentoContext}=useContext(UserDetailsContext);
    const [otpToken,setOtpToken]=useState();
    const [loading,isLoading]=useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [isLogin,setIsLogin]=useState('');

    const [
      currentLongitude,
      setCurrentLongitude
    ] = useState('...');
    const [
      currentLatitude,
      setCurrentLatitude
    ] = useState('...');
    const [
      locationStatus,
      setLocationStatus
    ] = useState('');

   
    // _storeData = async () => {
    //   try {
    //     await AsyncStorage.setItem(
    //       'token',
    //       otpToken
    //     );
    //   } catch (error) {
    //     // Error saving data
    //   }
    // };
   function nagivateNext(){
    const reg = /^[0]?[789]\d{9}$/;
    if (reg.test(mobNo) === false) {

      alert("Enter valid Details!");
         
          }else{ 
            if(toggleCheckBox){
            isLoading(true);
   
            axios.post('https://stgapi.opoli.in/user/login', 
            {'mobilenumber':mobNo},
            {'Content-type': 'Application/json',
            Accept: 'Application/json',
          })
              .then(function(response) { 
                isLoading(false);   
              console.log(response);
              if(response.status === 200){
                
              //  const LOGIN_TOKEN=response.data.token;
             //setTokentoContext(response.data.token);
             //var token=response.data.token;
             setOtpToken(response.data.token);
             _storeData(Constant.token,response.data.token);
            // setOtpToken(response.data.token);
              console.log('response.data.token : '+response.data.token);
            
            //  var token=AsyncStorage.getItem('token');
            if(response.data.token){
              props.navigation.navigate('OTP',{
                mobNo:mobNo,
                lat:currentLatitude,
                long:currentLongitude
              });
            }else{
              alert('OTP not sent!')
            }
        
             
              }else{
                console.log('error',response);
                isLoading(false);
              }
              
              })
              
              .catch(function(error) {
              
              console.log(error);
              isLoading(false);
              
              }); 
        
          }
          else{
            alert("Please accept terms & conditions.")
          }
        
 
     
     
    }
  }

  useEffect(() => {
//    _retrieveData(Constant.isLogin).then((data)=>{
// console.log(data);
//     })
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };

    
  }, []);

//  const revGeoCodeApi = (latitude, longitude) =>{
//    console.log("revGeoCodeApi : "+latitude);
//     Mapmyindia.rev_geocode({lat: latitude, lng: longitude}, response => {
//       if(response===null){
//         alert('add not found');
//       }else{
//       console.log("revGeoCodeApi response"+JSON.stringify( response));
//     //  Toast.show(response.results[0].formatted_address, Toast.SHORT);
//       let add=response.results[0].formatted_address;
//       if(add){
//         setAddress(response.results[0].formatted_address);
// }
//       }
     
//     });
//   }

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
        console.log('Position : ' + JSON.stringify(position));
        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);
          _storeData(Constant.longitude,currentLongitude);

          _storeData(Constant.lat,currentLatitude)

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);

         
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  _onPhoneNumberPressed = async () => {
    // try {
    //   const phoneNumber = await SmsRetriever.requestPhoneNumber();
    //   console.log(phoneNumber);
    //   setMobNo(phoneNumber);
    // } catch (error) {
    //   console.log(JSON.stringify(error));
    // }
   };
    return (
<View style={styles.mainView}>
    
      
      <View style={styles.headerView}>
    <Text style={styles.mainHeader}>Enter your phone</Text>
 <Text style={styles.smallHeader}>You will receive SMS on this number</Text>
    </View>

        <View style={styles.inputView}>
            <Text style={{ fontSize:25 ,marginTop:6 ,color:'#000000'}}>+91</Text>
          <TextInput 
          style={styles.inputText}           
            placeholder="xxxxxxxxxx" 
            placeholderTextColor="#003f5c"
            borderColor='#000000'
            keyboardType='number-pad'
            maxLength={10}
            returnKeyLabel='Done' 
            returnKeyType='done' 
            onFocus={() => _onPhoneNumberPressed()}            
            onChangeText={text => setMobNo(text)}/>
        </View>
<View style={{flexDirection:'row',alignContent:'center',marginTop:5,marginLeft:10}}>
<CheckBox
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
    style={{marginTop:5}}
  />
        <Text style={styles.smallHeader}>I approve to the Terms and conditions</Text>
 
</View>
      
        <View>
        {loading && <ActivityIndicator color={"#000000"} />}
      </View>
       <TouchableOpacity style={styles.bottomView}  
       onPress={() => 
       nagivateNext()}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        
      </View>
     
      
    );
  
}

import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Style/StyleGlobal';
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import { Toast } from 'native-base';
import axios from 'axios';
import { _storeData } from '../../utils/storage';
import Constant from '../../utils/Constant';
import { PermissionsAndroid } from 'react-native';




export default function WhatsYourName(props) {
  const [FName, setFName] = useState();
  const [LName, setLName] = useState();
  const [email, setemail] = useState();
  const [city, setCity] = useState('chandigarh');

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

  useEffect(() => {
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

  function _handleonclick() {
    var res = getCurrentCity(currentLatitude, currentLongitude).then((data) => {
      console.log(data);


    });
    console.log(res);
    SignUpReq();

  };
  function SignUpReq() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (FName == '' || LName == '' || email == '') {
      alert('Please Mention the details.')
    } else if (reg.test(email.trim()) === false) {
      alert("Please Enter valid Email..");
    } else {

      var body = {
        "firstname": FName,
        "lastname": LName,
        "mobilenumber": "7666688829",
        "email": email,
        "password": "121212",
        "fcmtoken": "xysnsas",
        "lat": currentLatitude,
        "long": currentLongitude,
        "city": city,
        "country": "India",
        "Device_lang": "EN",
        "deviceid": DeviceInfo.getUniqueId(),
        "deviceMake": DeviceInfo.getBrand(),
        "deviceModel": DeviceInfo.getModel(),
        "appversion": "1.0.1"
      };
      console.log('body : ' + JSON.stringify(body));
      axios.post('https://stgapi.opoli.in/user/register',
        body
        , {
          'Content-Type': 'application/json',
          //   'Accept': 'application/json',

        })
        .then(function (response) {
          console.log('res : ' + JSON.stringify(response));
          if (response.status === 200) {
            props.navigation.navigate('Dashboard', {});
            _storeData(Constant.isLogin, true);

          }
          else {
            alert('something error');
            console.log('Whats your name : Error');
          }
        }).catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    }
  }

  const getCurrentCity = async (lat, long) => {
    console.log(lat, long);
    return await axios.get(
      // 'https://apis.mapmyindia.com/advancedmaps/v1/db7d087ab67a71109cbc057e694a8319/rev_geocode?' +
      // 'lat=' + '37.785834' +
      // '&lng=' + '-122.406417'
      'https://apis.mapmyindia.com/advancedmaps/v1/db7d087ab67a71109cbc057e694a8319/rev_geocode?lat=18.9820995&lng=73.0996627'
    )
      .then(function (response) {
        console.log('response : ' + JSON.stringify(response));
        // if (response.responseCode = '200') {
        //   setCity(response.data.results[0].city);
        // } else {
        //   alert('error')
        // }


      })

      .catch(function (error) {

        console.log(error);

      });
  }
  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={styles.mainHeader}>Whats your name?</Text>
        <Text style={styles.smallHeader}>Knowing your name will help couriers contact or find you quicker.</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          borderColor='#000000'
          returnKeyLabel='Done'
          returnKeyType='done'
          maxLength={10}
          placeholder='First name*'
          onChangeText={text => setFName(text)} />


      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          // placeholder="xxxxxxxxxx" 
          placeholderTextColor="#003f5c"
          borderColor='#000000'
          returnKeyLabel='Done'
          returnKeyType='done'
          maxLength={10}
          placeholder='Last name*'
          onChangeText={text => setLName(text)} />


      </View>

      <View style={styles.inputView}>
        {/* <Text style={{ fontSize:25 ,marginTop:6 ,color:'#000000'}}>+91</Text> */}
        <TextInput
          style={styles.inputText}
          // placeholder="xxxxxxxxxx" 
          placeholderTextColor="#003f5c"
          borderColor='#000000'
          returnKeyLabel='Done'
          returnKeyType='done'
          maxLength={50}
          placeholder='Email*'
          keyboardType='email-address'
          enablesReturnKeyAutomatically='false'
          onChangeText={text => setemail(text)} />


      </View>
      {/* <Text style={styles.smallHeader}>By processing ,I approve to the Terms &#38; conditions</Text> */}
      <TouchableOpacity style={styles.bottomView} onPress={() =>
        _handleonclick()
      }>
        <Text style={styles.loginText}>SUBMIT</Text>
      </TouchableOpacity>


    </View>


  );

}

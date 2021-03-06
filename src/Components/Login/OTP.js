import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import SetPassword from './SetPassword';
import OtpInputs from '../Layouts/OtpInputs';
//import { Card } from 'react-native-paper';
import OTPTextView from 'react-native-otp-textinput';
import styles from '../Style/StyleGlobal';
import axios from "axios";
import { Toast } from 'native-base';
import { _retrieveData } from '../../utils/storage';
import Constant from '../../utils/Constant';
import { blue50 } from 'react-native-paper/lib/typescript/styles/colors';


export default function OTP(props) {
  console.log('otp props ' + JSON.stringify(props.route.params));

  const [mobNo, setMobNo] = useState(props.route.params.mobNo);
  const [otp, setotp] = useState('');
  const [isEntered, setisEntered] = useState(false);
  const [token, setMytoken] = useState('');
  const [loading, isLoading] = useState(false);
  const [lat,setLat]=useState(props.route.params.lat);
  const [long,setLong]=useState(props.route.params.long);

  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('token');

  //     if (value !== null) {
  //       // We have data!!
  //       setMytoken(value);
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
  function getOtp(otp) {
    console.log(otp);
    setotp(otp);
  };

  function _handleOTPClick() {
    _retrieveData(Constant.token).then((data) => {
      setMytoken(data);
      console.log('token : ' + data);
      _VerifyOTP(data);
    });


  };
  function _VerifyOTP(token) {
    if (isEntered) {
      let config = {
        headers: {
          'Authorization':token,
        }
      }
      let body={ otp: otp };
      axios.post('https://stgapi.opoli.in/user/verifyotp',
      body, config)
      .then(function (response) {
        isLoading(false);
        console.log(response);
        if (response.status === 200) {
         

          props.navigation.navigate('WhatsYourName', {
            mobNo: mobNo,
            lat:lat,
            long:long
          });
        } else {
          console.log('error', response);
          isLoading(false);
          alert('Invalid OTP');
        }

      })

      .catch(function (error) {
//alert(error);
        console.log(error);

      });



      // let config = {
      //   headers: {
      //     Authorization: token,
      //   //   "Content-Type": "application/x-www-form-urlencoded", 
      //   //  Accept: "application/json",
      //   //  "Access-Control-Allow-Origin" : "*",

      //   }
      // };
      // console.log('token : ' + token + " " + JSON.stringify(config) + 'body : '+otp);
      // isLoading(true);
      // axios.post('https://stgapi.opoli.in/user/verifyotp',
      //   { "otp": otp }, {
      //   config
      // })
      //   .then(response => {
      //     console.log(response);
      //     isLoading(false);
      //     if (response.status === 200) {

      //       //  const LOGIN_TOKEN=response.data.token;
      //       console.log("Status : " + response.status);
      //       Toast.show(
      //         'OTP verified successfully!',
      //         Toast.LONG,
      //       );
      //       // await AsyncStorage.setItem('toklen',response.data.token);
      //       props.navigation.navigate('TellUsAboutYourself', {
      //         city: city,
      //         mobNo: mobNo
      //       });

      //     } else {
      //       console.log('error', response);
      //       isLoading(false);
      //       alert(error);
      //     }

      //   })

      //   .catch(error => {

      //     console.log(error);
      //     isLoading(false);
      //     alert(error);

      //   });


      //this.props.navigation.navigate('TellUsAboutYourself',this.state);
    }
  }
  function ResendOTP() {
    axios.post('https://stgapi.opoli.in/user/login', 
    {'mobilenumber':mobNo},{'Content-type': 'Application/json',
    Accept: 'Application/json',})
      .then(function(response) { 
        isLoading(false);   
      console.log(response);
      if(response.status === 200){
      setotp('');

     alert("OTP sent on "+mobNo);
    
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
  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={styles.mainHeader}>Enter code</Text>
        <Text style={styles.smallHeader}>We sent code to {mobNo} </Text>
      </View>

      <OTPTextView
        handleTextChange={(e) => {
          if (e.length === 6) {
            setotp(e);
            console.log("OTP input " + e)
            setisEntered(true);

          }
        }}
        containerStyle={styles.otpInputContainer}
        textInputStyle={styles.roundedOtpInput}
        inputCount={6}
        returnKeyType='done'
      />

      <Text style={{textAlign:'right',marginRight:15 ,color:'#0000ff'}} onPress={()=>ResendOTP()}>Resend OTP</Text>
      {loading && <ActivityIndicator color={"#000000"} />}



      <TouchableOpacity style={styles.bottomView} onPress={() =>

        _handleOTPClick()
      }>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>


    </View>


  );

}

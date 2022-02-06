import React ,{useState}from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import SetPassword from './SetPassword';
import OtpInputs from '../Layouts/OtpInputs';
//import { Card } from 'react-native-paper';
import OTPTextView from 'react-native-otp-textinput';
import styles from '../Style/StyleGlobal';
import axios from "axios";


export default function OTP(props){
  console.log('otp props '+props.route.params);
  
  const [mobNo,setMobNo]=useState(props.route.params.mobNo);
  const [otp,setotp]=useState();
  const [isEntered,setisEntered]=useState(false);
  

 function getOtp(otp) {
       console.log(otp);
      setotp(otp);
 };

 function handleOTPClick(){
     if(isEntered){
   
     // this.props.navigation.navigate('TellUsAboutYourself',this.state);
    }

  };
   
    return (
<View style={styles.mainView}>
    <View style={styles.headerView}>
    <Text style={styles.mainHeader}>Enter code</Text>
 <Text style={styles.smallHeader}>We sent code to {mobNo} </Text>
    </View>

    <OTPTextView
          handleTextChange={(e) => {
            setotp(e)
        console.log("OTP input" + e)
      setotp(true)}}
          containerStyle={styles.otpInputContainer}
          textInputStyle={styles.roundedOtpInput}
          defaultValue="123456"
          inputCount={6}
          returnKeyType='done' 
        />
       <TouchableOpacity style={styles.bottomView} onPress={() =>
         
    handleOTPClick()
         }>
          <Text  style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

      
      </View> 
     
      
    );
  
}

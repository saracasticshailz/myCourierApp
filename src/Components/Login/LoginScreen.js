import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from '../Style/StyleGlobal';
import Constant from '../../utils/Constant';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import RootNavigation from './../../../RootNavigation'
import UserDetailsContext from '../../stateManagement/UserDetailsProvider';
import { Toast } from 'native-base';
import { ActivityIndicator } from 'react-native';
import { _storeData } from '../../utils/storage';
//import AsyncStorageLib from '@react-native-async-storage/async-storage';




export default function LoginScreen (props) {

    console.log(props)
    const [city,setCity]=useState(props.route.params.city);
    const [mobNo,setMobNo]=useState();
   // const {token,setTokentoContext}=useContext(UserDetailsContext);
    const [otpToken,setOtpToken]=useState();
    const [loading,isLoading]=useState(false);
   
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
   if(mobNo){
     isLoading(true);
   
    axios.post('https://stgapi.opoli.in/user/login', 
    {'mobilenumber':mobNo},{'Content-type': 'Application/json',
    Accept: 'Application/json',})
      .then(function(response) { 
        isLoading(false);   
      console.log(response);
      if(response.status === 200){
        
      //  const LOGIN_TOKEN=response.data.token;
      console.log("200"+ response.status.token);
     //setTokentoContext(response.data.token);
     //var token=response.data.token;
     setOtpToken(response.data.token);
     _storeData(Constant.token,response.data.token);
    // setOtpToken(response.data.token);
      console.log('response.data.token : '+response.data.token);
    
    //  var token=AsyncStorage.getItem('token');

      props.navigation.navigate('OTP',{
        city:city,  
        mobNo:mobNo
      });
      }else{
        console.log('error',response);
        isLoading(false);
      }
      
      })
      
      .catch(function(error) {
      
      console.log(error);
      isLoading(false);
      
      }); 


         
          }else{
            alert("Enter valid Details!")
          }
        
 
     
     
    }
  
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
          //  onSubmitEditing={() => this.nagivateNext()}
            onChangeText={text => setMobNo(text)}/>
        </View>


        <Text style={styles.smallHeader}>By processing ,I approve to the Terms and conditions</Text>
       
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

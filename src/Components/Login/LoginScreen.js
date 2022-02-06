import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Style/StyleGlobal';
import Constant from '../../utils/Constant';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import RootNavigation from './../../../RootNavigation'


export default function LoginScreen (props) {

    console.log(props)
    const [city,setCity]=useState(props.route.params.city);
    const [mobNo,setMobNo]=useState();
   

   function nagivateNext(){
   if(mobNo){
   
    axios.post('https://stgapi.opoli.in/user/login', {'mobilenumber':'7666688829'},{})
      .then(function(response) {
      
      console.log(response);
      if(response.status === 200){
      //  const LOGIN_TOKEN=response.data.token;
      console.log("200"+ response.status);
      props.navigation.navigate('OTP',{
        city:city,
        mobNo:mobNo
      });
    //  RootNavigation.navigate('OTP',{
    //    city:city,
    //    mobNo:mobNo
    //  });
    //navigation.navigate('OTP',this.state)
      }else{
        console.log('error',response);
      }
      
      })
      
      .catch(function(error) {
      
      console.log(error);
      
      }); 


         
          };
 
     
     
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
       <TouchableOpacity style={styles.bottomView}  
       onPress={() => 
       nagivateNext()}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        
      </View>
     
      
    );
  
}

// const styles = StyleSheet.create({
//     mainView:{
//     flex:1,
//     },

//   container: {
//     flexDirection: 'column', 
//     flexGrow: 1,
//     backgroundColor: '#ffffff',   
//     justifyContent: 'flex-end',
//   },
//   logo:{
//     fontWeight:"bold",
//     fontSize:50,
//     color:"#fb5b5a",
//     marginBottom:40
//   },
//   headerView:{
// marginLeft:15,
// marginTop:25
//   },
//   smallHeader:{
//     fontSize:15,
//     color:'#000000',
//     marginLeft:15,
//     marginTop:10
//    // marginLeft:'10'
 
//   },
//   mainHeader:{
//     fontWeight:"bold",
//     fontSize:30,
//     color:"#000000",
//     marginTop:20,
    
//   },
//   inputView:{
//    flexDirection:'row',
//     marginTop:20,
//     padding:10,
//     fontSize:25,
//     borderColor:'#d3d3d3',
//     borderWidth:5,
//     borderRadius:10,
//     marginLeft:15,
//     marginRight:15
 
//   },
//   inputText:{
//     height:50,
//     color:"#000000",
//     fontSize:25,
  
    
//   },
//   forgot:{
//     color:"white",
//     fontSize:11
//   },
//   loginBtn:{
//     width:"100%",
//     backgroundColor:"#0000FF",
//     borderRadius:25,
//     height:50,
//     alignItems:"center",
//     justifyContent:"center",
//     marginTop:40,
//     marginBottom:10 
//   },
//   loginText:{
//     color:"white"
//   },
//   bottomView: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#EE5407',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute', 
//     bottom: 0, 
//   }
// })
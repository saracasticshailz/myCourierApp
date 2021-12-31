import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import SetPassword from './SetPassword';
import OtpInputs from '../Layouts/OtpInputs';
//import { Card } from 'react-native-paper';
import OTPTextView from 'react-native-otp-textinput';
import styles from '../Style/StyleGlobal';

export default class OTP extends React.Component {
  

  state={
    mobNO:this.props.route.params.mobNO,
    otp:'',
    isEntered:false
  };

  getOtp(otp) {
       console.log(otp);
       this.setState({ otp });
 }

  handleOTPClick=()=>{
    this.setState({isEntered:true});
    if(this.state.isEntered){
      this.props.navigation.navigate('SetPassword');
    }

  }
  render(){
   // this.setState({mobNO:this.props.route.params.mobNO})
   
    return (
<View style={styles.mainView}>
    <View style={styles.headerView}>
    <Text style={styles.mainHeader}>Enter code</Text>
 <Text style={styles.smallHeader}>We sent code to {this.state.mobNO} </Text>
    </View>

    <OTPTextView
          handleTextChange={(e) => {}}
          containerStyle={styles.otpInputContainer}
          textInputStyle={styles.roundedOtpInput}
          defaultValue="1234"
        />

        {/* <View style={styles.inputView}>
        
          <TextInput 
          style={styles.inputText}           
            placeholder="" 
            placeholderTextColor="#003f5c"
            borderColor='#000000'
            multiline
            keyboardType='number-pad'
            maxLength={10}
            onChangeText={text => this.setState({myOTP:text})}/>
        </View> */}


       <TouchableOpacity style={styles.bottomView} onPress={ 
         
        this.handleOTPClick
        
         
         }>
          <Text  style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

      
      </View> 
     
      
    );
  }
}

// const styles = StyleSheet.create({
//   textInputContainer: {
//     marginBottom: 20,
//   //  width:70,
//    // justifyContent: 'flex-start',
//   //  flexDirection:'row',
//   margin:50
   
    
//   },  
//   roundedTextInput: {
//     borderRadius: 10,
//     borderWidth: 4,
//   },
//   container1: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop:20,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//     mainView:{
// flex:1,
// flexDirection:'column',
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
//  color:'#000000'
//   },
//   mainHeader:{
//     fontWeight:"bold",
//     fontSize:30,
//     color:"#000000",
//     marginTop:20,
    
//   },
//   inputView:{
//    flexDirection:'row',
//     marginTop:25,
//     padding:10,
//     fontSize:25,
//     borderColor:'#d3d3d3',
//     borderWidth:5,
//     borderRadius:10,
//     marginLeft:25,
//     marginRight:25
 
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
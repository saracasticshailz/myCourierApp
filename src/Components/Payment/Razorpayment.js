import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,TouchableHighlight 
,NativeModules, NativeEventEmitter} from 'react-native';
import styles from '../Style/StyleGlobal';
import RazorpayCheckout from 'react-native-razorpay';

export default class Razorpayment extends React.Component {
  
    _onPressRazorButton() {
        var options = {
            description: 'Test Account',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_OTST50hkKqPLRt',
            amount: '5000',
            name: 'RunnerSingh',
            prefill: {
              email: 'shailesh@opoli.com',
              contact: '7666688829',
              name: 'Razorpay Software'
            },
            theme: {color: '#0000FF'}
          }
            RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
          }

          __onPressPaytmButton(){

          }
//   state={
//     mobNO:this.props.route.params.mobNO,
//     otp:'',
//     isEntered:false
//   };

//   getOtp(otp) {
//        console.log(otp);
//        this.setState({ otp });
//  }

//   handleOTPClick=()=>{
//     this.setState({isEntered:true});
//     if(this.state.isEntered){
//       this.props.navigation.navigate('SetPassword');
//     }

//   }
  render(){
   // this.setState({mobNO:this.props.route.params.mobNO})
   this._onPressRazorButton();
    return (
        <View 
        style={styles.mainView}
        >
            <View>
            <TouchableOpacity style={styles.bottomView} 
        onPress={() => this._onPressPaytmButton()}>
          <Text style={styles.loginText}>PAYTM</Text>
        </TouchableOpacity>
        </View>        

        <TouchableOpacity style={styles.bottomView} 
        onPress={() => this._onPressRazorButton()}>
          <Text style={styles.loginText}>SUBMIT</Text>
        </TouchableOpacity>
 {/* <TouchableHighlight onPress={() => {
            var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_G9jEe7A6sk25xn',
            amount: '5000',
            name: 'Acme Corp',
            order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
            prefill: {
              email: 'gaurav.kumar@example.com',
              contact: '9191919191',
              name: 'Gaurav Kumar'
            },
            theme: {color: '#53a20e'}
          }
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
        }}>
            <Text>shailesh</Text>
        </TouchableHighlight> */}
        </View>
       
     
      
    );
  }
}


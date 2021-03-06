import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Animated } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import styles from '../Style/StyleGlobal'


export default class SetPassword extends React.Component {

  state = {
    password: "",
    isPasswordEntered:false
  }
  render() {
    const { password } = this.state;
    return (
      <View style={styles.mainView}>
        <View style={styles.headerView}>
          <Text style={styles.mainHeader}>Set a password</Text>
          <Text style={styles.smallHeader}>The password must be at least 8 characters in length.Password must be contain at least one letter.</Text>
        </View>

        <View style={{margin:10 }}>

<PasswordInputText
          getRef={input => this.input = input}
          value={password}
          onChangeText={(password) => this.setState({ password })}
        />
            
        </View>
        <TouchableOpacity style={styles.bottomView} 
        onPress={() => this.props.navigation.navigate('TellUsAboutYourself', {
          mobNO: this.state.password
        })}>
          <Text style={styles.loginText}>SUBMIT</Text>
        </TouchableOpacity>


      </View>


    );
  }
}

// const styles = StyleSheet.create({
  
//   mainView: {
//     flex: 1,
//   },

//   container: {
//     flexDirection: 'column',
//     flexGrow: 1,
//     backgroundColor: '#ffffff',
//     justifyContent: 'flex-end',
//   },
//   logo: {
//     fontWeight: "bold",
//     fontSize: 50,
//     color: "#fb5b5a",
//     marginBottom: 40
//   },
//   headerView: {
//     marginLeft: 15,
//     marginTop: 25
//   },
//   smallHeader: {
//     fontSize: 15,

//   },
//   mainHeader: {
//     fontWeight: "bold",
//     fontSize: 30,
//     color: "#000000",
//     marginTop: 20,

//   },
//   inputView: {
//     flexDirection: 'row',
//     marginTop: 25,
//     padding: 10,
//     fontSize: 25,
//     borderColor: '#d3d3d3',
//     borderWidth: 5,
//     borderRadius: 10,
//     marginLeft: 15,
//     marginRight: 15

//   },
//   inputText: {
//     height: 50,
//     color: "#000000",
//     fontSize: 25,


//   },
//   forgot: {
//     color: "white",
//     fontSize: 11
//   },
//   loginBtn: {
//     width: "100%",
//     backgroundColor: "#0000FF",
//     borderRadius: 25,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 40,
//     marginBottom: 10
//   },
//   loginText: {
//     color: "white"
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
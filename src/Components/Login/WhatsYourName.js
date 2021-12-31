import React from 'react';
import {  Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Style/StyleGlobal';
export default class WhatsYourName extends React.Component {
  state={
    Name:"",
  
  }
  render(){
    return (
<View style={styles.mainView}>
    <View style={styles.headerView}>
    <Text style={styles.mainHeader}>Whats your name?</Text>
 <Text style={styles.smallHeader}>Knowing your name will help couriers contact or find you quicker.</Text>
    </View>

        <View style={styles.inputView}>
            {/* <Text style={{ fontSize:25 ,marginTop:6 ,color:'#000000'}}>+91</Text> */}
          <TextInput 
          style={styles.inputText}           
           // placeholder="xxxxxxxxxx" 
            placeholderTextColor="#003f5c"
            borderColor='#000000'
            multiline
            
            maxLength={10}
            onChangeText={text => this.setState({mobileNo:text})}/>
        </View>
        <Text style={styles.smallHeader}>By processing ,I approve to the Terms &#38; conditions</Text>
       <TouchableOpacity style={styles.bottomView}  onPress={() => this.props.navigation.navigate('Dashboard',{
         mobNO:this.state.mobileNo 
       })}>
          <Text style={styles.loginText}>SUBMIT</Text>
        </TouchableOpacity>

        
      </View>
     
      
    );
  }
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
//     marginTop:15
 
//   },
//   underline: {textDecorationLine: 'underline',color:'#000000'},
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
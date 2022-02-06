import React ,{useState}from 'react';
import {  Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Style/StyleGlobal';
export default function WhatsYourName(props) {
  const [Name ,setName]=useState();
 
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
            returnKeyLabel='Done' 
            returnKeyType='done' 
            keyboardType='name'
            maxLength={10}
            onChangeText={text =>setName(text)}/>
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

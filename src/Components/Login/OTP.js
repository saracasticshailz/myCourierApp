import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import SetPassword from './SetPassword';
export default class OTP extends React.Component {
  

  state={
    mobNO:this.props.route.params.mobNO
  }
  render(){
   // this.setState({mobNO:this.props.route.params.mobNO})
   
    return (
<View style={styles.mainView}>
    <View style={styles.headerView}>
    <Text style={styles.mainHeader}>Enter code</Text>
 <Text style={styles.smallHeader}>We sent code to {this.state.mobNO} </Text>
    </View>

        <View style={styles.inputView}>
        
          <TextInput 
          style={styles.inputText}           
            placeholder="" 
            placeholderTextColor="#003f5c"
            borderColor='#000000'
            multiline
            keyboardType='number-pad'
            maxLength={10}
            onChangeText={text => this.setState({email:text})}/>
        </View>
       <TouchableOpacity style={styles.bottomView} onPress={ 
         alert('myalert')

        //  if(as==1){
        //   this.props.navigation.navigate('SetPassword');
        //  }
        
         
         }>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        
      </View>
     
      
    );
  }
}

const styles = StyleSheet.create({
    mainView:{
flex:1,
    },

  container: {
    flexDirection: 'column', 
    flexGrow: 1,
    backgroundColor: '#ffffff',   
    justifyContent: 'flex-end',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  headerView:{
marginLeft:15,
marginTop:25
  },
  smallHeader:{
    fontSize:15,
 
  },
  mainHeader:{
    fontWeight:"bold",
    fontSize:30,
    color:"#000000",
    marginTop:20,
    
  },
  inputView:{
   flexDirection:'row',
    marginTop:25,
    padding:10,
    fontSize:25,
    borderColor:'#d3d3d3',
    borderWidth:5,
    borderRadius:10,
    marginLeft:25,
    marginRight:25
 
  },
  inputText:{
    height:50,
    color:"#000000",
    fontSize:25,
  
    
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"100%",
    backgroundColor:"#0000FF",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10 
  },
  loginText:{
    color:"white"
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 0, 
  }
})
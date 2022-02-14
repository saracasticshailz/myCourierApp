

import React,{useState,useEffect} from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, TextInput,
BackHandler,AsyncStorage } from 'react-native';
import Card from '../Layouts/Card';
import styles from '../Style/StyleGlobal';
import AddressSelection from '../Map/AddressSelection'
import { _retrieveData } from '../../utils/storage';
import Constant from '../../utils/Constant';



export default function Dashboard(props) {
  const dataArray = [{
    cardTitle: 'Deliver Now',
    fromCost: 44,
    process_id: '001',
    imageuri: require('../../assets/clock.png')
  },
  {
    cardTitle: 'Schedule',
    fromCost: 20,
    process_id: '002',
    imageuri: require('../../assets/time.png')
  }, {
    cardTitle: '4-hour Interval',
    fromCost: 60,
    process_id: '003',
    imageuri: require('../../assets/interval.png')
  }];

  const [myArray, setdataArray] = React.useState(dataArray);
  const [fromAdd,setFromAdd]=React.useState();
  const [toAdd,settoAdd]=React.useState();
  const [fromEloc,setfromEloc]=React.useState();
  const [toEloc,settoEloc]=React.useState();
 
 
  // useEffect(() => {
  //   if(!fromAdd){
  //     setFromAdd(_retrieveData(Constant.fromAdd));
  //   }
  // },[fromAdd]);

  function _handleMapClick(){
    if(dataArray){
     props. navigation.navigate('AddressSelection',{
       myData:'myadata',
       flag:'from'
      // changeFromAddress:this.changeFromAddress.bind(this)
      });
    }
    
  };

  function _handleToMapClick(){
   // if(dataArray){
     props. navigation.navigate('AddressSelection',{
       myData:'myadata',
       flag:'to'
      // changeFromAddress:this.changeFromAddress.bind(this)
      });
  //  }
    
  };
  function _handleBookCourier(params) {
    alert('alert');
  }

  function _handleRazorPayClick(){
    props.navigation.navigate('Razorpayment',{});
  }

  function changeFromAddress(param) {
    setFromAdd(param);
  }

  useEffect(() => {
    console.log('selectedAdd on Dashboard :'+ JSON.stringify( props));
    //const selectedAdd=_retrieveData(Constant.fromAdd)
    //if(props.route.params.name){
      
      if(props.route.params.flag == 'from'){
        // _retrieveData('from').then((data)=>{
        //   console.log('data : '+JSON.stringify( data));
        // });
        let selectedAdd=props.route.params.formattedAddress;
        console.log('selectedAdd from: '+JSON.stringify( selectedAdd));
        setFromAdd(selectedAdd);
      }
      if(props.route.params.flag == 'to'){
        
        let selectedAdd=props.route.params.formattedAddress;
        console.log('selectedAdd to: '+JSON.stringify( selectedAdd));
        settoAdd(selectedAdd);
      }
      
  //   };
    
    
   
    //setFromAdd('selectedAdd');
  //   // const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
  //   // return () => backHandler.remove()

  //   props.navigation.addListener('beforeRemove', (e) => {
  //     e.preventDefault();
  // });
  }
  //, [props.navigation]
  );
  return (

    
<View>
<View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>Dashboard Screen</Text> */}
      <ScrollView
        scrollEnabled={true}>
        <FlatList
   //   style={{flex:1}}       
          horizontal
          data={myArray}
          renderItem={(item) => {
            return (
              <Card dataArray={item.item}></Card>
              )
          }
          }
          keyExtractor={item => item.process_id}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />

        <Text style={styles.normalText}>We will assign the nearest courier to pick-up and deliver as soon as possible</Text>
      </ScrollView>


      <View style={{ flexDirection: 'row', justifyContent: "space-between", }}>
        <View style={styles.buttonStyle}>
          <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={()=>_handleBookCourier()}>
            <Text style={styles.btnText}  >
              Book a courier &#10140;
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonStyle}>
          <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 50, right: 50 }}
           onPress={() =>  
            _handleRazorPayClick()
            }>
            <Text style={styles.btnText}>
              Razorpayment &#10140;
            </Text>
          </TouchableOpacity>
        </View>

      </View>
     
    </View>


    <View style={styles.underlineTextContainer}>
        <Text style={styles.mainHeader}>Pickup Point</Text>

        <TouchableOpacity style={styles.btn} 
        
        onPress={() =>  
          _handleMapClick()
          }
        ><Text style={{margin:15,color:'#000000'}}>From:{fromAdd}</Text></TouchableOpacity>

      </View>

      <View style={styles.underlineTextContainer}>
       
      <Text style={styles.mainHeader}>Delivery Point</Text>
        <TouchableOpacity style={styles.btn} 
        onPress={() =>  
          _handleToMapClick()
          }
        ><Text style={{margin:15,color:'#000000'}}>To:{toAdd}</Text></TouchableOpacity>

      </View>
</View>
  
  );
}

// const Styles = StyleSheet.create({
//   buttonStyle: {
//     width: '50%',
//     marginTop: 12,
//     backgroundColor: "#d3d3d3",
//     padding: 15,
//     borderRadius: 50,
//     // marginRight:5,
//     // marginLeft:15
//     justifyContent: "space-between",
//     textAlign: 'center',
//     alignContent: 'space-between',
//     alignItems: 'center'
//   },
//   btnText: {
//     color: "#000000",
//     fontSize: 16,
//     justifyContent: "space-between",
//     textAlign: "center",
//   },
//   textStyle: {
//     fontSize: 16
//   },
//   btn: {
//     alignSelf: 'stretch',
//     backgroundColor: '#01c853',
//     padding: 10,
//     margin: 10,
//     marginLeft: 100,
//     marginRight: 100,
//     alignItems: 'center',
//   }
// });
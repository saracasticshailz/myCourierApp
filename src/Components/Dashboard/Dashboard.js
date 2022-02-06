

import * as React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Card from '../Layouts/Card';
import styles from '../Style/StyleGlobal';
import AddressSelection from '../Map/AddressSelection'



export default function Dashboard({navigation}) {
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

  //setdataArray([...myArray,dataArray]);
  function _handleMapClick(){
    if(dataArray){
      navigation.navigate('AddressSelection',{myData:'myadata'});
    }
    
  };

  function _handleRazorPayClick(){
    navigation.navigate('Razorpayment',{});
  }
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
          <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
            <Text style={styles.btnText}>
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
        <Text style={styles.mainHeader}> Pickup Point</Text>

        <TouchableOpacity style={styles.btn} 
        onPress={() =>  
          _handleMapClick()
          }
        ><Text style={{margin:15,color:'#000000'}}>From</Text></TouchableOpacity>

      </View>

      <View style={styles.underlineTextContainer}>
       

        <TouchableOpacity style={styles.btn} 
        onPress={() =>  
          _handleMapClick()
          }
        ><Text style={{margin:15,color:'#000000'}}>To</Text></TouchableOpacity>

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
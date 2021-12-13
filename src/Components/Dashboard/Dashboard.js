

import * as React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Card from '../Layouts/Card';



export default function Dashboard() {
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

  return (

    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>Dashboard Screen</Text> */}
      <ScrollView
        scrollEnabled={true}>
        <FlatList
          // style={{flex:1}}
          horizontal
          data={myArray}
          renderItem={(item) => {
            return (
              <Card dataArray={item.item}></Card>)
          }
          }
          keyExtractor={item => item.process_id}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />

        <Text>We will assign the nearest courier to pick-up and deliver as soon as possible</Text>
      </ScrollView>


      <View style={{ flexDirection: 'row', justifyContent: "space-between", }}>
        <View style={Styles.buttonStyle}>
          <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
            <Text style={Styles.btnText}>
              Book a courier &#10140;
            </Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.buttonStyle}>
          <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 50, right: 50 }}>
            <Text style={Styles.btnText}>
              Up to 1kg &#10140;
            </Text>
          </TouchableOpacity>
        </View>

      </View>
      <View>
        <Text style={{ fontWeight: 'bold', margin: 10 }}>Pickup Point</Text>

        <TouchableOpacity s
        tyle={Styles.btn} 
        //onPress={this.login}
        ><Text>Address</Text></TouchableOpacity>

      </View>



    </View>
  );
}

const Styles = StyleSheet.create({
  buttonStyle: {
    width: '50%',
    marginTop: 12,
    backgroundColor: "#d3d3d3",
    padding: 15,
    borderRadius: 50,
    // marginRight:5,
    // marginLeft:15
    justifyContent: "space-between",
    textAlign: 'center',
    alignContent: 'space-between',
    alignItems: 'center'
  },
  btnText: {
    color: "#000000",
    fontSize: 16,
    justifyContent: "space-between",
    textAlign: "center",
  },
  textStyle: {
    fontSize: 16
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#01c853',
    padding: 10,
    margin: 10,
    marginLeft: 100,
    marginRight: 100,
    alignItems: 'center',
  }


});
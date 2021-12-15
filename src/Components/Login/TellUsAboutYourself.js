

import * as React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MiniCard from '../Layouts/MiniCard';



export default function TellUsAboutYourself() {
  const whatDeliverydataArray = [{
    cardTitle: 'Ready-to-eat-food',
    _id: 'C001'
  },
  {
    cardTitle: 'Groceries',
    _id: 'C002'
  }, {
    cardTitle: 'Cakes & Desert',
    _id: 'C003'
  }, {
    cardTitle: 'Documents',
    _id: 'C004'
  }, {
    cardTitle: 'Medicines',
    _id: 'C005'
  }, {
    cardTitle: 'Clothes & Fabrics',
    _id: 'C006'
  }, {
    cardTitle: 'Electronics',
    _id: 'C007'
  }, {
    cardTitle: 'Gifts',
    _id: 'C008'
  }, {
    cardTitle: 'Flowers',
    _id: 'C009'
  }
];
const howDeliverydataArray = [{
  cardTitle: '1-5',
  _id: 'H001'
},
{
  cardTitle: '6-10',
  _id: 'H002'
}, {
  cardTitle: '11-25',
  _id: 'H003'
}, {
  cardTitle: '26-50',
  _id: 'H004'
}, {
  cardTitle: '51-100',
  _id: 'H005'
}, {
  cardTitle: 'More than 100',
  _id: 'H006'
}
];

  //const [myArray, setdataArray] = React.useState(dataArray);

  //setdataArray([...myArray,dataArray]);

  return (

    <View style={{
      //alignItems: 'center', 
      marginLeft: 10,
      justifyContent: 'center'
    }}>
      {/* <Text>Dashboard Screen</Text> */}


      <ScrollView
        scrollEnabled={true}>
        <Text style={Styles.mainHeader}>Tell us about yourself</Text>
        <Text style={Styles.smallHeader}>So that we can make your deliveries smoother</Text>

        <Text style={Styles.textStyle} >Do you need delivery for business?</Text>

        <View style={{ flexDirection: 'row', }}>

          <MiniCard data='Yes'></MiniCard>

          <MiniCard data='No'></MiniCard>
        </View>

        
        
        
        <Text style={Styles.textStyle} >What do you deliver?</Text>

        <View style={{ flexDirection: 'column', }}>
        <FlatList
           contentContainerStyle={Styles.list}
          horizontal
          data={whatDeliverydataArray}
          numColumns={1}
          renderItem={(item) => {
            return (
              <MiniCard data={item.item.cardTitle}></MiniCard>)
          }
          }
          keyExtractor={item => item._id}
          contentContainerStyle={{
            flexGrow: 2,
          }}
        />
          
        </View>


        <Text style={Styles.textStyle} >How many deliveries per week?</Text>

<View style={{ flexDirection: 'column', }}>
<FlatList
   contentContainerStyle={Styles.list}
  horizontal
  data={howDeliverydataArray}
  numColumns={1}
  renderItem={(item) => {
    return (
      <MiniCard data={item.item.cardTitle}></MiniCard>)
  }
  }
  keyExtractor={item => item._id}
  contentContainerStyle={{
    flexGrow: 2,
  }}
/>
  
</View>



        {/* <FlatList
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

        <Text>We will assign the nearest courier to pick-up and deliver as soon as possible</Text> */}
      </ScrollView>








    </View>
  );
}

const Styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    },
  smallHeader: {
    fontSize: 15,
    color: '#000000'

  },
  mainHeader: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#000000",
    marginTop: 20,

  },

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
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 15
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
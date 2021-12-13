

import * as React from 'react';
import { View, Text,FlatList, ScrollView } from 'react-native';
import Card from '../Layouts/Card';



export default function Dashboard() {
  const dataArray=[{
    cardTitle:'Deliver Now',
    fromCost:44,
    process_id:'001',
    imageuri:require('../../assets/clock.png')
  },
{
  cardTitle:'Schedule',
  fromCost:20,
  process_id:'002',
  imageuri:require('../../assets/time.png')
},{
  cardTitle:'4-hour Interval',
  fromCost:60,
  process_id:'003',
  imageuri:require('../../assets/interval.png')
}];

const [myArray, setdataArray]=React.useState(dataArray);

//setdataArray([...myArray,dataArray]);

    return (
      
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Dashboard Screen</Text>
        <ScrollView 
        scrollEnabled={true}>
        <FlatList
       // style={{flex:1}}
        horizontal
        data={myArray}
        renderItem={(item)=>
         { 
           return(
        <Card dataArray={item.item}></Card>)
      }
        }
        keyExtractor={item=>item.process_id}
        contentContainerStyle={{
          flexGrow: 1,
          }}
        />  
        </ScrollView>
        
       

        
      </View>
    );
  }
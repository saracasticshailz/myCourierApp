import React, { useState } from 'react';
import { StyleSheet, View,Image ,Text} from 'react-native';

export default function Card(props) {
//  const imageURI=[ image,setImageURI]=useState(props.dataArray.imageuri);
  console.log('props : ',props);
  return (
   
    <View style={styles.card}>
      <View style={styles.cardHeader}> 
      <Image style={styles.iconStyle} source={props.dataArray.imageuri}></Image>
       <Text style={styles.mainText}>{ props.dataArray.cardTitle }</Text>
      </View>
     
      <View style={styles.cardContent}>
        <Text>Starts from ${ props.dataArray.fromCost }</Text>
     
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText:{
fontWeight:'bold'
  },
  cardHeader:{
alignItems:'center',
justifyContent:'space-between',
flexDirection:'row',//to set flex horizontally

  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  iconStyle:{
width:30,
height:30,
margin:5
  }
});

import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { State } from 'react-native-gesture-handler';
import MiniCard from '../Layouts/MiniCard';
import styles from '../Style/StyleGlobal';
import LoginScreen from './LoginScreen';
import {CheckBox} from 'react-native-elements';
import RootNavigation from './../../../RootNavigation'

export default function SelectCity(props) {

  //const navigation=useNavigation();
  const [cityName, setCity] = useState('');
const [checked,SetChecked] = useState(true);
const cityArray = [{
  cityName: 'Mumbai',
  _id: 'H001'
},
{
    cityName: 'Bengaluru',
  _id: 'H002'
}, {
    cityName: 'Delhi',
  _id: 'H003'
}, {
    cityName: 'Hyderabad',
  _id: 'H004'
}, {
    cityName: 'Ahemedabad',
  _id: 'H005'
}, {
    cityName: 'Kolkata',
  _id: 'H006'
}, {
    cityName: 'Surat',
    _id: 'H007'
  }
  , {
    cityName: 'Pune',
    _id: 'H008'
  }, {
    cityName: 'Jaipur',
    _id: 'H009'
  }, {
    cityName: 'Goa',
    _id: 'H010'
  }, {
    cityName: 'Indore',
    _id: 'H011'
  }, {
    cityName: 'Bhopal',
    _id: 'H012'
  }
];

  function navigateNext(item){
    SetChecked(false);
 
      setCity(item.cityName);

      if(cityName){
         props.navigation.navigate('LoginScreen',{
                city:cityName,
              
            })
          // RootNavigation.navigate('LoginScreen',{
          //         city:cityName,
                
          //     })
            console.log("props tobe sent : "+cityName)
     }
   
 

  }

  return (

    <View style={{
      //alignItems: 'center', 
      flex:1,
      justifyContent: 'center',      
    }}>

      <ScrollView
        scrollEnabled={true}>
     <View>
     <FlatList
         //  contentContainerStyle={styles.list}
          data={cityArray}
          renderItem={(item) => {
            return (
                <TouchableOpacity onPress={() => navigateNext(item.item)}>
<View style={{flexDirection:'row', justifyContent:'space-between'}}>
<Text style={{color:"#000000",margin:10}}
            >{item.item.cityName}</Text>
              <CheckBox
            // iconRight
            style={{flex:1}}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          // checked={ navigateNext(item.item)}
         //   onPress={() => SetChecked(false)}
          />
</View>
                </TouchableOpacity>

               
          
              )
          }
          }
          keyExtractor={item => item._id}
      
        />
         </View>  
       
               </ScrollView>
    </View>
  );
}
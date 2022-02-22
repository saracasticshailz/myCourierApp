

import React,{useState,useEffect} from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, TextInput,
BackHandler,AsyncStorage } from 'react-native';
import Card from '../Layouts/Card';
import styles from '../Style/StyleGlobal';
import AddressSelection from '../Map/AddressSelection'
import { _retrieveData } from '../../utils/storage';
import Constant from '../../utils/Constant';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from 'react-native-paper';
import axios from 'axios';




export default function Dashboard(props) {
  const dataArray = [
  //   {
  //   cardTitle: 'Deliver Now',
  //   fromCost: 44,
  //   process_id: '001',
  //   imageuri: require('../../assets/clock.png')
  // },
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
  const [totalDistance,settotalDistance]=React.useState();
  const [totalDistanceKM,settotalDistanceKM]=React.useState('');
  const [totalDue,settotalDue]=React.useState('');
  const [length,setLength]=React.useState('');
  const [breadth,setBreadth]=React.useState('');
  const [weight,setWeight]=React.useState('');
  const [height,setHeight]=React.useState('');
  const [quantity,setquantity]=React.useState('');
  const [loading, isLoading] = useState(false);
  const [token,setToken]=useState();

  _retrieveData(Constant.token).then((data) => {
    setToken(data);
    console.log('token : ' + data);
  });
 
 
  // useEffect(() => {
  //   if(!fromAdd){
  //     setFromAdd(_retrieveData(Constant.fromAdd));
  //   }
  // },[fromAdd]);

  function _calculatePricing(){

    if(totalDistanceKM == ''){
      alert('Please select location');
    } else if(length == '' || breadth =='' || weight=='' || height ==  '' || quantity ==  ''){
      alert('Please mention diamensions');

    }else {
    let config = {
      headers: {
        'Authorization':token,
      }
    }
    var body={
      "distance":'120',
    "cateogryType":"electric",
    "value":"5000",
    "weight":"0.1",
    "length":"12",
    "breadth":"12",
    "height":"12",
    "quantity":"21",
    "isPeaktime":true}
    axios.post('https://stgapi.opoli.in/pricing/calculate', 
    body,config)
      .then(function(response) { 
        isLoading(false);   
      console.log(JSON.stringify( response));
      if(response.status === 200){
          alert('pricing is '+ response.data.pricing); 
      }else{
        console.log('error',response);
        isLoading(false);
      }
      
      })
      
      .catch(function(error) {
      
      console.log(error);
      isLoading(false);
      
      }); 
    }
  }

  function _handleMapClick(){
    if(dataArray){
     props. navigation.navigate('AutoSuggestActivity',{
       myData:'myadata',
       flag:'from'
      // changeFromAddress:this.changeFromAddress.bind(this)
      });
    }
    
  };

  function _handleToMapClick(){
   // if(dataArray){
     props. navigation.navigate('AutoSuggestActivity',{
       myData:'myadata',
       flag:'to'
      // changeFromAddress:this.changeFromAddress.bind(this)
      });
  //  }
    
  };
  function _handleBookCourier(params) {
    alert('WIP');
  }

  function _handleRazorPayClick(){
    props.navigation.navigate('Razorpayment',{});
  }

  function _getDistanceViaeLoc(){
  
      MapmyIndiaGL.RestApi.distance({coordinates:[fromEloc,toEloc]}) 
      .then(response => { 
        const data = JSON.parse(response); 

        console.log("_getDistanceViaeLoc : "+response);
        settotalDistance(data.results.distances[0][1]);
        settotalDue(data.results.durations[0][1]);
        const KMS=getFormattedDistance(data.results.distances[0][1] + data.results.distances[0][0]);
        settotalDistanceKM(KMS);
        console.log("KMS : "+KMS);
      
      }) 
      .catch(error => console.log(error.code,error.message));
    };
 function   getFormattedDistance(distance) {
      if (distance / 1000 < 1) {
        return distance + 'mtr.';
      }
      let dis = distance / 1000;
      dis = dis.toFixed(2);
      return dis + 'Km.';
    };
  
  function  getFormattedDuration(duration) {
      let min = parseInt((duration % 3600) / 60);
      let hours = parseInt((duration % 86400) / 3600);
      let days = parseInt(duration / 86400);
      if (days > 0) {
        return (
          days +
          ' ' +
          (days > 1 ? 'Days' : 'Day') +
          ' ' +
          hours +
          ' ' +
          'hr' +
          (min > 0 ? ' ' + min + ' ' + 'min.' : '')
        );
      } else {
        return hours > 0
          ? hours + ' ' + 'hr' + (min > 0 ? ' ' + min + ' ' + 'min' : '')
          : min + ' ' + 'min.';
      }
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
        let from_eloc=props.route.params.fromEloc;
        console.log('selectedAdd from: '+JSON.stringify( selectedAdd));
        setFromAdd(selectedAdd);
        setfromEloc(from_eloc);
      }
      if(props.route.params.flag == 'to'){
        
        let selectedAdd=props.route.params.formattedAddress;
      let from_eloc=props.route.params.toEloc
        console.log('selectedAdd to: '+JSON.stringify( selectedAdd));
        settoAdd(selectedAdd);
        settoEloc(from_eloc);
      }
      if(props.route.params.flag == 'pre'){
        let pre_eloc=props.route.params.preEloc
        let selectedAdd=props.route.params.formattedAddress
        setFromAdd(selectedAdd);
        setfromEloc(pre_eloc);

      }

      if(toAdd){
        _getDistanceViaeLoc(fromAdd,toAdd);
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
    <View style={styles.mainView}>
<ScrollView>


    
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
        <View style={styles.buttonHighlightesStyle}>
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

      <Text style={styles.mainHeader} > Total Distance {totalDistanceKM}</Text>

      <View style={{    flexDirection: 'row', justifyContent:'space-between',alignItems:'center'
}}>
        <View style={styles.inputViewForSize}>
          <Text style={styles.smallHeader}>Weight</Text>
          <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
          <TextInput 
                 
                 // placeholder="xxxxxxxxxx" 
                  placeholderTextColor="#003f5c"
                  borderColor='#000000'
                  returnKeyLabel='Done' 
                  returnKeyType='done' 
                  maxLength={5}
                  placeholder='i.e 10.8'
                  keyboardType='decimal-pad'
                  style={styles.inputText}           
                  enablesReturnKeyAutomatically='false'
                  
                  onChangeText={text =>setWeight(text)}/>
      
                  <Text style={styles.smallHeader}>gms</Text>
          </View>
         
        </View>
        <View style={styles.inputViewForSize}>
          {/* <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={()=>_handleBookCourier()}>
            <Text style={styles.btnText}  >
              Book a courier &#10140;
            </Text>
          </TouchableOpacity> */}
          <Text style={styles.smallHeader}>Length</Text>
          <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
          <TextInput 
                 
                 // placeholder="xxxxxxxxxx" 
                 style={styles.inputText}           
                  placeholderTextColor="#003f5c"
                  borderColor='#000000'
                  returnKeyLabel='Done' 
                  returnKeyType='done' 
                  maxLength={5}
                  placeholder='i.e 10.8'
                  keyboardType='decimal-pad'
                  enablesReturnKeyAutomatically='false'
                  onChangeText={text =>setLength(text)}/>
      
                  <Text style={styles.smallHeader}>cms</Text>
          </View>
         
        </View>
        </View>
       
       
        <View  style={{    flexDirection: 'row', justifyContent:'space-between',alignItems:'center'
}}>
        <View style={styles.inputViewForSize}>
          <Text style={styles.smallHeader}>Breadth</Text>
          <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
          <TextInput 
                 
                 // placeholder="xxxxxxxxxx" 
                  placeholderTextColor="#003f5c"
                  style={styles.inputText}           
                  borderColor='#000000'
                  returnKeyLabel='Done' 
                  returnKeyType='done' 
                  maxLength={5}
                  placeholder='i.e 10.8'
                  keyboardType='decimal-pad'
                  enablesReturnKeyAutomatically='false'
                  onChangeText={text =>setBreadth(text)}/>
      
                  <Text style={styles.smallHeader}>cms</Text>
          </View>
          
        </View>

        
        <View style={styles.inputViewForSize}>
          <Text style={styles.smallHeader}>Quantity</Text>
          <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
          <TextInput 
                 
                 // placeholder="xxxxxxxxxx" 
                  placeholderTextColor="#003f5c"
                  borderColor='#000000'
                  returnKeyLabel='Done' 
                  returnKeyType='done' 
                  maxLength={5}
                  placeholder='i.e 10.8'
                  keyboardType='decimal-pad'
                  enablesReturnKeyAutomatically='false'
                  onChangeText={text =>setquantity(text)}
                  style={styles.inputText}           
                  />
      
                  <Text style={styles.smallHeader}>units</Text>
          </View>
        </View>

     
      </View>
      <View style={{    flexDirection: 'row', justifyContent:'space-between',alignItems:'center'
}}>
    <View style={styles.inputViewForSize}>
          <Text style={styles.smallHeader}>Height</Text>
          <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
          <TextInput 
                 
                 // placeholder="xxxxxxxxxx" 
                  placeholderTextColor="#003f5c"
                  borderColor='#000000'
                  returnKeyLabel='Done' 
                  returnKeyType='done' 
                  maxLength={5}
                  placeholder='i.e 10.8'
                  keyboardType='decimal-pad'
                  enablesReturnKeyAutomatically='false'
                  onChangeText={text =>setHeight(text)}
                  style={styles.inputText}           
                  />
      
                  <Text style={styles.smallHeader}>cms</Text>
          </View>
         
        </View>
    </View>

</View>
</ScrollView>
<View style={{marginTop:50}}>
<TouchableOpacity style={styles.bottomButtonView}  
       onPress={() => 
        _calculatePricing()}>
          <Text style={styles.loginText}>Confirm &#38; Book</Text>
        </TouchableOpacity>
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
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Components/Login/LoginScreen';
import OTP from './src/Components/Login/OTP';
import Dashboard from './src/Components/Dashboard/Dashboard';
import SetPassword from './src/Components/Login/SetPassword'
import ViewMap from './src/Components/Map/ViewMap';
import TellUsAboutYourself from './src/Components/Login/TellUsAboutYourself'
import WhatsYourName from './src/Components/Login/WhatsYourName'
import Test from './src/Components/Login/Test';
import Razorpayment from './src/Components/Payment/Razorpayment';
import AddressSelection from './src/Components/Map/AddressSelection';
import DistanceApiMap from './src/Components/Map/DistanceApiMap'
import SelectCity from './src/Components/Login/SelectCity';
import { UserDetailsContext, UserDetailsProvider } from './src/stateManagement/UserDetailsProvider';
import Constant from './src/utils/Constant';
import { _retrieveData } from './src/utils/storage';
import AutoSuggestActivity from './src/Components/Map/AutoSuggestActivity';
import CurrentLocationActivity from './src/Components/Map/CurrentLocationActivity';
import { Provider } from 'react-redux';
import store from './src/stateManagement/store/store';
const Stack= createNativeStackNavigator();

class AppContainer extends React.Component {
constructor(props){
 
    super(props);
    const Stack= createNativeStackNavigator();

};
  render (){
    return(     
      <NavigationContainer  ref={navigationRef}>  
        <Stack.Navigator initialRouteName='LoginScreen'>
          <Stack.Screen name='LoginScreen' component={LoginScreen} options={{title:'Login'}}></Stack.Screen>
          <Stack.Screen name='OTP' component={OTP} options={{title:'OTP'}}></Stack.Screen>
          <Stack.Screen name='Dashboard' component={Dashboard} options={{title:'Deliver Now'}}></Stack.Screen>
          <Stack.Screen name='SetPassword' component={SetPassword} options={{title:'Set Password'}}></Stack.Screen>
          <Stack.Screen name='ViewMap' component={ViewMap} options={{title:'View Map'}}></Stack.Screen>
          <Stack.Screen name='TellUsAboutYourself' component={TellUsAboutYourself} options={{title:'Tell Us About Yourself'}}></Stack.Screen>
          <Stack.Screen name='WhatsYourName' component={WhatsYourName}options={{title:'Whats Your Name'}}></Stack.Screen>
          <Stack.Screen name='Test' component={Test}options={{title:'Whats Your Name'}}></Stack.Screen>
          <Stack.Screen name='Razorpayment' component={Razorpayment}options={{title:'Razorpayment'}}></Stack.Screen>
          <Stack.Screen name='AddressSelection' component={AddressSelection}options={{title:'AddressSelection'}}></Stack.Screen>
          <Stack.Screen name='DistanceApiMap' component={DistanceApiMap}options={{title:'Distance Map'}}></Stack.Screen>
          <Stack.Screen name='SelectCity' component={SelectCity}options={{title:'Select City'}}></Stack.Screen>
          <Stack.Screen name='AutoSuggestActivity' component={AutoSuggestActivity}options={{title:'AutoSuggestActivity'}}></Stack.Screen>
          <Stack.Screen name='CurrentLocationActivity' component={CurrentLocationActivity} options={{title:'CurrentLocationActivity'}}></Stack.Screen>
        </Stack.Navigator>  

           
      </NavigationContainer>

    )
  }
}
const App=()=>
{
  return(
    <Provider store={store}>
      <AppContainer/>
      </Provider>
  );
}

export default App;

export const landing_page=()=>{
  const isLogin =_retrieveData(Constant.isLogin).then((flag)=>{
    console.log('login flag : '+flag);
  isLogin =flag;
  
   
  });
  if(isLogin)
  {
  return 'Dashboard';
  }else{
  return 'SelectCity';
  }
}


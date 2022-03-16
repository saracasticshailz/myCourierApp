/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import FirstPage from './src/Screen/FirstPage';
import SecondPage from './src/Screen/SecondPage';
import ThirdPage from './src/Screen/ThirdPage';
import store from './src/Redux/store';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';



const App = () => {
  // const userData = useSelector((state) => state)


  const Stack = createNativeStackNavigator();



  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='FirstPage'>
          <Stack.Screen name='FirstPage' component={FirstPage} options={{ title: 'First Page' }}></Stack.Screen>
          <Stack.Screen name='SecondPage' component={SecondPage} options={{ title: 'Second Page' }}></Stack.Screen>
          <Stack.Screen name='ThirdPage' component={ThirdPage} options={{ title: 'Third Page' }}></Stack.Screen>

        </Stack.Navigator>

      </NavigationContainer>
    </Provider>

  )
}

export default App;

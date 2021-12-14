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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Components/Login/LoginScreen';
import OTP from './src/Components/Login/OTP';
import Dashboard from './src/Components/Dashboard/Dashboard';
import SetPassword from './src/Components/Login/SetPassword'
import ViewMap from './src/Components/Map/ViewMap';
import TellUsAboutYourself from './src/Components/Login/TellUsAboutYourself'

const Stack= createNativeStackNavigator();

export default class App extends React.Component {
  
  render (){
    return(
      // <View style={styles.containerMain}>
      //   <LoginScreen/>
      //   </View>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='TellUsAboutYourself'>
          <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
          <Stack.Screen name='OTP' component={OTP}></Stack.Screen>
          <Stack.Screen name='Dashboard' component={Dashboard}></Stack.Screen>
          <Stack.Screen name='SetPassword' component={SetPassword}></Stack.Screen>
          <Stack.Screen name='ViewMap' component={ViewMap}></Stack.Screen>
          <Stack.Screen name='TellUsAboutYourself' component={TellUsAboutYourself}></Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };



const styles = StyleSheet.create({
  containerMain:{
flex:1,
flexDirection:'column'
  },
  headTitle:{
    flex:1
    },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});




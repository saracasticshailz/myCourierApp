import * as React from 'react';
import { View, Text } from 'react-native';
import Card from '../Layouts/Card';


export default function Dashboard() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Dashboard Screen</Text>
        <Card data={'say_my_name'}></Card>
      </View>
    );
  }
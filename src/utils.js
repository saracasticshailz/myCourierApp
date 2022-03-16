

//import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export function setUserData(data) {
    data = JSON.stringify(data);
    return AsyncStorage.setItem('userData', data);
}

export async function getUserData() {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('userData').then(data => {
            resolve(JSON.parse(data));
        });
    });
}
export async function clearUserData() {
    return AsyncStorage.removeItem('userData');
}
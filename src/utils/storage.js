import React from "react";
import { AsyncStorage } from "react-native";

export const _storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(
        key,
        value
      );
    } catch (error) {
      // Error saving data
    }
  };

  export const _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
     
      if (value !== null) {
        // We have data!!
        console.log("value : "+value);
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };


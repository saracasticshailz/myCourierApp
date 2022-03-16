//@flow
import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import TextInputWithLable from '../Components/TextInputWithLabel'
import Button_ from '../Components/Button_'
import { styles } from '../Style/globalStyle'
import { setUserData } from '../utils'
import { clearUserData } from '../utils'
import action from '../Redux/actions/index'
import { NativeModules } from 'react-native';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";


const { EmulatorDetectionModule } = NativeModules;


function FirstPage() {

    const [userName, setUserName] = useState('');
    useEffect(() => {
        // clearUserData('userData').then(() => {
        //     console.log('Storage Cleaned');
        // })
        emultorFlag();
    }, []);

    const emultorFlag = async () => {
        EmulatorDetectionModule.isEmulator(
            (success) => {
                console.log(success);
                showMessage({
                    message: "Hey there!!,You are using an Emulator.",
                    type: "My info",
                    backgroundColor: 'red'
                });
            }, (error) => {
                console.log(error);
            }
        )

    }

    const submitName = async () => {
        if (userName == '') {
            alert('Please Enter Name!');
        } else {
            try {
                const res = await action.saveUserData({
                    userName
                })
                console.log("res==>>>>>", res);
                navigation.navigate('SecondPage');

            } catch (error) {
                console.log("error raised : " + error)
            }

            // setUserData(userName).then(() => {
            //     console.log('data Saved');
            //     props.navigation.navigate('SecondPage');
            //     // props.navigation.navigate('SecondPage',{});
            // });
        }

    }

    return (
        <View style={styles.containerMain}>
            <TextInputWithLable
                placheHolder={'Enter your name'}
                onChangeText={(NameText) => setUserName(NameText)}
            />
            <Button_
                text={'Submit'}
                onPress={submitName}
                bgcolor={'blue'}
                btnTextColor={'white'}></Button_>

            <FlashMessage position="top" />
        </View>
    )

}
export default FirstPage;
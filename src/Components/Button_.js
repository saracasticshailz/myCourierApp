import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const Button_ = ({
    isLoading,
    text,
    onPress,
    bgcolor,
    btnTextColor
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.btnStyle, { backgroundColor: bgcolor }]}>

            {!!isLoading ? <ActivityIndicator size="large" color="white" />
                : <Text style={[styles.textStyle, { color: btnTextColor }]}>{text}</Text>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        height: 48,
        //  backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: 16,
        marginTop: 10
    },
    textStyle: {
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        //  color: 'white'
    }
});

export default Button_;

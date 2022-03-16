import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { styles } from '../Style/globalStyle';

const TextInputWithLable = ({
    label,
    value,
    placheHolder,
    isSecure,
    onChangeText,
    ...props
}) => {
    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={{
                fontSize: 16,
                marginBottom: 8,
                fontWeight: 'bold'

            }}>{label}</Text>
            <TextInput
                value={value}
                placeholder={placheHolder}
                onChangeText={onChangeText}
                style={styles.inputStyle}
                placeholderTextColor="gray"
                keyboardType='default'
                {...props}
            />
        </View>
    );
};


export default TextInputWithLable;

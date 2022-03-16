import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../Style/globalStyle'
import { useSelector } from 'react-redux';

export default function ThirdPage() {
    const userData = useSelector((state) => state.userData);


    return (
        <View style={styles.containerMain}>
            <View style={styles.horizontalView}>
                <Text style={{ color: 'white' }}>{userData.userName}</Text>
            </View>
        </View>
    )
}

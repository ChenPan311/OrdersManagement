import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const IconButton = ({ icon, title, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]}
            onPress={onPress}>
            <AntDesign name={icon} size={24} />
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default IconButton

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 4,
    },
    buttonText: {
        fontFamily: 'VarelaRound',
        color: 'black',
        marginStart: 10,
    },
})

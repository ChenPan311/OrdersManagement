import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const Button = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]}
            onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 4,
    },
    buttonText: {
        fontFamily: 'VarelaRound',
        color: 'black'
    },
})

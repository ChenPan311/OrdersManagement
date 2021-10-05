import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const CubeButton = ({ title, value, color, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: color }]}
            onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </TouchableOpacity>
    )
}

export default CubeButton

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 120,
        minWidth: 120,
        maxHeight: 120,
        minHeight: 100,
        borderRadius: 15,
        elevation: 5,
    },
    title: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'VarelaRound',
    },
    value: {
        color: 'black',
        fontSize: 26,
        fontFamily: 'VarelaRound',
    },
});

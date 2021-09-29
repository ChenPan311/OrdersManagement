import React from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import RegisterForm from '../Components/RegisterForm'

const Register = ({ navigation }) => {

    return (
        <ImageBackground source={require('../assets/backgrounds/background1.png')} style={{ flex: 1 }} resizeMode='cover'>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Register</Text>
            <RegisterForm />
        </ImageBackground>
    )
}

export default Register

const styles = StyleSheet.create({
    back: {
        position: 'absolute',
        right: 0,
        left: 0,
        marginTop: 60,
        marginHorizontal: 60,
        flexDirection: 'row-reverse',
    },
    pageTitle: {
        position: 'absolute',
        top: 200,
        alignSelf: 'center',
        fontSize: 24
    }
})
import React from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import RegisterForm from '../Components/RegisterForm'

const Register = ({ navigation }) => {

    return (
        <ImageBackground source={require('../assets/backgrounds/background1.png')} style={{ flex: 1 }} resizeMode='cover'>
            <RegisterForm goBack={() => navigation.goBack()} />
        </ImageBackground>
    )
}

export default Register

const styles = StyleSheet.create({

})
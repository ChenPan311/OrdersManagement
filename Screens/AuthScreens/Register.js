import React from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import RegisterForm from '../../Components/RegisterForm'

const Register = ({ navigation }) => {

    return (
        <ImageBackground source={require('../../assets/backgrounds/background1.png')} style={{ flex: 1 }} resizeMode='cover'>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
            <RegisterForm style={{ flex: 5 }} />
        </ImageBackground>
    )
}

export default Register

const styles = StyleSheet.create({
    back: {
        position: 'absolute',
        start: 0,
        marginTop: 60,
        marginHorizontal: 60,
        flexDirection: 'row-reverse',
    },
    pageTitle: {
        position: 'absolute',
        marginTop: 200,
        alignSelf: 'center',
        fontSize: 24,
        fontFamily: 'VarelaRound'
    }
})
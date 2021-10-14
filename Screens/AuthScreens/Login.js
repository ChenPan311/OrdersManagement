import React from 'react'
import { ImageBackground, StyleSheet, Image, Text, Button } from "react-native";
import LoginForm from '../../Components/LoginForm';
import { store } from '../../store'

const Login = ({ navigation }) => {

    return (
        <ImageBackground source={require('../../assets/backgrounds/background1.png')} style={{ flex: 1 }} resizeMode='cover'>
            <Image source={require('../../assets/icon.png')} style={styles.image} />
            <LoginForm moveToRegister={() => navigation.navigate("Register")} />
        </ImageBackground>
    );
}

export default Login

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        width: 100,
        height: 100,
        marginTop: 40,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    pageTitle: {
        position: 'relative',
        top: 200,
        alignSelf: 'center',
        fontSize: 24,
        fontFamily: 'VarelaRound'
    }
})

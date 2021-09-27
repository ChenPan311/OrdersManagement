import React from 'react'
import { Text, ImageBackground, StyleSheet } from "react-native";
import LoginForm from '../Components/LoginForm';


const Login = ({ navigation }) => {

    return (
        <ImageBackground source={require('../assets/backgrounds/background1.png')} style={{ flex: 1 }} resizeMode='cover'>
            <LoginForm moveToRegister={() => navigation.navigate("Register")} />
        </ImageBackground>
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        position: 'absolute',
        bottom: '30%',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    }
})

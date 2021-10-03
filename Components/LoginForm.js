import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants';
import { signIn } from '../Actions/UserActions'
import { connect } from 'react-redux';
import axios from 'axios';

const apiPath = "http://192.168.1.230:3000/api";

const LoginForm = ({ moveToRegister, dispatch }) => {

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit = data => {
        axios.post(`${apiPath}/user/login`, { email: data.email, password: data.password })
            .then((res) => {
                if (res.status === 200)
                    dispatch(signIn(res.data._id, res.data.token));
            }).catch((err) => alert(err.response.data));
    };

    return (
        <View style={styles.container}>
            <Text style={{ alignSelf: 'center', marginBottom: 40, fontSize: 30, fontFamily: 'VarelaRound' }}>Login</Text>
            <Text style={styles.label}>Email</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        autoCompleteType='email'
                        textContentType='emailAddress'
                        keyboardType='email-address'
                    />
                )}
                name="email"
                rules={{ required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }}
            />
            {errors.email?.type === 'required' && <Text style={styles.error}>Email is required</Text>}
            {errors.email?.type === 'pattern' && <Text style={styles.error}>Wrong email address</Text>}

            <Text style={styles.label}>Password</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        secureTextEntry={true}
                    />
                )}
                name="password"
                rules={{ required: true }}
            />
            {errors.password?.type === 'required' && <Text style={styles.error}>Password is required</Text>}

            <TouchableOpacity style={styles.button}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textButton}
                onPress={moveToRegister}>
                <Text style={[styles.buttonText, { color: 'white' }]}>Register</Text>
            </TouchableOpacity>
        </View>
    );

}

export default connect()(LoginForm);

const styles = StyleSheet.create({
    label: {
        color: 'black',
        fontSize: 18,
        marginTop: 20,
        fontFamily: 'VarelaRound',
    },
    textButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'white',
        fontFamily: 'VarelaRound'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 4,
    },
    buttonText: {
        fontFamily: 'VarelaRound'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        marginTop: 40,
        paddingHorizontal: 80,
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        height: 50,
        padding: 10,
        borderRadius: 5,
        fontFamily: 'VarelaRound'
    },
    error: {
        color: 'red',
        fontFamily: 'VarelaRound'
    }
});

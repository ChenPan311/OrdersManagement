import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Button from './Button';
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants';
import { signIn } from '../Actions/UserActions'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { i18n } from '../Utils/i18n/supportedLanguages';

const apiPath = "http://192.168.1.230:3000/api";

const LoginForm = ({ moveToRegister }) => {

    const dispatch = useDispatch();

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
            }).catch((err) => alert(err.message));
    };

    return (
        <View style={styles.container}>
            <Text style={{ alignSelf: 'center', marginBottom: 40, fontSize: 30, fontFamily: 'VarelaRound' }}>{i18n.t('loginTitle')}</Text>
            <Text style={styles.label}>{i18n.t('email')}</Text>
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
            {errors.email?.type === 'required' && <Text style={styles.error}>{i18n.t('emailRequired')}</Text>}
            {errors.email?.type === 'pattern' && <Text style={styles.error}>{i18n.t('emailWrong')}</Text>}

            <Text style={styles.label}>{i18n.t('password')}</Text>
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
            {errors.password?.type === 'required' && <Text style={styles.error}>{i18n.t('passwordRequired')}</Text>}

            <Button title={i18n.t('login')} onPress={handleSubmit(onSubmit)} style={{ marginTop: 40 }} />

            <TouchableOpacity style={styles.textButton}
                onPress={moveToRegister}>
                <Text style={[styles.buttonText, { color: 'white' }]}>{i18n.t('register')}</Text>
            </TouchableOpacity>
        </View>
    );

}

export default LoginForm;

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
        marginTop: 40,
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
        fontFamily: 'VarelaRound',
    },
    error: {
        color: 'red',
        fontFamily: 'VarelaRound'
    }
});

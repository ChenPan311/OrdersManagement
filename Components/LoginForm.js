import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants';
import { signIn } from '../Actions/UserActions'
import { useDispatch } from 'react-redux';

const LoginForm = ({ moveToRegister }) => {

    const dispatch = useDispatch();
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit = data => {
        dispatch(signIn(data.email, data.password));
    };

    return (
        <View style={styles.container}>
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
                <Text>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textButton}
                onPress={moveToRegister}>
                <Text style={{ color: 'white' }}>Register</Text>
            </TouchableOpacity>
        </View>
    );

}

export default LoginForm;

const styles = StyleSheet.create({
    label: {
        color: 'black',
        fontSize: 16,
        marginTop: 20,
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
    },
    error: {
        color: 'red',
    }
});

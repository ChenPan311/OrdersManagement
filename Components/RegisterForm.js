import React from 'react'
import { Text, View, StyleSheet, TextInput } from "react-native";
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form'
import { register } from '../Actions/UserActions';
import Constants from 'expo-constants';
import axios from 'axios';
import Button from './Button';
import { i18n } from '../Utils/i18n/supportedLanguages';

const apiPath = "http://192.168.1.230:3000/api";

const LoginForm = () => {
    const dispatch = useDispatch();
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            branch_name: '',
            branch_number: '',
            password: ''
        }
    });
    const onSubmit = data => {
        axios.post(`${apiPath}/user/register`, data)
            .then((res) => {
                if (res.status === 200)
                    dispatch(register(res.data._id, res.data.token));
            }).catch((err) => alert(err));
    };

    console.log('errors', errors);

    return (
        <View style={styles.container}>
            <Text style={{ alignSelf: 'center', marginBottom: 40, fontSize: 30, fontFamily: 'VarelaRound' }}>{i18n.t('register')}</Text>
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

            <View style={styles.row}>
                <View style={{ flex: 4 }}>
                    <Text style={styles.label}>{i18n.t('branchName')}</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="branch_name"
                        rules={{ required: true }}
                    />
                    {errors.branch_name?.type === 'required' && <Text style={styles.error}>{i18n.t('branchNameRequired')}</Text>}
                </View>
                <View style={{ flex: 1 }}></View>

                <View style={{ flex: 4 }}>
                    <Text style={styles.label}>{i18n.t('branchNumber')}</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                keyboardType='number-pad'
                            />
                        )}
                        name="branch_number"
                        rules={{ required: true }}
                    />
                    {errors.branch_number?.type === 'required' && <Text style={styles.error}>{i18n.t('branchNumberRequired')}</Text>}
                </View>

            </View>
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

            <Button title={i18n.t('register')} onPress={handleSubmit(onSubmit)} style={{ marginTop: 40 }} />
        </View>
    );
}

export default LoginForm

const styles = StyleSheet.create({
    label: {
        color: 'black',
        fontSize: 16,
        marginTop: 20,
        fontFamily: 'VarelaRound'
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
    buttonText: {
        fontFamily: 'VarelaRound'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        marginTop: 40,
        paddingHorizontal: 40,
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
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

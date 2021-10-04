import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, TextInput } from 'react-native'
import { signOut } from '../../Actions/UserActions'
import { saveSettings } from '../../Actions/SettingsActions'
import { store } from '../../store'
import Button from '../../Components/Button'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Settings = ({ navigation }) => {
    const dispatch = useDispatch();
    const { maxOrders, autoDelete } = useSelector(state => state.settings);
    const [maxOrdersField, setMaxOrders] = useState(maxOrders);
    const [autoDeleteField, setautoDeleteField] = useState(autoDelete);

    return (
        <ImageBackground source={require('../../assets/backgrounds/background2.png')} style={{ flex: 1, justifyContent: 'space-around' }} resizeMode='cover'>
            <Text style={styles.title}>Settings Page</Text>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text>Genral</Text>
                    <View style={styles.seprator}></View>
                </View>
                <View style={styles.inputsContainer}>
                    <Text style={styles.label}>Max number of orders</Text>
                    <TextInput
                        value={maxOrdersField.toString()}
                        style={styles.input}
                        placeholder='number'
                        onChangeText={text => setMaxOrders(text)} />
                </View>
                <View style={styles.inputsContainer}>
                    <Text style={styles.label}>Auto delete after (days) :</Text>
                    <TextInput
                        value={autoDeleteField.toString()}
                        style={styles.input}
                        placeholder='number'
                        onChangeText={text => setautoDeleteField(text)} />
                </View>
            </View>
            <Button title="LogOut" onPress={() => {
                dispatch(signOut());
            }} />
            <Button title="get state" onPress={() => {
                console.log(store.getState());
            }} />

            <Button title="Save" onPress={() => {
                dispatch(saveSettings(maxOrdersField, autoDeleteField));
            }} />

            <Button title="Clear" onPress={() => {
                AsyncStorage.getAllKeys()
                    .then(keys => AsyncStorage.multiRemove(keys))
                    .then(() => alert('success'));

            }} />
        </ImageBackground>
    )
}

export default Settings;

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 30,
        fontFamily: 'VarelaRound',
        color: 'white',
    },
    container: {
        marginHorizontal: 30,
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 30,
    },
    containerHeader: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: 'black',
        fontSize: 18,
        marginTop: 20,
        fontFamily: 'VarelaRound',
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        height: 50,
        padding: 10,
        borderRadius: 5,
        fontFamily: 'VarelaRound',
        textAlign: 'center'
    },
    seprator: {
        backgroundColor: 'black',
        height: 1,
        width: '100%'
    },
})
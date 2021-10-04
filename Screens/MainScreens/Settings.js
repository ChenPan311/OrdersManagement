import React from 'react'
import { View, Text, Button, ImageBackground, StyleSheet, TextInput } from 'react-native'
import { signOut } from '../../Actions/UserActions'
import { store } from '../../store'
import { useDispatch, useSelector } from 'react-redux'

const Settings = ({ navigation }) => {
    const dispatch = useDispatch();
    const { maxOrders, autoDelete } = useSelector(state => state.settings);
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
                        value={maxOrders.toString()}
                        style={styles.input}
                        placeholder='number' />
                </View>
                <View style={styles.inputsContainer}>
                    <Text style={styles.label}>Auto delete after (days) :</Text>
                    <TextInput
                        value={autoDelete.toString()}
                        style={styles.input}
                        placeholder='number' />
                </View>
            </View>
            <Button title="LogOut" onPress={() => {
                dispatch(signOut());
            }} />
            <Button title="get state" onPress={async () => {
                console.log(store.getState());
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
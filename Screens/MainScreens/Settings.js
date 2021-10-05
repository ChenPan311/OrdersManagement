import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { signOut } from '../../Actions/UserActions'
import { saveSettings } from '../../Actions/SettingsActions'
import Button from '../../Components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';

const Settings = ({ navigation }) => {
    const dispatch = useDispatch();
    const { maxOrders, autoDelete } = useSelector(state => state.settings);
    const [maxOrdersField, setMaxOrders] = useState(maxOrders);
    const [autoDeleteField, setautoDeleteField] = useState(autoDelete);

    return (
        <ImageBackground source={require('../../assets/backgrounds/background2.png')} style={{ flex: 1 }} resizeMode='cover'>
            <ScrollView>
                <View>
                    <Text style={styles.title}>Settings Page</Text>
                    <View style={styles.container}>
                        <View style={styles.containerHeader}>
                            <Text style={styles.containerHeaderLabel}>Genral</Text>
                            <View style={styles.seprator}></View>
                        </View>
                        <View>
                            <Text style={styles.label}>Max number of orders</Text>
                            <TextInput
                                value={maxOrdersField.toString()}
                                style={styles.input}
                                placeholder='number'
                                onChangeText={text => setMaxOrders(text)} />
                        </View>
                        <View>
                            <Text style={styles.label}>Auto delete after (days) :</Text>
                            <TextInput
                                value={autoDeleteField.toString()}
                                style={styles.input}
                                placeholder='number'
                                onChangeText={text => setautoDeleteField(text)} />
                        </View>
                    </View>


                    <View style={styles.container}>
                        <View style={styles.containerHeader}>
                            <Text style={styles.containerHeaderLabel}>Help</Text>
                            <View style={styles.seprator}></View>
                        </View>
                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.label}>Max number of orders
                                </Text>
                                <AntDesign name="right" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.seprator, { marginTop: 20, backgroundColor: 'white' }]}></View>
                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.label}>asdasd</Text>
                                <AntDesign name="right" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <View style={styles.buttonsContainer}>
                <Button title="Logout" onPress={() => {
                    dispatch(signOut());
                }} />

                <Button title="Save" onPress={() => {
                    dispatch(saveSettings(maxOrdersField, autoDeleteField));
                }} />
            </View>
        </ImageBackground>

    )
}

export default Settings;

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 30,
        fontFamily: 'VarelaRound',
        color: 'white',
    },
    container: {
        marginVertical: 20,
        marginHorizontal: 30,
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 30,
    },
    containerHeader: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerHeaderLabel: {
        color: 'black',
        fontSize: 22,
        fontFamily: 'VarelaRound',
        alignSelf: 'flex-end'
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
    buttonsContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
})
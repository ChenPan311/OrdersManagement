import React from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import { signOut } from '../../Actions/UserActions'
import { store } from '../../store'

const Settings = ({ navigation }) => {
    const dispatch = useDispatch();
    return (
        <View>
            <Text>Settings Page</Text>
            <Button title="LogOut" onPress={() => {
                dispatch(signOut());
            }} />
            <Button title="get state" onPress={() => {
                console.log(store.getState());
            }} />
        </View>
    )
}

export default Settings

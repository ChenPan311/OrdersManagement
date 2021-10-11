import React, { useRef, useEffect } from 'react'
import { StatusBar, ImageBackground, View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native'
import OrderForm from '../../Components/OrderForm'
import BottomSheet from 'reanimated-bottom-sheet'
import OrderItem from '../../Components/OrderItem'
import { useSelector, useDispatch } from 'react-redux'
import { filterOrders, loadOrders } from '../../Actions/OrdersActions'
import { AntDesign } from '@expo/vector-icons'
import FilterBar from '../../Components/FilterBar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const apiPath = "http://192.168.1.230:3000/api";

const Orders = () => {
    const renderContent = () => (
        <ImageBackground style={{ padding: 5, height: 450 }} source={require('../../assets/backgrounds/gradient_background.png')}>
            <View style={{ alignSelf: 'center' }}><Text>-------</Text></View>
            <OrderForm sheetRef={sheetRef} />
        </ImageBackground>
    )

    const renderItem = ({ item }) => (
        <OrderItem data={item} />
    );

    const sheetRef = useRef(null);
    const orders = useSelector(state => state.orders);
    const filter = useSelector(state => state.filter);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Load all orders
        console.log('Orders');
        axios.get(`${apiPath}/database/${user.user}`, {
            headers: { 'auth-token': user.token }
        })
            .then((response) => {
                dispatch(loadOrders(response.data))
            }).catch(err => alert(err));
    }, [])

    useEffect(() => {
        // On filter changed
        dispatch(filterOrders(filter.status, filter.order));
    }, [filter])

    return (
        <ImageBackground source={require('../../assets/backgrounds/background2.png')} style={{ flex: 1 }}>
            <StatusBar barStyle='light-content' />
            <Text style={styles.title}>Orders</Text>
            {/* <Button title="Wipe" onPress={() => {
                AsyncStorage.getAllKeys()
                    .then(keys => AsyncStorage.multiRemove(keys))
                    .then(() => alert('success'));
            }} /> */}
            {/* <Button title="State" onPress={() => {
                console.log(orders);
            }} /> */}
            <FilterBar />
            <BottomSheet ref={sheetRef}
                snapPoints={[450, 300, 0]}
                borderRadius={10}
                renderContent={renderContent}
                enabledContentTapInteraction={false}
                initialSnap={2}
            />

            <FlatList
                data={orders.filteredOrders}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <TouchableOpacity style={styles.addButton} onPress={() => {
                    sheetRef.current.snapTo(0)
                }}>
                    <AntDesign name='addfile' size={24} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default Orders

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 30,
        fontFamily: 'VarelaRound',
        color: 'white',
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#ABE2C5',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

import React, { useEffect } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import CubeButton from '../../Components/CubeButton'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../Actions/FilterActions';
import { loadOrders } from '../../Actions/OrdersActions'
import axios from 'axios';

const apiPath = "http://192.168.1.230:3000/api";

const Home = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const orders = useSelector(state => state.orders)
    const settings = useSelector(state => state.settings)

    useEffect(() => {
        // Load all orders
        axios.get(`${apiPath}/database/${user.user}`, {
            headers: { 'auth-token': user.token }
        })
            .then((response) => {
                dispatch(loadOrders(response.data))
                // dispatch(filterOrders(filter.status, filter.order));
            }).catch(err => alert(err));
    }, [])
    return (
        <ImageBackground source={require('../../assets/backgrounds/background2.png')} style={{ flex: 1, justifyContent: 'space-evenly' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
                    <AnimatedCircularProgress
                        size={220}
                        width={20}
                        fill={(orders.orders.length / settings.maxOrders) * 100}
                        tintColor="#4D9649"
                        backgroundColor="#707070"
                        padding={0}>
                        {
                            (fill) => (
                                <Text style={{ fontSize: 40, fontFamily: 'VarelaRound' }}>
                                    {Math.round(fill)}%
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                    <Text style={{ fontSize: 30, fontFamily: 'VarelaRound', marginTop: 10 }}>{orders.orders.length}/{settings.maxOrders}</Text>
                </View>
            </View>
            <View style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35
            }}>
                < CubeButton title="Open"
                    value={orders.orders.filter((order) => {
                        return order.status == "open"
                    }).length}
                    color="#FFA8A8"
                    onPress={() => {
                        dispatch(changeFilter('open', 1));
                        navigation.navigate("Orders")
                    }} />
                < CubeButton title="Pending"
                    value={orders.orders.filter((order) => {
                        return order.status == "pending"
                    }).length}
                    color="#FFFFAE"
                    onPress={() => {
                        dispatch(changeFilter('pending', 1));
                        navigation.navigate("Orders")
                    }} />
                < CubeButton title="Arrived"
                    value={orders.orders.filter((order) => {
                        return order.status == "arrived"
                    }).length}
                    color="#ABE2C5"
                    onPress={() => {
                        dispatch(changeFilter('arrived', 1));
                        navigation.navigate("Orders")
                    }} />
            </View >
        </ImageBackground>
    )
}

export default Home

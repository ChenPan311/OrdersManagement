import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker';
import IconButton from './IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, updateOrder } from '../Actions/OrdersActions';
import axios from 'axios';

const COLORS = {
    OPEN: '#FFA8A8',
    PENDING: '#FFFFAE',
    ARRIVED: '#ABE2C5'
}

const apiPath = "http://192.168.1.230:3000/api";

const OrderItem = ({ data }) => {

    const [expend, setExpended] = useState(false);
    const [open, setOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(data.status);
    const dispatch = useDispatch();

    const user = useSelector(state => state.user)

    const [items, setItems] = useState([
        { label: 'Open', value: 'open' },
        { label: 'Pending', value: 'pending' },
        { label: 'Arrived', value: 'arrived' }
    ]);

    const onSave = () => {
        axios.patch(`${apiPath}/database/${data._id}`, { status: dropdownValue }, {
            headers: { 'auth-token': user.token }
        })
            .then((response) => {
                console.log("update " + response.data._id);
                dispatch(updateOrder(data._id, dropdownValue));
            }).catch(err => alert(err.message))
    }

    const onDelete = () => {
        axios.delete(`${apiPath}/database/${data._id}`, {
            headers: { 'auth-token': user.token }
        })
            .then((response) => {
                console.log("delete " + response.data);
                dispatch(deleteOrder(data._id));
            }).catch(err => alert(err.message))
    }

    return (
        expend ?
            // Expended view
            <View style={styles.expendedContainer}>
                <View style={styles.innerContainer}>
                    <Text style={[styles.label, { marginStart: 10, marginTop: 50, marginBottom: 10 }]}>{new Date(data.date).toDateString()}</Text>
                    <View style={[styles.imageContainer, { flexDirection: 'row' }]}>
                        <Image style={styles.bigPicture} source={{ uri: data.image }} />
                        <View style={{ flex: 1, marginStart: 10, justifyContent: 'center' }}>
                            <Text style={styles.label}>{data.productName}</Text>
                            <Text style={styles.label}>{data.catalogNumber}</Text>
                            <Text style={styles.label}>Size : {data.size}</Text>
                        </View>
                    </View>
                    <View style={[styles.detailsContainer, { marginTop: 10 }]}>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>Is Paid</Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.isPaid ? "Yes" : "No"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>Payment Method</Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.paymentMethod}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>Client Name </Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.clientName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>Phone Number</Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.phoneNumber}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>Address</Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.address}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>Notes</Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.notes}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>Status</Text>
                            <DropDownPicker
                                placeholder={"Status"}
                                open={open}
                                value={dropdownValue}
                                items={items}
                                setOpen={setOpen}
                                setValue={setDropdownValue}
                                setItems={setItems}
                                dropDownDirection='TOP'
                                style={{ flex: 1 }}
                                containerStyle={{ flex: 1 }}
                            />
                        </View>
                        <View style={[styles.row, { justifyContent: 'space-around', marginTop: 20, marginBottom: 10 }]}>
                            <IconButton title="Save" icon="save" onPress={onSave} />
                            <IconButton title="Delete" icon="delete" onPress={onDelete} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={[styles.topArrow, {
                    backgroundColor: data.status === 'open' ?
                        COLORS.OPEN : data.status === 'pending' ?
                            COLORS.PENDING : COLORS.ARRIVED
                }]}
                    onPress={() => setExpended(!expend)}>
                    <AntDesign name='upcircle' size={24} />
                </TouchableOpacity>
            </View>
            :
            // Normal view
            <View style={styles.container}>
                <View style={styles.rowInnerContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.picture} source={{ uri: data.image }} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Product Name : {data.productName}</Text>
                        <Text style={styles.label}>Status : {data.status}</Text>
                        <Text style={styles.label}>Date : {new Date(data.date).toDateString()}</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.sideArrow, {
                    backgroundColor: data.status === 'open' ?
                        COLORS.OPEN : data.status === 'pending' ?
                            COLORS.PENDING : COLORS.ARRIVED
                }]}
                    onPress={() => setExpended(!expend)} >
                    <AntDesign name='downcircle' size={24} style={{ marginEnd: 5 }} />
                </TouchableOpacity>
            </View>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignContent: 'center',
        justifyContent: 'center',
        borderTopStartRadius: 10,
        borderBottomEndRadius: 10,
        padding: 10,
        margin: 10
    },
    expendedContainer: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderTopStartRadius: 10,
        borderBottomEndRadius: 10,
        padding: 10,
        margin: 10
    },
    rowInnerContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 5,
    },
    innerContainer: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 10,
        padding: 5,
    },
    sideArrow: {
        position: 'absolute',
        backgroundColor: '#FFFFAE',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        elevation: 10,
    },
    topArrow: {
        position: 'absolute',
        backgroundColor: '#FFFFAE',
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 10,
        width: 60,
        height: 60,
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
        elevation: 10,
    },
    imageContainer: {
        flex: 1,
        marginStart: 50,
        marginEnd: 10,
    },
    detailsContainer: {
        flex: 3,
        marginStart: 10
    },
    picture: {
        height: 70,
        width: 70,
        borderRadius: 20,
    },
    bigPicture: {
        height: 150,
        width: 150,
        borderRadius: 20,
    },
    label: {
        color: 'black',
        fontSize: 16,
        marginTop: 5,
        fontFamily: 'VarelaRound'
    },
    row: {
        flexDirection: 'row',
        marginTop: 5
    }
})
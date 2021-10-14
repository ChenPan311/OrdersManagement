import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker';
import IconButton from './IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, updateOrder } from '../Actions/OrdersActions';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { setAnimation } from '../Utils/utils';
import { i18n } from '../Utils/i18n/supportedLanguages';

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
        { label: i18n.t('open'), value: 'open' },
        { label: i18n.t('pending'), value: 'pending' },
        { label: i18n.t('arrived'), value: 'arrived' }
    ]);

    const onSave = () => {
        axios.patch(`${apiPath}/database/${data._id}`, { status: dropdownValue }, {
            headers: { 'auth-token': user.token }
        })
            .then((response) => {
                console.log("update " + response.data._id);
                dispatch(updateOrder(data._id, dropdownValue));
                Toast.show(i18n.t('orderUpdated'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            }).catch(err => alert(err.message))
    }

    const onDelete = () => {
        axios.delete(`${apiPath}/database/${data._id}`, {
            headers: { 'auth-token': user.token }
        })
            .then((response) => {
                console.log("delete " + response.data);
                setAnimation();
                dispatch(deleteOrder(data._id));
                Toast.show(i18n.t('orderDeleted'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            }).catch(err => alert(err.message))
    }

    return (
        expend ?
            // Expended view
            <Animated.View style={styles.expendedContainer}>
                <View style={styles.innerContainer}>
                    <Text style={[styles.label, { marginStart: 10, marginTop: 50, marginBottom: 10 }]}>{new Date(data.date).toDateString()}</Text>
                    <View style={[styles.imageContainer, { flexDirection: 'row' }]}>
                        <Image style={styles.bigPicture} source={{ uri: data.image }} />
                        <View style={{ flex: 1, marginStart: 10, justifyContent: 'center' }}>
                            <Text style={styles.label}>{data.productName}</Text>
                            <Text style={styles.label}>{data.catalogNumber}</Text>
                            <Text style={styles.label}>{i18n.t('size')} : {data.size}</Text>
                        </View>
                    </View>
                    <View style={[styles.detailsContainer, { marginTop: 10 }]}>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>{i18n.t('isPaid')}</Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.isPaid ? i18n.t('yes') : i18n.t('no')}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>{i18n.t('paymentMethod')}</Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.paymentMethod}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>{i18n.t('clientName')} </Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.clientName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>{i18n.t('phoneNumber')}</Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.phoneNumber}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>{i18n.t('address')}</Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.address}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>{i18n.t('notes')}</Text>
                            <Text style={[styles.label, { flex: 1 }]}>{data.notes}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.label, { flex: 1, color: 'gray', }]}>{i18n.t('status')}</Text>
                            <DropDownPicker
                                placeholder={i18n.t('status')}
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
                            <IconButton title={i18n.t('save')} icon="save" onPress={onSave} />
                            <IconButton title={i18n.t('delete')} icon="delete" onPress={onDelete} />
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
            </Animated.View>
            :
            // Normal view
            <Animated.View style={styles.container}>
                <View style={styles.rowInnerContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.picture} source={{ uri: data.image }} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>{i18n.t('productName')} : {data.productName}</Text>
                        <Text style={styles.label}>{i18n.t('status')} : {i18n.t(data.status)}</Text>
                        <Text style={styles.label}>{i18n.t('date')} : {new Date(data.date).toDateString()}</Text>
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
            </Animated.View>
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
        marginTop: 5,
        alignItems: 'center'
    }
})
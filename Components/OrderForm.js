import React from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Button from './Button'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants';
import axios from 'axios';

const apiPath = "http://192.168.1.230:3000/api";

const OrderForm = () => {

    const { handleSubmit, reset, control, formState: { errors } } = useForm({
        defaultValues: {
            clientName: "",
            phoneNumber: "",
            address: "",
            notes: "",
            catalogNumber: "",
            size: "",
            productName: "",
            isPaid: 1,
            paymentMethod: 2,
            image: "",
            status: "Open",
        }
    });

    const onSubmit = data => {
        console.log(data);
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ alignSelf: 'center', fontSize: 30, fontFamily: 'VarelaRound' }}>New Order</Text>
                <View style={styles.row}>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.label}>Catalog Number</Text>
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
                            name="catalogNumber"
                            rules={{ required: true }}
                        />
                        {errors.catalogNumber?.type === 'required' && <Text style={styles.error}>catalogNumber is required</Text>}
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Size</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType='decimal-pad'
                                />
                            )}
                            name="size"
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Name</Text>
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
                            name="productName"
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Image style={styles.picture} source={{ uri: 'https://megasport.co.il/pub/media/catalog/product/cache/4161146eb64d6ce2b25df18919b6fded/_/t/_tensaur_run_c_11_.jpg' }} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.label}>Payment Method</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <SegmentedControl
                                    values={['Cash', 'Card', 'Other']}
                                    selectedIndex={value}
                                    backgroundColor='rgba(255,255,255,0.5)'
                                    style={{ height: 40 }}
                                    onChange={(event) => {
                                        onChange(event.nativeEvent.selectedSegmentIndex);
                                    }}
                                />
                            )}
                            name="paymentMethod"
                            defaultValue='Other'
                        />
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.label}>Is Paid</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <SegmentedControl
                                    values={['Yes', 'No']}
                                    selectedIndex={value}
                                    backgroundColor='rgba(255,255,255,0.5)'
                                    style={{ height: 40 }}
                                    onChange={(event) => {
                                        onChange(event.nativeEvent.selectedSegmentIndex);
                                    }}
                                />
                            )}
                            name="isPaid"
                            defaultValue='No'
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.label}>Client Name</Text>
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
                            name="clientName"
                            rules={{ required: true }}
                        />
                        {errors.clientName?.type === 'required' && <Text style={styles.error}>Name is required</Text>}
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.label}>Phone Number</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType='phone-pad'
                                />
                            )}
                            name="phoneNumber"
                            rules={{ required: true }}
                        />
                        {errors.phoneNumber?.type === 'required' && <Text style={styles.error}>Phone is required</Text>}
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Address</Text>
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
                        name="address"
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Notes</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                multiline={true}
                                numberOfLines={3}
                            />
                        )}
                        name="notes"
                    />
                </View>
                <View style={[styles.row, { marginVertical: 40 }]}>
                    <Button title="Submit" onPress={handleSubmit(onSubmit)} />
                    <Button title="Cancel" />
                </View>
            </View>
        </ScrollView>
    )
}

export default OrderForm

const styles = StyleSheet.create({
    label: {
        color: 'black',
        fontSize: 16,
        marginTop: 20,
        fontFamily: 'VarelaRound'
    },
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20,
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
    },
    picture: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        borderRadius: 20,
        margin: 20,
    }
})
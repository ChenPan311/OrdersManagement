import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
import { changeFilter } from '../Actions/FilterActions'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Picker } from '@react-native-picker/picker';

const FilterBar = () => {
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const [value, setValue] = useState(filter.status);
    const [order, setOrder] = useState(filter.order);

    useEffect(() => {
        setValue(filter.status);
    }, [filter])

    return (
        <View style={styles.container}>
            <Text style={{ flex: 1, textAlign: 'center' }}>Filter by</Text>
            <View style={styles.picker}>
                <Picker
                    mode='dropdown'
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) => {
                        setValue(itemValue)
                        dispatch(changeFilter(itemValue, order));
                    }}>
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="Open" value="open" />
                    <Picker.Item label="Pending" value="pending" />
                    <Picker.Item label="Arrived" value="arrived" />
                </Picker>
            </View>
            <SegmentedControl
                values={['Up', 'Down']}
                selectedIndex={order}
                onChange={(event) => {
                    setOrder(event.nativeEvent.selectedSegmentIndex);
                    dispatch(changeFilter(value, event.nativeEvent.selectedSegmentIndex));
                }}
                style={{ flex: 2, height: 40, marginRight: 10, marginLeft: 10 }}
            />
        </View >
    )
}

export default FilterBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    picker: {
        flex: 2,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'white',
    }
})

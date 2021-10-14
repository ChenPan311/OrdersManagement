import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
import { changeFilter } from '../Actions/FilterActions'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Picker } from '@react-native-picker/picker';
import { i18n } from '../Utils/i18n/supportedLanguages';

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
            <Text style={{ flex: 1, textAlign: 'center' }}>{i18n.t('filterBy')}</Text>
            <View style={styles.picker}>
                <Picker
                    mode='dropdown'
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) => {
                        setValue(itemValue)
                        dispatch(changeFilter(itemValue, order));
                    }}>
                    <Picker.Item label={i18n.t('all')} value="all" />
                    <Picker.Item label={i18n.t('open')} value="open" />
                    <Picker.Item label={i18n.t('pending')} value="pending" />
                    <Picker.Item label={i18n.t('arrived')} value="arrived" />
                </Picker>
            </View>
            <SegmentedControl
                values={[i18n.t('up'), i18n.t('down')]}
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

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native'
import { changeFilter } from '../Actions/FilterActions'
import DropDownPicker from 'react-native-dropdown-picker';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const FilterBar = () => {
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(filter.status);
    const [order, setOrder] = useState(1);
    const [items, setItems] = useState([
        { label: 'All', value: 'all' },
        { label: 'Open', value: 'open' },
        { label: 'Pending', value: 'pending' },
        { label: 'Arrived', value: 'arrived' }
    ]);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1, textAlign: 'center' }}>Filter by</Text>
            <DropDownPicker
                placeholder={"Status"}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={() => {
                    dispatch(changeFilter(value, order));
                }}
                style={{ flex: 2 }}
                containerStyle={{ flex: 2 }}
            />
            <SegmentedControl
                values={['Up', 'Down']}
                selectedIndex={order}
                onChange={(event) => {
                    setOrder(event.nativeEvent.selectedSegmentIndex);
                }}
                style={{ flex: 2, height: 40, marginRight: 10, marginLeft: 10 }}
            />
        </View>
    )
}

export default FilterBar

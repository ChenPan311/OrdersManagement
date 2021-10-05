import React, { useState } from 'react'
import { View, Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const FilterBar = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [order, setOrder] = useState(1);
    const [items, setItems] = useState([
        { label: 'Open', value: 'open' },
        { label: 'Pending', value: 'pending' },
        { label: 'Arrived', value: 'arrived' }
    ]);

    return (
        <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 20, padding: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ flex: 1, textAlign: 'center' }}>Filter by</Text>
                <DropDownPicker
                    placeholder={"Status"}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
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
        </View>
    )
}

export default FilterBar

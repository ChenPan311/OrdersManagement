import React, { useRef } from 'react'
import { StatusBar, ImageBackground, View, Text } from 'react-native'
import Button from '../../Components/Button'
import OrderForm from '../../Components/OrderForm'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'

const Orders = () => {
    const renderContent = () => (
        <ImageBackground style={{ padding: 16, height: 450 }} source={require('../../assets/backgrounds/gradient_background.png')}>
            <View style={{ alignSelf: 'center' }}><Text>-------</Text></View>
            <OrderForm />
        </ImageBackground>
    )

    const sheetRef = useRef(null);

    return (
        <ImageBackground source={require('../../assets/backgrounds/background2.png')} style={{ flex: 1 }}>
            <StatusBar barStyle='light-content' />
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <Button title="Open" onPress={() => sheetRef.current.snapTo(0)} />
            </View>
            <BottomSheet ref={sheetRef}
                snapPoints={[450, 300, 0]}
                borderRadius={10}
                renderContent={renderContent}
                enabledContentTapInteraction={false}
            />
        </ImageBackground>
    )
}

export default Orders

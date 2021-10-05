import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import CubeButton from '../../Components/CubeButton'

const Home = ({ navigation }) => {
    return (
        <ImageBackground source={require('../../assets/backgrounds/background2.png')} style={{ flex: 1, justifyContent: 'space-evenly' }}>
            <View style={{ flex: 1 }}>
                <Text>blalbal</Text>
                <Text>blalbal</Text>
                <Text>blalbal</Text>
                <Text>blalbal</Text>
                <Text>blalbal</Text>
                <Text>blalbal</Text>
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
                < CubeButton title="Open" value="3" color="#FFA8A8" onPress={() => navigation.navigate("Orders")} />
                < CubeButton title="Pending" value="7" color="#FFFFAE" onPress={() => navigation.navigate("Orders")} />
                < CubeButton title="Arrived" value="7" color="#ABE2C5" onPress={() => navigation.navigate("Orders")} />
            </View >
        </ImageBackground>
    )
}

export default Home

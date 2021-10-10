import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import CubeButton from '../../Components/CubeButton'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../Actions/FilterActions';

const Home = ({ navigation }) => {

    const dispatch = useDispatch();
    return (
        <ImageBackground source={require('../../assets/backgrounds/background2.png')} style={{ flex: 1, justifyContent: 'space-evenly' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 7, alignItems: 'center', justifyContent: 'center' }}>
                    <AnimatedCircularProgress
                        size={200}
                        width={20}
                        fill={70}
                        tintColor="#12D54F"
                        backgroundColor="gray"
                        padding={0}>
                        {
                            (fill) => (
                                <Text style={{ fontSize: 40, fontFamily: 'VarelaRound' }}>
                                    {fill}%
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
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
                < CubeButton title="Open" value="3" color="#FFA8A8" onPress={() => {
                    dispatch(changeFilter('open', 1));
                    navigation.navigate("Orders")
                }} />
                < CubeButton title="Pending" value="7" color="#FFFFAE" onPress={() => {
                    dispatch(changeFilter('pending', 1));
                    navigation.navigate("Orders")
                }} />
                < CubeButton title="Arrived" value="7" color="#ABE2C5" onPress={() => {
                    dispatch(changeFilter('arrived', 1));
                    navigation.navigate("Orders")
                }} />
            </View >
        </ImageBackground>
    )
}

export default Home

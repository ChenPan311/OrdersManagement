import React from 'react'
import Home from '../Screens/MainScreens/Home';
import Orders from '../Screens/MainScreens/Orders';
import History from '../Screens/MainScreens/History';
import Settings from '../Screens/MainScreens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;
                switch (route.name) {
                    case 'Home':
                        iconName = 'home';
                        break;
                    case 'Orders':
                        iconName = 'hdd';
                        break;
                    case 'History':
                        iconName = 'sync';
                        break;
                    case 'Settings':
                        iconName = 'setting'
                        break;
                }
                // You can return any component that you like here!
                return <AntDesign name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: '#ABE2C5',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
        })}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    )
}

export default MainNavigation

import React from 'react'
import Home from '../Screens/MainScreens/Home';
import Orders from '../Screens/MainScreens/Orders';
import History from '../Screens/MainScreens/History';
import Settings from '../Screens/MainScreens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { i18n } from '../Utils/i18n/supportedLanguages';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    return (
        <Tab.Navigator initialRouteName={i18n.t('home')} screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;
                switch (route.name) {
                    case i18n.t('home'):
                        iconName = 'home';
                        break;
                    case i18n.t('orders'):
                        iconName = 'hdd';
                        break;
                    case i18n.t('history'):
                        iconName = 'sync';
                        break;
                    case i18n.t('settings'):
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
            <Tab.Screen name={i18n.t('home')} component={Home} />
            <Tab.Screen name={i18n.t('orders')} component={Orders} />
            <Tab.Screen name={i18n.t('history')} component={History} />
            <Tab.Screen name={i18n.t('settings')} component={Settings} />
        </Tab.Navigator>
    )
}

export default MainNavigation

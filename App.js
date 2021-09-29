import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import Register from './Screens/Register';
import { Provider } from 'react-redux';
import store from './store'
import * as Font from 'expo-font';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    Font.loadAsync({
      'VarelaRound': require('./assets/fonts/VarelaRound-Regular.ttf'),
    }).then(() => setFontLoaded(true));
  }, []);

  if (fontLoaded)
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  else return (<ActivityIndicator size='large' color='black' style={{ flex: 1, alignSelf: 'center' }} />)
}


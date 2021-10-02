import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './Navigation/AuthNavigation';
import MainNavigation from './Navigation/MainNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'
import * as Font from 'expo-font';
import { ActivityIndicator } from 'react-native';

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    Font.loadAsync({
      'VarelaRound': require('./assets/fonts/VarelaRound-Regular.ttf'),
    }).then(() => setFontLoaded(true));
  }, []);

  if (fontLoaded) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            {store.getState().user.isAuthenticated ?
              <MainNavigation />
              :
              <AuthNavigation />
            }
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
  else return (<ActivityIndicator size='large' color='black' style={{ flex: 1, alignSelf: 'center' }} />)
}


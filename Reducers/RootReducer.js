import { combineReducers } from 'redux'
import persistReducer from 'redux-persist/lib/persistReducer'
import UserReducer from './UserReducer'
import SettingReducer from './SettingsReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const authPersistConfig = {
    key: 'user',
    storage: AsyncStorage,
}

const settingsPersistConfig = {
    key: 'settings',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    user: UserReducer,
    settings: SettingReducer,
})

export default persistReducer(persistConfig, rootReducer)
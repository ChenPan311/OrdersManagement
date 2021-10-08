import { combineReducers } from 'redux'
import persistReducer from 'redux-persist/lib/persistReducer'
import UserReducer from './UserReducer'
import SettingReducer from './SettingsReducer'
import OrdersReducer from './OrdersReducer'
import FilterReducer from './FilterReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['orders', 'filter']
}

const rootReducer = combineReducers({
    user: UserReducer,
    settings: SettingReducer,
    orders: OrdersReducer,
    filter: FilterReducer
})

export default persistReducer(persistConfig, rootReducer)
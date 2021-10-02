import { combineReducers } from 'redux'
import persistReducer from 'redux-persist/lib/persistReducer'
import UserReducer from './UserReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    user: persistReducer(persistConfig, UserReducer),
})

export default rootReducer
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../Actions/ActionTypes'
import * as SecureStore from 'expo-secure-store';

const save = async (key, value) => {
    return await SecureStore.setItemAsync(key, value);
}

const getValue = async (key) => {
    return await SecureStore.getItemAsync(key);
}

const remove = async (key) => {
    return await SecureStore.deleteItemAsync(key);
}

initialState = {
    token: getValue('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            console.log("USER_LOADING");
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            console.log("USER_LOADED");
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            save('token', state.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            remove('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}

export default UserReducer;
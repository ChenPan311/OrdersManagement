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

initialState = {
    token: null,
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
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user._id
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.data
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
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
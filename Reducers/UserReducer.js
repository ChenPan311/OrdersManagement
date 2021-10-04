import {
    USER_LOADED,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
} from '../Actions/ActionTypes'

const initialState = {
    token: null,
    isAuthenticated: null,
    isLoading: false,
    user: null,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user._id
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.data
            };
        case LOGOUT_SUCCESS:
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
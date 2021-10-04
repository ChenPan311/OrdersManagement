import {
    USER_LOADED,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
} from '../Actions/ActionTypes'

const initialState = {
    token: null,
    user: null,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user._id
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user._id
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                user: null,
            };
        default:
            return state;
    }
}

export default UserReducer;
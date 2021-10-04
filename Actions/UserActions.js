import { USER_LOADED, LOGOUT_SUCCESS, REGISTER_SUCCESS } from './ActionTypes'


export const signIn = (id, token) => ({
    type: USER_LOADED,
    payload: {
        user: {
            '_id': id
        },
        'token': token,
    }
});

export const register = (id, token) => ({
    type: REGISTER_SUCCESS,
    payload: {
        user: {
            '_id': id
        },
        'token': token,
    },
});

export const signOut = () => ({ type: LOGOUT_SUCCESS });
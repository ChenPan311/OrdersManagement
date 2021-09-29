import { USER_LOADED, LOGOUT_SUCCESS } from './ActionTypes'


export const signIn = (email, password) => ({
    type: USER_LOADED,
    payload: { user: { 'email': email, 'password': password } }
});

export const signOut = () => ({ type: LOGOUT_SUCCESS });
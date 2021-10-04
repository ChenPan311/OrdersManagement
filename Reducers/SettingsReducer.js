import { LOAD_SETTINGS, SAVE_SETTINGS } from "../Actions/ActionTypes";

const initialState = {
    maxOrders: 100,
    autoDelete: 21,
};

const SettingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SETTINGS:
            return {
                ...state,
            }
        case SAVE_SETTINGS:
            return {
                maxOrders: action.payload.orders,
                autoDelete: action.payload.delete
            }
        default:
            return state;
    }
}

export default SettingReducer;
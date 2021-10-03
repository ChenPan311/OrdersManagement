import { LOAD_SETTINGS, SAVE_SETTINGS } from "./ActionTypes";

export const loadSettings = () => ({
    type: LOAD_SETTINGS
});

export const saveSettings = (orders, _delete) => ({
    type: SAVE_SETTINGS,
    payload: {
        'orders': orders,
        'delete': _delete
    }
});
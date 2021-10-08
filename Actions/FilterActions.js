import { FILTER_CHANGE } from "./ActionTypes";

export const changeFilter = (status, order) => ({
    type: FILTER_CHANGE,
    payload: {
        'status': status,
        'order': order
    }
});
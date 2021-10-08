import { FILTER_CHANGE } from "../Actions/ActionTypes";

const initialState = {
    status: "all",
    order: 1
};

const FilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_CHANGE:
            return {
                'status': action.payload.status,
                'order': action.payload.order
            }
        default:
            return state;
    }
}

export default FilterReducer
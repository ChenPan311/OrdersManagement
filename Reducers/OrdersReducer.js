import { LOAD_ORDERS, ADD_ORDER, UPDATE_ORDER, DELETE_ORDER, FILTER_ORDERS } from "../Actions/ActionTypes";

const initialState = {
    orders: [],
};

const OrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ORDERS:
            return {
                orders: action.payload
            }
        case FILTER_ORDERS:
            return {
                orders: state.orders.filter((order) => {
                    order.status === action.payload
                })
            }
        case ADD_ORDER:
            return {
                orders: [
                    ...state,
                    action.payload
                ]
            }
        case UPDATE_ORDER:
            return {
                orders: state.orders.map((order) => {
                    (order.id === action.payload.id)
                        ? { ...order, status: action.payload.status }
                        : order
                })
            }
        case DELETE_ORDER:
            return {
                orders: state.orders.filter((order) => {
                    order.id !== action.payload
                })
            }
        default:
            return state;
    }
}

export default OrdersReducer;
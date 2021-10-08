import { LOAD_ORDERS, ADD_ORDER, UPDATE_ORDER, DELETE_ORDER, FILTER_ORDERS } from "../Actions/ActionTypes";
import { data } from '../assets/data'
const initialState = {
    orders: data,
    filteredOrders: data
};

const OrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ORDERS:
            return {
                orders: action.payload
            }
        case FILTER_ORDERS:
            if (action.payload !== 'all')
                return {
                    ...state,
                    filteredOrders: state.orders.filter((order) => {
                        return order.status == action.payload
                    })
                }
            else
                return {
                    ...state,
                    filteredOrders: data
                }
        case ADD_ORDER:
            return {
                ...state,
                orders: [
                    ...state,
                    action.payload
                ]
            }
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map((order) => {
                    (order.id === action.payload.id)
                        ? { ...order, status: action.payload.status }
                        : order
                })
            }
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter((order) => {
                    order.id !== action.payload
                })
            }
        default:
            return state;
    }
}

export default OrdersReducer;
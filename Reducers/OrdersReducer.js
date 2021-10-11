import { LOAD_ORDERS, ADD_ORDER, UPDATE_ORDER, DELETE_ORDER, FILTER_ORDERS } from "../Actions/ActionTypes";
import { data } from '../assets/data'
const initialState = {
    orders: [],
    filteredOrders: []
};

const OrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ORDERS:
            return {
                orders: action.payload,
                filteredOrders: action.payload
            }
        case FILTER_ORDERS:
            if (state.orders != [])
                if (action.payload.status !== 'all')
                    return {
                        ...state,
                        filteredOrders: state.orders.filter((order) => {
                            return order.status == action.payload.status
                        }).sort((a, b) => {
                            if (action.payload.order == 0)
                                return a.date.localeCompare(b.date);
                            else return b.date.localeCompare(a.date);
                        })

                    }
                else
                    return {
                        ...state,
                        filteredOrders: state.orders.sort((a, b) => {
                            if (action.payload.order == 0)
                                return a.date.localeCompare(b.date);
                            else return b.date.localeCompare(a.date);
                        })
                    }
        case ADD_ORDER:
            return {
                orders: [
                    ...state.orders,
                    action.payload
                ],
                filteredOrders: [
                    ...state.filteredOrders,
                    action.payload
                ]
            }
        case UPDATE_ORDER:
            return {
                filteredOrders: state.filteredOrders.map(order =>
                    order._id === action.payload.id ?
                        { ...order, status: action.payload.status } :
                        order
                ),
                orders: state.orders.map(order =>
                    order._id === action.payload.id ?
                        { ...order, status: action.payload.status } :
                        order
                ),
            }
        case DELETE_ORDER:
            return {
                filteredOrders: state.filteredOrders.filter((order) =>
                    order._id !== action.payload
                ),
                orders: state.orders.filter((order) =>
                    order._id !== action.payload
                )
            }
        default:
            return state;
    }
}

export default OrdersReducer;
import { LOAD_ORDERS, ADD_ORDER, UPDATE_ORDER, DELETE_ORDER, FILTER_ORDERS } from "./ActionTypes";

export const loadOrders = (orders) => ({
    type: LOAD_ORDERS,
    payload: orders
});

export const filterOrders = (status) => ({
    type: FILTER_ORDERS,
    payload: status
})

export const addOrder = (order) => ({
    type: ADD_ORDER,
    payload: order
});

export const updateOrder = (_id, status) => ({
    type: UPDATE_ORDER,
    payload: { 'id': _id, 'status': status }
});

export const deleteOrder = (_id) => ({
    type: DELETE_ORDER,
    payload: _id
});
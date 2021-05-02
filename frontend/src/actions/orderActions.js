import {ORDER_ADD_FAIL,
    ORDER_ADD_REQ,
    ORDER_ADD_SUC,
    ORDER_DET_SUC,
    ORDER_DET_REQ,
    ORDER_DET_FAIL,
    ORDER_PAY_SUC,
    ORDER_PAY_REQ,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    USER_ORDERS_FAIL,
    USER_ORDERS_SUC,
    USER_ORDERS_REQ,
    ORDERS_REQ,
    ORDERS_SUC,
    ORDERS_FAIL} from "../constants/storeConst"
import axios from 'axios'

export const addOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_ADD_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: ORDER_ADD_SUC,
            payload: data
        })  
    }
    catch(error){
        dispatch({
            type: ORDER_ADD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderById = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_DET_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/${id}`, config)
        dispatch({
            type: ORDER_DET_SUC,
            payload: data
        })  
    }
    catch(error){
        dispatch({
            type: ORDER_DET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrderAction = (orderId, paymentResult) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_PAY_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        dispatch({
            type: ORDER_PAY_SUC,
            payload: data
        })  
    }
    catch(error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const userOrdersAction = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_ORDERS_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/userorders`, config)
        dispatch({
            type: USER_ORDERS_SUC,
            payload: data
        })  
    }
    catch(error){
        dispatch({
            type: USER_ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const ordersAction = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDERS_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders`, config)
        dispatch({
            type: ORDERS_SUC,
            payload: data
        })  
    }
    catch(error){
        dispatch({
            type: ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
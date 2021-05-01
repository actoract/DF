import {ORDER_ADD_FAIL,
    ORDER_ADD_REQ,
    ORDER_ADD_SUC,
    ORDER_ADD_RESET,
    ORDER_DET_SUC,
    ORDER_DET_REQ,
    ORDER_DET_FAIL,
    ORDER_PAY_RESET,
    USER_ORDERS_REQ,
    USER_ORDERS_SUC,
    USER_ORDERS_FAIL} from "../constants/storeConst"

export const orderAddRecuder = (state = {}, action) => {
    switch(action.type){
        case ORDER_ADD_REQ:
            return{
                loading: true
            }
        case ORDER_ADD_SUC:
            return{
                loading: false,
                success:true,
                order: action.payload
            }
        case ORDER_ADD_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case ORDER_ADD_RESET:
            return {}
        default:
            return state
    }
}

export const getOrderByIdReducer = (state = {loading: true, orderItems: [], deliveryAddress: {}}, action) => {
    switch(action.type){
        case ORDER_DET_REQ:
            return{
                ...state,
                loading: true
            }
        case ORDER_DET_SUC:
            return{
                loading: false,
                order: action.payload
            }
        case ORDER_DET_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

/*export const orderPayReducer = (state = {}, action) => {
    switch(action.type){
        case ORDER_PAY_REQ:
            return{
                loading: true
            }
        case ORDER_PAY_SUC:
            return{
                loading: false,
                success: true
            }
        case ORDER_PAY_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case ORDER_PAY_RESET:
            return{}
        default:
            return state
    }
}*/


export const userOrdersReducer = (state = {orders:[]}, action) => {
    switch(action.type){
        case USER_ORDERS_REQ:
            return{
                loading: true
            }
        case USER_ORDERS_SUC:
            return{
                loading: false,
                orders: action.payload
            }
        case USER_ORDERS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
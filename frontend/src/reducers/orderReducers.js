import {ORDER_ADD_FAIL,
    ORDER_ADD_REQ,
    ORDER_ADD_SUC,
    ORDER_DET_SUC,
    ORDER_DET_REQ,
    ORDER_DET_FAIL} from "../constants/storeConst"

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
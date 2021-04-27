import {ORDER_ADD_FAIL,
ORDER_ADD_REQ,
ORDER_ADD_SUC} from "../constants/storeConst"

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
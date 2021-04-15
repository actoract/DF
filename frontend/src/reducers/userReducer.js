import {LOGIN_REQ, LOGIN_SUC, LOGIN_FAIL, LOGOUT, REG_REQ, REG_SUC, REG_FAIL} from '../constants/storeConst'

export const userLoginReducer = (state = {}, action) => {
    switch(action.type){
        case LOGIN_REQ:
            return { 
                loadingVal: true
            }
        case LOGIN_SUC:
            return{
                loadingVal: false,
                userInfo: action.payload
            }
        case LOGIN_FAIL:
            return{
                loadingVal: false,
                error: action.payload
            }
        case LOGOUT:
            return{}
        default:
            return state
    }
}


export const userRegReducer = (state = {}, action) => {
    switch(action.type){
        case REG_REQ:
            return { 
                loadingVal: true
            }
        case REG_SUC:
            return{
                loadingVal: false,
                userInfo: action.payload
            }
        case REG_FAIL:
            return{
                loadingVal: false,
                error: action.payload
            }
        default:
            return state
    }
}
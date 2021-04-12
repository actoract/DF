import {LOGIN_REQ, LOGIN_SUC, LOGIN_FAIL, LOGOUT} from '../constants/userConst'

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
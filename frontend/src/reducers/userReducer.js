import {LOGIN_REQ, LOGIN_SUC, LOGIN_FAIL, LOGOUT_REQ, REG_REQ, REG_SUC, REG_FAIL, 
    USER_PROFILE_REQ, USER_PROFILE_SUC, USER_PROFILE_FAIL, USER_PROFILE_RESET,
    USER_PROFILE_UPD_REQ, USER_PROFILE_UPD_SUC, USER_PROFILE_UPD_FAIL, USER_PROFILE_UPD_RESET,
    USERS_FAIL, USERS_SUC, USERS_REQ, USERS_RESET} from '../constants/storeConst'

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
        case LOGOUT_REQ:
            return{

            }
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



export const userProfileReducer = (state = {user: {}}, action) => {
    switch(action.type){
        case USER_PROFILE_REQ:
            return { 
                ...state,
                loadingVal: true
            }
        case USER_PROFILE_SUC:
            return{
                loadingVal: false,
                user: action.payload
            }
        case USER_PROFILE_FAIL:
            return{
                loadingVal: false,
                error: action.payload
            }
        case USER_PROFILE_RESET:
            return{}
        default:
            return state
    }
}

export const userProfileUpdReducer = (state = {}, action) => {
    switch(action.type){
        case USER_PROFILE_UPD_REQ:
            return { 
                loading: true
            }
        case USER_PROFILE_UPD_SUC:
            return{
                loading: false,
                success: true,
            }
        case USER_PROFILE_UPD_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case USER_PROFILE_UPD_RESET:
            return{
                user:{}
            }
        default:
            return state
    }
}

export const usersReducer = (state = {users: []}, action) => {
    switch(action.type){
        case USERS_REQ:
            return { 
                ...state,
                loading: true
            }
        case USERS_SUC:
            return{
                loading: false,
                users: action.payload
            }
        case USERS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case USERS_RESET:
            return{
                users: []
            }
        default:
            return state
    }
}
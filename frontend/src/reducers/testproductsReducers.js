import {TEST_PRODUCTS_LIST_REQ, 
    TEST_PRODUCTS_LIST_SUCC, 
    TEST_PRODUCTS_LIST_FAIL,
    TEST_PRODUCTS_DET_REQ, 
    TEST_PRODUCTS_DET_SUCC, 
    TEST_PRODUCTS_DET_FAIL,
    TEST_PRODUCTS_DELETE_REQ,
    TEST_PRODUCTS_DELETE_FAIL,
    TEST_PRODUCTS_DELETE_SUCC,
    TEST_PRODUCTS_CREATE_REQ,
    TEST_PRODUCTS_CREATE_SUCC,
    TEST_PRODUCTS_CREATE_FAIL,
    TEST_PRODUCTS_CREATE_RESET,
    TEST_PRODUCTS_UPDATE_REQ,
    TEST_PRODUCTS_UPDATE_SUCC,
    TEST_PRODUCTS_UPDATE_FAIL,
    TEST_PRODUCTS_UPDATE_RESET,

} from '../constants/storeConst'

export const testproductsReducer = (state = { testproducts: [] }, action) => {
    switch(action.type){
        case TEST_PRODUCTS_LIST_REQ:
            return { 
                loadingVal: true,
                testproducts: []
            }
        case TEST_PRODUCTS_LIST_SUCC:
            return{
                loadingVal: false,
                testproducts: action.payload
            }
        case TEST_PRODUCTS_LIST_FAIL:
            return{
                loadingVal: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const testproductDetReducer = (state = { testproduct: {
    name: {
        nameRus: "",
        nameEng: ""
    },
    description: {
        care: "",
        material: "",
        color: ""
    },
} }, action) => {
    switch(action.type){
        case TEST_PRODUCTS_DET_REQ:
            return { 
                loadingVal: true,
                ...state
            }
        case TEST_PRODUCTS_DET_SUCC:
            return{
                loadingVal: false,
                testproduct: action.payload
            }
        case TEST_PRODUCTS_DET_FAIL:
            return{
                loadingVal: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const testproductDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case TEST_PRODUCTS_DELETE_REQ:
            return { 
                loading: true
            }
        case TEST_PRODUCTS_DELETE_SUCC:
            return{
                loading: false,
                success: true
            }
        case TEST_PRODUCTS_DELETE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const testproductCreateReducer = (state = {}, action) => {
    switch(action.type){
        case TEST_PRODUCTS_CREATE_REQ:
            return { 
                loading: true
            }
        case TEST_PRODUCTS_CREATE_SUCC:
            return{
                loading: false,
                success: true,
                testproduct: action.payload
            }
        case TEST_PRODUCTS_CREATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case TEST_PRODUCTS_CREATE_RESET:{
            return {}
        }
        default:
            return state
    }
}

export const testproductUpdateReducer = (state = {testproduct: {}}, action) => {
    switch(action.type){
        case TEST_PRODUCTS_UPDATE_REQ:
            return { 
                loading: true
            }
        case TEST_PRODUCTS_UPDATE_SUCC:
            return{
                loading: false,
                success: true,
                testproduct: action.payload
            }
        case TEST_PRODUCTS_UPDATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case TEST_PRODUCTS_UPDATE_RESET:{
            return {
                testproduct:{}
            }
        }
        default:
            return state
    }
}
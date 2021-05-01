import {PRODUCTS_LIST_REQ, 
    PRODUCTS_LIST_SUCC, 
    PRODUCTS_LIST_FAIL,
    PRODUCTS_DET_REQ,
    PRODUCTS_DET_SUCC,
    PRODUCTS_DET_FAIL,
    PRODUCTS_DELETE_REQ,
    PRODUCTS_DELETE_SUCC,
    PRODUCTS_DELETE_FAIL,
    PRODUCTS_CREATE_REQ,
    PRODUCTS_CREATE_SUCC,
    PRODUCTS_CREATE_FAIL,
    PRODUCTS_CREATE_RESET,
    PRODUCTS_UPDATE_REQ,
    PRODUCTS_UPDATE_SUCC,
    PRODUCTS_UPDATE_FAIL,
    PRODUCTS_UPDATE_RESET
} from '../constants/storeConst'

export const productsReducer = (state = { products: [] }, action) => {
    switch(action.type){
        case PRODUCTS_LIST_REQ:
            return { 
                loadingVal: true,
                products: []
            }
        case PRODUCTS_LIST_SUCC:
            return{
                loadingVal: false,
                products: action.payload
            }
        case PRODUCTS_LIST_FAIL:
            return{
                loadingVal: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const productDetReducer = (state = { product: {
    name: {
        nameRus: "",
        nameEng: ""
    },
    description: {
        care: "",
        material: "",
        color: ""
    },
    price: {
        priceDigital: "",
        priceReal: ""},
    sizeStatus: {
        size: "", 
        countInStock: ""},
} }, action) => {
    switch(action.type){
        case PRODUCTS_DET_REQ:
            return { 
                loadingVal: true,
                ...state
            }
        case PRODUCTS_DET_SUCC:
            return{
                loadingVal: false,
                product: action.payload
            }
        case PRODUCTS_DET_FAIL:
            return{
                loadingVal: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCTS_DELETE_REQ:
            return { 
                loading: true
            }
        case PRODUCTS_DELETE_SUCC:
            return{
                loading: false,
                success: true
            }
        case PRODUCTS_DELETE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCTS_CREATE_REQ:
            return { 
                loading: true
            }
        case PRODUCTS_CREATE_SUCC:
            return{
                loading: false,
                success: true,
                product: action.payload
            }
        case PRODUCTS_CREATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case PRODUCTS_CREATE_RESET:{
            return {}
        }
        default:
            return state
    }
}

export const productUpdateReducer = (state = {product: {}}, action) => {
    switch(action.type){
        case PRODUCTS_UPDATE_REQ:
            return { 
                loading: true
            }
        case PRODUCTS_UPDATE_SUCC:
            return{
                loading: false,
                success: true,
                product: action.payload
            }
        case PRODUCTS_UPDATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case PRODUCTS_UPDATE_RESET:{
            return {
                product:{}
            }
        }
        default:
            return state
    }
}
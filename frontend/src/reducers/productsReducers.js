import {PRODUCTS_LIST_REQ, 
    PRODUCTS_LIST_SUCC, 
    PRODUCTS_LIST_FAIL,
    PRODUCTS_DET_REQ,
    PRODUCTS_DET_SUCC,
    PRODUCTS_DET_FAIL
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
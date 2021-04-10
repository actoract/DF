import {TEST_PRODUCTS_LIST_REQ, 
    TEST_PRODUCTS_LIST_SUCC, 
    TEST_PRODUCTS_LIST_FAIL,
    TEST_PRODUCTS_DET_REQ, 
    TEST_PRODUCTS_DET_SUCC, 
    TEST_PRODUCTS_DET_FAIL,

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
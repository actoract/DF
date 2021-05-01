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

} from '../constants/storeConst'
import axios from 'axios'

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


export const testproductDeleteReducer = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TEST_PRODUCTS_DELETE_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/testproducts/${id}`, config)
        dispatch({
            type: TEST_PRODUCTS_DELETE_SUCC,
        })  
    }
    catch(error){
        dispatch({
            type: TEST_PRODUCTS_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const testproductCreateReducer = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: TEST_PRODUCTS_CREATE_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`/api/testproducts`, {}, config)
        dispatch({
            type: TEST_PRODUCTS_CREATE_SUCC,
            payload: data
        })  
    }
    catch(error){
        dispatch({
            type: TEST_PRODUCTS_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
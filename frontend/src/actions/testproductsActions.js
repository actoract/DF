import {TEST_PRODUCTS_LIST_REQ, 
    TEST_PRODUCTS_LIST_SUCC, 
    TEST_PRODUCTS_LIST_FAIL,
    TEST_PRODUCTS_DET_REQ, 
    TEST_PRODUCTS_DET_SUCC,
    TEST_PRODUCTS_DET_FAIL
} from '../constants/storeConst'
import axios from 'axios'

export const testproductsListAction = () => async (dispatch) => {
    try{
        dispatch({type: TEST_PRODUCTS_LIST_REQ})
        const { data } = await axios.get('/api/testproducts')
        dispatch({
            type: TEST_PRODUCTS_LIST_SUCC,
            payload: data
        })
    }
    catch (error){
        dispatch({
            type: TEST_PRODUCTS_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const testproductDetAction = (id) => async (dispatch) => {
    try{
        dispatch({type: TEST_PRODUCTS_DET_REQ})
        const { data } = await axios.get(`/api/testproducts/${id}`)
        dispatch({
            type: TEST_PRODUCTS_DET_SUCC,
            payload: data
        })
    }
    catch (error){
        dispatch({
            type: TEST_PRODUCTS_DET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
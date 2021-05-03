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
    TEST_PRODUCTS_REVIEW_REQ,
    TEST_PRODUCTS_REVIEW_SUCC,
    TEST_PRODUCTS_REVIEW_FAIL,
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


export const deleteTestProductAction = (id) => async (dispatch, getState) => {
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


export const createTestProductAction = () => async (dispatch, getState) => {
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

export const reviewTestProductAction = (testproductId, review) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TEST_PRODUCTS_REVIEW_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/testproducts/${testproductId}/reviews`, review, config)
        dispatch({
            type: TEST_PRODUCTS_REVIEW_SUCC,
        })  
    }
    catch(error){
        dispatch({
            type: TEST_PRODUCTS_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
import {PRODUCTS_LIST_REQ, 
    PRODUCTS_LIST_SUCC, 
    PRODUCTS_LIST_FAIL,
    PRODUCTS_DET_REQ, 
    PRODUCTS_DET_SUCC, 
    PRODUCTS_DET_FAIL,
    PRODUCTS_DELETE_REQ,
    PRODUCTS_DELETE_FAIL,
    PRODUCTS_DELETE_SUCC,
    PRODUCTS_CREATE_REQ,
    PRODUCTS_CREATE_SUCC,
    PRODUCTS_CREATE_FAIL,
    PRODUCTS_UPDATE_REQ,
    PRODUCTS_UPDATE_SUCC,
    PRODUCTS_UPDATE_FAIL,
    PRODUCTS_UPDATE_RESET,

} from '../constants/storeConst'
import axios from 'axios'

export const productsListAction = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCTS_LIST_REQ})
        const { data } = await axios.get('/api/products/')
        dispatch({
            type: PRODUCTS_LIST_SUCC,
            payload: data
        })
    }
    catch (error){
        dispatch({
            type: PRODUCTS_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const productDetAction = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCTS_DET_REQ})
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCTS_DET_SUCC,
            payload: data
        })
    }
    catch (error){
        dispatch({
            type: PRODUCTS_DET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProductAction = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCTS_DELETE_REQ
        })
        const {userLogin: {userDet}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userDet.token}`
            }
        }
        await axios.delete(`/api/products/${id}`, config)
        dispatch({
            type: PRODUCTS_DELETE_SUCC,
        })  
    }
    catch(error){
        dispatch({
            type: PRODUCTS_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const createProductAction = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCTS_CREATE_REQ
        })
        const {userLogin: {userDet}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userDet.token}`
            }
        }
        const {data} = await axios.post(`/api/products`, {}, config)
        dispatch({
            type: PRODUCTS_CREATE_SUCC,
            payload: data
        })  
    }
    catch(error){
        dispatch({
            type: PRODUCTS_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateProductAction = (product) => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCTS_UPDATE_REQ
        })
        const {userLogin: {userDet}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDet.token}`
            }
        }
        const {data} = await axios.put(`/api/products/${product._id}`, product, config)
        dispatch({
            type: PRODUCTS_UPDATE_SUCC,
            payload: data
        })  
    }
    catch(error){
        dispatch({
            type: PRODUCTS_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
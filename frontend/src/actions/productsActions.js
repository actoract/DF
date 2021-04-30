import {PRODUCTS_LIST_REQ, 
    PRODUCTS_LIST_SUCC, 
    PRODUCTS_LIST_FAIL,
    PRODUCTS_DET_REQ, 
    PRODUCTS_DET_SUCC, 
    PRODUCTS_DET_FAIL,
    PRODUCTS_DELETE_REQ,
    PRODUCTS_DELETE_FAIL,
    PRODUCTS_DELETE_SUCC,

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
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
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
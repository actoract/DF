import {ORDER_ADD_FAIL,
    ORDER_ADD_REQ,
    ORDER_ADD_SUC} from "../constants/storeConst"
import axios from 'axios'

export const addOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_ADD_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: ORDER_ADD_SUC,
            payload: data
        })  
    }
    catch(error){
        dispatch({
            type: ORDER_ADD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
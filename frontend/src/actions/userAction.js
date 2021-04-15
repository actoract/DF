import { LOGIN_FAIL, LOGIN_REQ, LOGIN_SUC, LOGOUT, REG_REQ, REG_SUC, REG_FAIL } from "../constants/storeConst"
import axios from 'axios'

export const loginAction = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: LOGIN_REQ
        })
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login', {email, password}, config)
        dispatch({
            type: LOGIN_SUC,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const regAction = (firstName, lastName, email, password) => async (dispatch) => {
    try{
        dispatch({
            type: REG_REQ
        })
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.post('/api/users', {firstName, lastName, email, password}, config)
        dispatch({
            type: REG_SUC,
            payload: data
        })
        dispatch({
            type: LOGIN_SUC,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type: REG_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const logoutAction = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: LOGOUT})
}
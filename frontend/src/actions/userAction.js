import { LOGIN_FAIL, LOGIN_REQ, LOGIN_SUC, LOGOUT_REQ, 
    REG_REQ, REG_SUC, REG_FAIL, 
    USER_PROFILE_REQ, USER_PROFILE_SUC, USER_PROFILE_FAIL,
    USER_PROFILE_UPD_REQ, USER_PROFILE_UPD_SUC, USER_PROFILE_UPD_FAIL,
    USERS_REQ, USERS_SUC, USERS_FAIL, USERS_RESET} from "../constants/storeConst"
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
export const logoutAction = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: LOGOUT_REQ})
    dispatch({type: USERS_RESET})

}

export const getProfileAction = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_PROFILE_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: USER_PROFILE_SUC,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updProfileAction = (user, id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_PROFILE_UPD_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/${user._id}`, user, config)
        dispatch({
            type: USER_PROFILE_UPD_SUC
        })
        dispatch({
            type: USER_PROFILE_SUC,
            payload: data
        })
        //localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type: USER_PROFILE_UPD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const usersAction = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: USERS_REQ
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('/api/users', config)
        dispatch({
            type: USERS_SUC,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: USERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
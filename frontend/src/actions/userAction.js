import { LOGIN_FAIL, LOGIN_REQ, LOGIN_SUC } from "../constants/userConst"
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
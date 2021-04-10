import axios from 'axios'
import {CART_ADD, CART_REMOVE, CART_CHANGE} from '../constants/storeConst'

export const addToCart = (stateNumber, id, qty, type, size, countInStock) => async (dispatch, getState) =>{
    const {data} = await axios.get(`/api/products/${id}`)
    let count
    const keys = Object.keys(data.sizeStatus); 
    for (let key of keys) {
        if (data.sizeStatus[key].size == size){
            count = data.sizeStatus[key].countInStock
        }
    }
    dispatch({
        type: CART_ADD,
        payload:{
            id: stateNumber,
            product:data._id,
            name: data.name,
            image: data.image,
            price: type == "dc" ? data.price.priceDigital : data.price.priceReal * qty,
            sizeStatus: data.sizeStatus,
            type,
            qty: type == "dc" ? 1 :  qty,
            size,
            countInStock: count,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id, size) => (dispatch, getState) =>{
    dispatch({
        type: CART_REMOVE,
        payload: {
            id: id,
            size: size
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const changeCart = (stateNumber, id, qty, type, size, countInStock) => async (dispatch, getState) =>{
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type: CART_CHANGE,
        payload:{
            id: stateNumber,
            product:data._id,
            name: data.name,
            image: data.image,
            price: type == "dc" ? data.price.priceDigital : data.price.priceReal * qty,
            sizeStatus: data.sizeStatus,
            type,
            qty: type == "dc" ? 1 :  qty,
            size,
            countInStock
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
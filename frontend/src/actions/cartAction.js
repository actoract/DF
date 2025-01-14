import axios from 'axios'
import {CART_ADD, 
    CART_REMOVE, 
    CART_CHANGE, 
    CART_SAVE_ADDRESS,
    CART_SAVE_PAYMENT_METHOD} from '../constants/storeConst'

export const addToCart = (stateNumber, id, qty, type, size, maxQty, custImage) => async (dispatch, getState) =>{
    const {data} = await axios.get(`/api/products/${id}`)
    let count
    /*const keys = Object.keys(data.sizeStatus); 
    for (let key of keys) {
        if (data.sizeStatus[key].size == size){
            count = data.sizeStatus[key].countInStock
        }
    }*/
    dispatch({
        type: CART_ADD,
        payload:{
            id: stateNumber,
            product:data._id,
            name: data.name,
            image: data.image,
            price: type == "dc" ? data.price.priceDigital : data.price.priceReal,
            //sizeStatus: data.sizeStatus,
            type,
            qty: type == "dc" ? 1: qty,
            size,
            custImage:custImage,
            //custImage
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().userCart.cartItems))
}

export const removeFromCart = (product, size, type) => (dispatch, getState) =>{
    dispatch({
        type: CART_REMOVE,
        payload: {
            size: size,
            product: product,
            type: type
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().userCart.cartItems))
}

export const changeCart = (stateNumber, id, qty, type, size, maxQty, file) => async (dispatch, getState) =>{
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
            maxQty: maxQty,
            custImage: file
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().userCart.cartItems))
}

export const saveAddress = (data) => (dispatch) =>{
    dispatch({
        type: CART_SAVE_ADDRESS,
        payload: data
    })
    localStorage.setItem('deliveryAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) =>{
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
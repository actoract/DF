import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productsReducer} from './reducers/productsReducers'
import {testproductsReducer} from './reducers/testproductsReducers'
import {productDetReducer} from './reducers/productsReducers'
import {testproductDetReducer} from './reducers/testproductsReducers'
import {cartReducer} from './reducers/cartReducers'


const reducer = combineReducers({
    productsList: productsReducer,
    testproductsList: testproductsReducer,
    productDet: productDetReducer,
    testproductDet: testproductDetReducer,
    cart: cartReducer,
})
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const initialState = {
    cart: {cartItems: cartItemsFromStorage}
}
const middleware = [thunk]
const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)) )

export default store
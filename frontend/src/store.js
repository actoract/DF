import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productsReducer} from './reducers/productsReducers'
import {testproductsReducer} from './reducers/testproductsReducers'
import {productDetReducer} from './reducers/productsReducers'
import {testproductDetReducer} from './reducers/testproductsReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer} from './reducers/userReducer'
import {userRegReducer} from './reducers/userReducer'
import {userProfileReducer} from './reducers/userReducer'
import {userProfileUpdReducer} from './reducers/userReducer'



const reducer = combineReducers({
    productsList: productsReducer,
    testproductsList: testproductsReducer,
    productDet: productDetReducer,
    testproductDet: testproductDetReducer,
    cart: cartReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userReg: userRegReducer,
    userProfile: userProfileReducer,
    userUpdProfile: userProfileUpdReducer,
})
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInformationFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: {userInfo: userInformationFromStorage}
}
const middleware = [thunk]
const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)) )

export default store
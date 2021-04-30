import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productsReducer, 
        productDetReducer,
        productDeleteReducer,
        productCreateReducer} from './reducers/productsReducers'
import {testproductsReducer,
        testproductDetReducer} from './reducers/testproductsReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer,
        userRegReducer,
        userProfileReducer,
        userProfileUpdReducer,
        usersReducer,} from './reducers/userReducer'
import {orderAddRecuder,
        getOrderByIdReducer,
        userOrdersReducer} from './reducers/orderReducers'

const reducer = combineReducers({
    productsList: productsReducer,
    testproductsList: testproductsReducer,
    productDet: productDetReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    testproductDet: testproductDetReducer,
    cart: cartReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    allUsers: usersReducer,
    userReg: userRegReducer,
    userProfile: userProfileReducer,
    userUpdProfile: userProfileUpdReducer,
    orderAdd: orderAddRecuder,
    orderDetails: getOrderByIdReducer,
    //orderPay: orderPayReducer,
    userOrders: userOrdersReducer,
})
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInformationFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const addressFromStorage = localStorage.getItem('deliveryAddress') ? JSON.parse(localStorage.getItem('deliveryAddress')) : {}
const initialState = {
    cart: {cartItems: cartItemsFromStorage, deliveryAddress: addressFromStorage},
    userLogin: {userInfo: userInformationFromStorage}
}
const middleware = [thunk]
const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)) )

export default store
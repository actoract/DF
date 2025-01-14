import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productsReducer, 
        productDetReducer,
        productDeleteReducer,
        productCreateReducer,
        productUpdateReducer} from './reducers/productsReducers'
import {testproductsReducer,
        testproductDetReducer,
        testproductCreateReducer,
        testproductDeleteReducer,
        testproductUpdateReducer,
        testproductReviewReducer} from './reducers/testproductsReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer,
        userRegReducer,
        userProfileReducer,
        userProfileUpdReducer,
        usersReducer,} from './reducers/userReducer'
import {orderAddRecuder,
        getOrderByIdReducer,
        userOrdersReducer, 
        ordersReducer,
        orderUpdateStatusReducer} from './reducers/orderReducers'

const reducer = combineReducers({
    productsList: productsReducer,
    testproductsList: testproductsReducer,
    productDet: productDetReducer,
    testproductDet: testproductDetReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    testproductDelete: testproductDeleteReducer,
    testproductCreate: testproductCreateReducer,
    testproductUpdate: testproductUpdateReducer,
    testproductReview: testproductReviewReducer,
    testproductDet: testproductDetReducer,
    //cart: cartReducer,
    userCart: cartReducer,
    userLogin: userLoginReducer,
    allUsers: usersReducer,
    userReg: userRegReducer,
    userProfile: userProfileReducer,
    userUpdProfile: userProfileUpdReducer,
    orderAdd: orderAddRecuder,
    orderDetails: getOrderByIdReducer,
    ordersAdmin: ordersReducer,
    orderStatus: orderUpdateStatusReducer,
    //orderPay: orderPayReducer,
    userOrders: userOrdersReducer,
})
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInformationFromStorage = localStorage.getItem('userDet') ? JSON.parse(localStorage.getItem('userDet')) : null
const addressFromStorage = localStorage.getItem('deliveryAddress') ? JSON.parse(localStorage.getItem('deliveryAddress')) : {}
const initialState = {
        userCart: {cartItems: cartItemsFromStorage, deliveryAddress: addressFromStorage},
        userLogin: {userDet: userInformationFromStorage}
}
const middleware = [thunk]
const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)) )

export default store
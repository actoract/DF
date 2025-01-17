import {CART_ADD, 
    CART_REMOVE, 
    CART_CHANGE, 
    CART_SAVE_ADDRESS,
    CART_SAVE_PAYMENT_METHOD} from '../constants/storeConst'

export const cartReducer = (state = {cartItems: [], deliveryAddress:{}}, action) => {
    switch (action.type){
        case CART_ADD:
            const item = action.payload
            const existItem = state.cartItems.find(x =>  (x.product === item.product && x.size == item.size) || 
            (x.product == item.product && x.size === undefined) ||
            (x.product === item.product && x.type === "dc" && item.type == "dc"))
            
            /*return {
                ...state,
                cartItems: [...state.cartItems, item]
            }*/
            if (existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => (x.product === item.product && Number(x.size) === Number(item.size)) ? item : x)
                }
            }
            else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_CHANGE:
            const itemChange = action.payload
            const existItemChange = state.cartItems.find(x =>  (x.id === itemChange.id))
            if (existItemChange){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => (x.id === existItemChange.id)? itemChange : x)
                    //cartItems: state.cartItems.map(x => (x.product === existItemChange.product && Number(x.size) != Number(existItemChange.size))? itemChange : x)
                }
            }
 /* const itemChange = action.payload
            const existItemChange = state.cartItems.find(x =>  (x.product === itemChange.product && x.size === itemChange.size))
            if (existItemChange){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => (x.product === existItemChange.product && x.size === existItemChange.size)? existItemChange : x)
                    //cartItems: state.cartItems.map(x => (x.product === existItemChange.product && Number(x.size) != Number(existItemChange.size))? itemChange : x)
                }
            }*/
            else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, itemChange] ///Здесь прописать замену своства size а не доьавление элемента
                }
            }
        case CART_REMOVE:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => ((x.product !== action.payload.product) ||
                (x.product == action.payload.product && x.type !== action.payload.type) || 
                (x.product == action.payload.product && x.type == action.payload.type && x.size !== action.payload.size)))
                    //(x.product == action.payload.product && x.type == "dc" && action.payload.type == "dc"))) //Добавить проверку типа, размера, КРЧ идентифицировать, что это точно та одежда
            }
        case CART_SAVE_ADDRESS:
            return{
                ...state,
                deliveryAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload
            }

        default:
            return state
    }
}
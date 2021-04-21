
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../types"

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]")
}

export const cartReduser = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            return({...state, cartItems: action.payload.cartItems});
        case REMOVE_FROM_CART:
            return({...state, cartItems: action.payload.cartItems});
        case CLEAR_CART:
            return({...state, cartItems: []});
        default:
            return(state);
    }
}

export const addToCartAction = payload => ({type: ADD_TO_CART, payload});
export const removeFromCartAction = payload => ({type: REMOVE_FROM_CART, payload});
export const clearCartAction = () => ({type: CLEAR_CART});
import { addToCartAction, removeFromCartAction } from "../reducers/cartRedusers";

export const addToCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExists = false;
    cartItems.forEach( x => {
        if(x._id === product._id) {
            alreadyExists = true;
            x.count++;
        }
    });
    if(!alreadyExists) {
        cartItems.push({...product, count: 1});
    }
    dispatch(addToCartAction({ cartItems }));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const removeFromCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice().filter( x => x._id !== product._id );
    dispatch(removeFromCartAction({ cartItems }));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
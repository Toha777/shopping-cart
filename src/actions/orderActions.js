import { clearCartAction } from "../reducers/cartRedusers";
import { clearOrderAction, createOrderAction } from "../reducers/orderReducers"

export const createOrder = order =>  dispatch => {
    fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => dispatch(createOrderAction(data)));
    localStorage.clear("cartItems");
    dispatch(clearCartAction());
}

export const clearOrder = () => dispatch => dispatch(clearOrderAction());
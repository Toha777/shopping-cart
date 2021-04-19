import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { productsReduser } from "./reducers/productReducers";
import { cartReduser } from "./reducers/cartRedusers";

const rootReducer = combineReducers({
    products: productsReduser,
    cart: cartReduser
})
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

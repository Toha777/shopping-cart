import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { productsReduser } from "./reducers/productReducers";
import { cartReduser } from "./reducers/cartRedusers";
import { odrerReducer } from './reducers/orderReducers';

const rootReducer = combineReducers({
    products: productsReduser,
    cart: cartReduser,
    order: odrerReducer
})
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

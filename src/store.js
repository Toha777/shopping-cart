import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { productsReduser } from "./reducers/productReducers";

const rootReducer = combineReducers({
    products: productsReduser
})
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

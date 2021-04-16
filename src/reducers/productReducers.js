import { FETCH_PRODUCTS } from "../types";
const defaultState = {
    products: []
}

export const productsReduser = (state = defaultState, action) => {
     switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state,products: [...state.products, ...action.payload] };
        default:
            return state;    
    }
};

export const fetchProductsAction = payload => ({type: FETCH_PRODUCTS, payload})

import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types";
const defaultState = {
    items: [],
    size: "",
    sort: "",
    filteredItems: []
}

export const productsReduser = (state = defaultState, action) => {
     switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state, items: action.payload, filteredItems: action.payload };
        case FILTER_PRODUCTS_BY_SIZE:
            return { ...state, size: action.payload.size, filteredItems: action.payload.items };
        case ORDER_PRODUCTS_BY_PRICE:
            return { ...state, sort: action.payload.sort ,filteredItems: action.payload.items };;                    
        default:
            return state;    
    }
};

export const fetchProductsAction = payload => ({type: FETCH_PRODUCTS, payload});
export const filterProductsBySizeAction = payload => ({type: FILTER_PRODUCTS_BY_SIZE, payload});
export const orderProductsByPriceAction = payload => ({type: ORDER_PRODUCTS_BY_PRICE, payload});

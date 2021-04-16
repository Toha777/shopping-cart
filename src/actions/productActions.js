// import { FETCH_PRODUCTS } from "../types";
import { fetchProductsAction } from "../reducers/productReducers";

export const fetchProducts = () => dispatch => {
    fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(json => dispatch(fetchProductsAction(json)))
    // const res = await fetch("http://localhost:5000/api/products");
    // const data = await res.json();
    // dispatch(fetchProductsAction(data));
}
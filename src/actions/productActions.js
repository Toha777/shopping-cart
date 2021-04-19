// 
import { fetchProductsAction,filterProductsBySizeAction,orderProductsByPriceAction } from "../reducers/productReducers";

export const fetchProducts = () => dispatch => {
    fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(json => dispatch(fetchProductsAction(json)))
}

export const filterProducts = (products, size) => dispatch => {
    dispatch(filterProductsBySizeAction({
        size: size,
        items: size === ""
                ? products
                : products.filter( x => x.availableSizes.indexOf(size) >= 0 )

    }))
}

export const sortProducts = (filteredProducts, sort) => dispatch => {
    const sortedProducts = filteredProducts.slice();
    if(sort === "latest") {
        sortedProducts.sort((a,b) => a.id  > b.id ? 1 : -1)
    } else {
        sortedProducts.sort((a,b) => (
            sort === "lowest"
            ? a.price > b.price ? 1 : -1
            : a.price > b.price ? -1 : 1
        ))
    }
    dispatch(orderProductsByPriceAction({
        sort: sort,
        items: sortedProducts
    }))
}
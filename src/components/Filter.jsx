import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sortProducts, filterProducts } from '../actions/productActions';

export default function Filter(props) {
     var size = useSelector( state => state.products.size );
     var sort = useSelector( state => state.products.sort );
     const items = useSelector( state => state.products.items );
     const filteredItems  = useSelector( state => state.products.filteredItems );
     const count = filteredItems.length;
     const dispatch = useDispatch();
     const sortItems = sort => dispatch(sortProducts(filteredItems,sort));
     const filterItems = size => dispatch(filterProducts(items,size));
     
    return (
        <div className="filter">
            <div className="filter-result">{count} Products</div>
            <div className="filter-sort">
                Order{" "}
                 <select value={sort} onChange={(e)=>sortItems(e.target.value)}>
                    <option value="latest">Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className="filter-size">
                Filter{" "}
                <select value={size} onChange={(e)=>filterItems(e.target.value)}>
                    <option value="">ALL</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
        </div>
    )
}

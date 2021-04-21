import React, {useState,useEffect} from 'react';
import formatCurrency from "./utils";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { useSelector,useDispatch } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartAction';


export default function Products(props) {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts())
      }, [dispatch]);
    const products = useSelector(state => state.products.filteredItems);
    const [product, setProduct] = useState(null);
    const openModal = product =>{
        setProduct( product );
    };
    const closeModal = () =>{
        setProduct( null );
    };
    return (
        <div>
            <Fade bottom cascade>
            <ul className="products">
                {products.map( product => (
                    <li key={product._id}>
                        <div className="product">
                            <a href ={"#"+product._id} onClick={()=>openModal(product)} >
                                <img src={product.image} alt={product.title}></img>
                                <p>
                                    {product.title}
                                </p>
                            </a>
                            <div className="product-price">
                                <div>{formatCurrency(product.price)}</div>
                                <button onClick={()=>dispatch(addToCart(product))} className="button primary">Add To Cart</button>
                            </div>
                        </div>
                    </li>
                )
                )}
            </ul>
            </Fade>
            {product && (
                    <Modal isOpen={true}
                     onRequestClose={closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={closeModal} >
                                x
                            </button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title}/>
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>{product.description}</p>
                                    <p>
                                        Available sizes{" "}
                                        {product.availableSizes.map( x => (
                                            <span>
                                                {" "}
                                                <button className="button">{x}</button>
                                            </span>
                                        ))}
                                    </p>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <button className="button primary" onClick={()=>{
                                            dispatch(addToCart(product));
                                            closeModal();
                                        }}>
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                         </Zoom>
                    </Modal>
                )
            }
        </div>
    )
}

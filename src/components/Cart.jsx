import React, {useState} from 'react';
import formatCurrency from './utils';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../actions/cartAction';
import { clearOrder, createOrder } from '../actions/orderActions';

export default function Cart(props) {
    const cartItems = useSelector(state => state.cart.cartItems);
    const order = useSelector(state => state.order.order);
    const dispatch = useDispatch();
    const [state,setState] = useState({
        name: "",
        email: "",
        address: ""
    });
    const [showCheckout,setShowCheckout] = useState(false);
    const handleInput = e => {
        setState({...state, [e.target.name]: e.target.value})
    };
    const onCreateOrder = e => {
        e.preventDefault();
        const order = {
            name: state.name,
            email: state.email,
            address: state.address,
            cartItems: cartItems,
            total: cartItems.reduce((a,c) => a + c.price*c.count, 0)
        };
        dispatch(createOrder(order));
    }
    const closeModal = () => dispatch(clearOrder());
    return (
        <div>
            { (cartItems.length === 0) ?
                (<div className="cart cart-header">Cart is empty</div>)
                : (<div className="cart cart-header">You have {cartItems.length} in the cart{" "}
                   </div>)}
            {order && 
                <Modal
                isOpen={true}
                onRequestClose={closeModal}
                >
                    <Zoom>
                        <button className="close-modal" onClick={closeModal}>x</button>
                        <div className="order-details">
                            <h3 className="success-massage">Your order has been placed.</h3>
                            <h2>Order {order._id}</h2>
                            <ul>
                                <li>
                                    <div>Name:</div>
                                    <div>{order.name}</div>
                                </li>
                                          
                                 <li>
                                    <div>Email:</div>
                                    <div>{order.email}</div>
                                 </li>
                                 <li>
                                    <div>Address:</div>
                                    <div>{order.address}</div>
                                 </li>
                                 <li>
                                    <div>Date:</div>
                                    <div>{order.createdAt}</div>
                                 </li>
                                  <li>
                                    <div>Total:</div>
                                    <div>{formatCurrency(order.total)}</div>
                                 </li>
                                 <li>
                                    <div>Cart Items:</div>
                                    <div>
                                    {order.cartItems.map(x => (
                                        <div>
                                            {x.count}{" x "}{x.title}
                                        </div>
                                    ))}
                                    </div>
                                 </li>
                            </ul>
                        </div>
                    </Zoom>
                </Modal>}
            <div className="cart">
                <Fade left cascade>
                <ul className="cart-items">
                    {cartItems.map(item => (
                        <li key={item._id}>
                            <div>
                                <img src={item.image} alt={item.title}></img>
                            </div>
                            <div>{item.title}</div>
                            <div className="right">
                                {formatCurrency(item.price)} x {item.count} {" "}
                                <button className="button" onClick={() => dispatch(removeFromCart(item))}>
                                    Remove
                            </button>
                            </div>
                        </li>
                    ))}
                </ul>
                </Fade>
            </div>
            { cartItems.length !== 0 &&
          (<div>
            <div className="cart">
                <div className="total">
                    <div>
                    Total:{" "}
                    {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                    </div>
                    <button onClick={()=> setShowCheckout(true)} 
                     className="button primary">Proceed</button>
                </div>
            </div>
            {showCheckout && (
              <Fade right cascade>  
              <div className="cart">
                  <form onSubmit={(onCreateOrder)}>
                      <ul className="form-container">
                          <li>
                              <label>Email</label>
                              <input
                               name="email"
                               type="text"
                               required 
                               onChange={handleInput}/>
                          </li>
                          <li>
                              <label>Name</label>
                              <input
                               name="name"
                               type="text"
                               required 
                               onChange={handleInput}/>
                          </li>
                          <li>
                              <label>Address</label>
                              <input
                               name="address"
                               type="text"
                               required 
                               onChange={handleInput}/>
                          </li> 
                          <li>
                              <button className="button primary" type="submit">
                                  Checkout
                               </button>
                          </li>                                                   
                      </ul>
                  </form>
              </div>
              </Fade>
            )}
            </div>
            )}
        </div>
    )
}

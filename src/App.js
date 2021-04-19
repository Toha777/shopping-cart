// Products Component
import {React,useState} from "react";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import { store } from "./store";


function App() {
  const [state,setState] = useState({
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
   });
  const createOrder = order => {
    alert("Need to save order for " + order.name);
  };
  const removeFromCart = product => {
    const cartItems = state.cartItems.slice();
    setState({...state, cartItems: cartItems.filter(x=> x._id !== product._id)});
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x=> x._id !== product._id)));
  }
  const addToCart = product => {
    const cartItems = state.cartItems.slice();
    let alreadyInCart =false;
    cartItems.forEach( item => {
      if(item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    setState({...state, cartItems: cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  
  return (
    <Provider store={store}>
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
             <Filter/>
             <Products addToCart={addToCart}></Products>
          </div>
          <div className="sidebar">
            <Cart 
            cartItems={state.cartItems} 
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            createOrder={createOrder}/>
          </div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
    </Provider>
  );
}

export default App;

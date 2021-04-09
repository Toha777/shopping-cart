// Products Component
import {React,useState} from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

function App() {
  const [state,setState] = useState({
    products: data.products,
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    size: "",
    sort: ""
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
  const sortProducts = event =>  {
      console.log(event.target.value);
      const sort = event.target.value;
      setState( state => ({...state,
        sort: sort,
        products: state.products.slice().sort((a,b) =>(
          sort ==="lowest"?
          ((a.price > b.price)? 1:-1):
          sort ==="highest"?
          ((a.price < b.price)? 1:-1):
          ((a._id < b._id)? 1:-1)
        ))
      }))
  }
  const filterProducts = event => {
    console.log(event.target.value);
    if(event.target.value === ""){
      setState({...state, size: event.target.value, products: data.products})
    } else {
    setState({...state,
      size: event.target.value,
      products: data.products.filter( product => product.availableSizes.indexOf(event.target.value) >= 0 )
    });
  }
  }
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
             <Filter 
            count= {state.products.length}
            size={state.size}
            sort={state.sort}
            filterProducts={filterProducts}
            sortProducts={sortProducts}
            ></Filter>
            <Products products={state.products} addToCart={addToCart}></Products>
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
  );
}

export default App;

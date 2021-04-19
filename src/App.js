// Products Component
import {React} from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";

function App() {
  const createOrder = order => {
    alert("Need to save order for " + order.name);
  };
  
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
             <Filter/>
             <Products></Products>
          </div>
          <div className="sidebar">
            <Cart createOrder={createOrder}/>
          </div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
}

export default App;

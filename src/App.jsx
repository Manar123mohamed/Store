import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <div className="pt-20  min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}


export default App;


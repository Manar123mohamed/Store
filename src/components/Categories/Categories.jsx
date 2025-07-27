
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useState, useContext } from "react";



export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("electronics");
  const { addToCart } = useContext(CartContext); 

  const {data: categories = [],isLoading: loadingCategories,isError,error,} = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("https://fakestoreapi.com/products/categories");
      return res.data;
    },
  });

  const { data: categoryProducts = [],isLoading: loadingProducts, isError: productsError, error: productErrorMsg,} = useQuery({
    queryKey: ["category-products", selectedCategory],
    queryFn: async () => {
      const res = await axios.get(
        `https://fakestoreapi.com/products/category/${selectedCategory}`
      );
      return res.data;
    },
    enabled: !!selectedCategory,
  });

  return (
    <div className="p-4">
      {loadingCategories ? (
        <div className="flex justify-center items-center mt-40"><PacmanLoader color="#689d5d" /></div>
      ) : isError ? (<div className="text-red-500 text-center">{error.message}</div>) : (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">Categories</h1>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}className={`px-6 py-2 rounded-full cursor-pointer capitalize shadow ${ selectedCategory === cat? "bg-green-700 text-white" : "dark:text-bloc border border-white"}`} >
                {cat}
              </button>
            ))}
          </div>

          {loadingProducts ? (
            <div className="flex justify-center items-center mt-20"><PacmanLoader color="#689d5d" /> </div>
          ) : productsError ? (
            <div className="text-red-500 text-center">{productErrorMsg.message}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15 p-5">
              {categoryProducts.map((product) => (
               
                  <div className="rounded-2xl border border-gray-200 p-10 hover:shadow-green-200  shadow hover:shadow-lg transition" key={product.id}>
                     <NavLink to={`/products/${product.id}`}>
                <img src={product.image}alt={product.title} className="h-40 w-full object-contain mb-4"/>
                <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-center"> {product.title} </h2>
                <p className="text-green-600  font-bold  text-center">${product.price}</p>
              </NavLink>
                    <button onClick={() => { console.log("Trying to add:", product); addToCart(product);}}className="cursor-pointer mt-2 w-full bg-green-700 text-white px-4 py-1 rounded hover:bg-green-600 transition">
                Add to Cart
              </button>
                  </div>
               
                
              ))}
              
            </div>
          )}
        </>
      )}
    </div>
  );
}

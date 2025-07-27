
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from 'react-spinners';
import { CartContext } from "../context/CartContext";

export default function Products() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const { addToCart } = useContext(CartContext);

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      return res.data;
    },
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name-az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [search, sort, products]);

  return (
    <div className="p-4 bg-white text-black dark:bg-black  dark:text-white">
      <br />

      {/* <div className="flex px-7 flex-col sm:flex-row items-center justify-between mb-4 gap-3">
        <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 rounded w-full sm:w-1/2"/>

        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border p-2 rounded w-full sm:w-1/3 dark:text-gray-600 " >
          <option value="">Sort by</option>
          <option value="price-low">Price: Low : High</option>
          <option value="price-high">Price: High : Low</option>
          <option value="name-az">Name: A : Z</option>
        </select>
      </div> */}

<div className="flex px-7 flex-col sm:flex-row items-center justify-between mb-4 gap-3">
  <input type="text"placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
    className="border  border-gray-300  focus:border-green-500 focus:ring-2  focus:ring-green-300 p-2 rounded w-full 
    sm:w-1/2 transition duration-300 outline-none dark:bg-gray-800 dark:border-gray-600 dark:focus:border-green-400 dark:focus:ring-green-600 dark:text-white placeholder-gray-400 "/>

  <select value={sort} onChange={(e) => setSort(e.target.value)} className="   border  border-gray-300  focus:border-green-500 focus:ring-2  focus:ring-green-300 
      p-2  rounded  w-full  sm:w-1/3  dark:bg-gray-800 dark:border-gray-600 dark:focus:border-green-400 dark:focus:ring-green-600 dark:text-white">
    <option value="">Sort by</option>
    <option value="price-low">Price: Low : High</option>
    <option value="price-high">Price: High : Low</option>
    <option value="name-az">Name: A : Z</option>
  </select>
</div>

      {isLoading && (<div className="flex justify-center items-center mt-40"> <PacmanLoader color="#689d5d" /> </div>)}

      {isError && (<div className="text-center text-red-500">Error: {error.message}</div>)}

      {!isLoading && filteredProducts.length === 0 && ( <div className="text-center">No products found.</div> )}

      {!isLoading && filteredProducts.length > 0 && (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15 p-5">
          {filteredProducts.map((product) => (<div  key={product.id} className=" rounded-2xl border border-gray-200 p-10  hover:shadow-lg hover:shadow-green-200 transition flex flex-col justify-between bg-white text-black dark:bg-black dark:text-white" >
              <Link to={`/products/${product.id}`}>
                <img src={product.image}alt={product.title} className="h-40 w-full object-contain mb-4"/>
                <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-center"> {product.title} </h2>
                <p className="text-green-600  font-bold  text-center">${product.price}</p>
              </Link>

              <button onClick={() => { console.log("Trying to add:", product); addToCart(product);}}className="mt-2 bg-green-700 text-white cursor-pointer px-4 py-1 rounded hover:bg-green-600 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

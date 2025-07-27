
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import { CartContext } from "../context/CartContext";
import { useContext, useRef, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return res.data;
    },
  });

 
  const imgRef = useRef(null);
  const zoomRef = useRef(null);
  const [showZoom, setShowZoom] = useState(false);

  function handleMouseMove(e) {
    if (!imgRef.current || !zoomRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;

    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    
    zoomRef.current.style.backgroundPosition = `${xPercent}% ${yPercent}%`;

   
    const zoomSize = 150;
    let left = e.clientX - zoomSize / 2;
    let top = e.clientY - zoomSize / 2;

    zoomRef.current.style.left = `${left}px`;
    zoomRef.current.style.top = `${top}px`;
  }

  function handleMouseEnter() {
    setShowZoom(true);
  }
  function handleMouseLeave() {
    setShowZoom(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
  {isLoading && (
    <div className="flex justify-center items-center mt-40">
      <PacmanLoader color="#689d5d" />
    </div>
  )}

  {isError && (
    <div className="text-center text-red-500">Error: {error.message}</div>
  )}

  {!isLoading && !isError && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full items-center">
      <div
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "zoom-in" }}
      >
        <img
          ref={imgRef}
          src={data.image}
          alt={data.title}
          className="w-full h-96 object-contain"
        />

        {showZoom && (
          <div
            ref={zoomRef}
            className="pointer-events-none fixed border-2 border-gray-400 rounded-full w-[150px] h-[150px] bg-no-repeat bg-white shadow-lg"
            style={{
              backgroundImage: `url(${data.image})`,
              backgroundSize: "200%",
              zIndex: 9999,
            }}
          ></div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
        <p className="text-gray-600 mb-4 dark:text-white">{data.description}</p>
        <p className="text-xl font-bold text-green-700 mb-2">${data.price}</p>
        <p className="text-sm text-gray-500 mb-2 dark:text-white">
          Category: {data.category}
        </p>
        <p className="text-yellow-500">
          <i className="fa-solid fa-star"></i> {data.rating?.rate} (
          {data.rating?.count} reviews)
        </p>
        <button
          onClick={() => addToCart(data)}
          className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )}
</div>
  );
}


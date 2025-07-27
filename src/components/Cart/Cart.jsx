import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <div className="text-center mt-20 text-xl text-gray-500"><i className="fa-solid fa-cart-shopping text-green-600 mr-4"></i> Your cart is empty</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <br /><br /><br />
      <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h2>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center border p-4 rounded shadow justify-between">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />

            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-green-700 font-bold">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded dark:text-black"> - </button>

              <span className="mx-2">{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded dark:text-black"> + </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-6 text-red-500 hover:text-red-700"
            >
              <i className="fa-solid fa-trash text-2xl"></i>
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={clearCart}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

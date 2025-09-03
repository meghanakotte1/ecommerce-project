import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return <div className="p-6 text-center text-gray-500">Your cart is empty.</div>;
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600">Price: ${item.price}</p>

              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <p className="font-bold">${item.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border-t flex justify-between items-center text-xl font-bold">
        <span>Total:</span>
        <span>${totalPrice}</span>
      </div>

      <button
        onClick={() => alert("Checkout coming soon!")}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;

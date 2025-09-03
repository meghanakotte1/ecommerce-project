import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold hover:text-yellow-300 transition">
        🛍️ Shopping!!!
      </Link>
      <Link
        to="/cart"
        className="relative bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-gray-100 transition"
      >
        Cart
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}

export default Navbar;

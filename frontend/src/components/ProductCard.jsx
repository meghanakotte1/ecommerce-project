// src/components/ProductCard.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105 p-4 flex flex-col justify-between bg-white">
      {/* Image */}
      <div className="h-40 w-full mb-4 bg-gray-100 flex items-center justify-center rounded">
        <span className="text-gray-400 text-sm">Image Placeholder</span>
      </div>

      {/* Product Info */}
      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-green-600 font-bold text-lg mb-4">${product.price}</p>

      {/* Quantity selector */}
      <div className="flex items-center mb-4 space-x-2">
        <button
          onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          className="bg-gray-200 px-2 rounded hover:bg-gray-300"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded w-12 text-center"
        />
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="bg-gray-200 px-2 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

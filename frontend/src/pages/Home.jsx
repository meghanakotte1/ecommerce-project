import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Apple", description: "Fresh red apple", price: 100 },
  { id: 2, name: "Banana", description: "Yellow banana", price: 50 },
  { id: 3, name: "Orange", description: "Juicy orange", price: 70 },
  { id: 4, name: "Mango", description: "Delicious mango", price: 150 },
  { id: 5, name: "Grapes", description: "Sweet grapes", price: 120 },
  { id: 6, name: "Pineapple", description: "Tropical fruit", price: 180 },
];

const Home = () => {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded w-full mb-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;

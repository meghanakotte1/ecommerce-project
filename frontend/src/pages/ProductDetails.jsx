import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductDetails = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;

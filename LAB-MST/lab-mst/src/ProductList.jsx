import React from "react";

function ProductList({ products, handleRemoveProduct }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.id}. {product.name} - ₹{product.price}{" "}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;

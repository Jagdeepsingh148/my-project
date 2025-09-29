import React, { useState } from "react";
import AddProductForm from "./AddProductForm";
import ProductList from "./ProductList";
import './App.css';

function ProductApp() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 60000 },
    { id: 2, name: "Phone", price: 20000 },
    { id: 3, name: "Headphones", price: 5000 },
  ]);

  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const handleAddProduct = () => {
    if (newId.trim() && newName.trim() && newPrice.trim()) {
      setProducts([
        ...products,
        { id: Number(newId), name: newName, price: Number(newPrice) },
      ]);
      setNewId("");
      setNewName("");
      setNewPrice("");
    }
  };

  return (
    <div className="container">
      <h2>Product Management</h2>

      <AddProductForm
        newId={newId}
        setNewId={setNewId}
        newName={newName}
        setNewName={setNewName}
        newPrice={newPrice}
        setNewPrice={setNewPrice}
        handleAddProduct={handleAddProduct}
      />

      <ProductList products={products} />
    </div>
  );
}

export default ProductApp;

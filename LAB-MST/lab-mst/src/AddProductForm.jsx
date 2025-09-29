import React from "react";

function AddProductForm({
  newId,
  setNewId,
  newName,
  setNewName,
  newPrice,
  setNewPrice,
  handleAddProduct,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="ID"
        value={newId}
        onChange={(e) => setNewId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;

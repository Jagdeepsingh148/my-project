const products = [
  { name: "T-Shirt", category: "Clothing" },
  { name: "Jeans", category: "Clothing" },
  { name: "Headphones", category: "Electronics" },
  { name: "Smartphone", category: "Electronics" },
  { name: "Novel", category: "Books" },
  { name: "Cookbook", category: "Books" }
];

const categorySelect = document.getElementById("category");
const productList = document.getElementById("product-list");

function displayProducts(filter) {
  productList.innerHTML = "";
  const filtered = filter === "All" ? products : products.filter(p => p.category === filter);
  filtered.forEach(product => {
    const li = document.createElement("li");
    li.textContent = product.name;
    productList.appendChild(li);
  });
}

categorySelect.addEventListener("change", () => {
  displayProducts(categorySelect.value);
});

displayProducts("All");

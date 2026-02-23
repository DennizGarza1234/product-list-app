import React from "react";
import { products } from "../data/products";
import "../App.css";

function ProductList() {
  return (
    <div className="product-container">
      <h1 className="title">Product List</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
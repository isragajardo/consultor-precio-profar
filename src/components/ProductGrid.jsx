import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onProductClick }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.ItemCode}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
}

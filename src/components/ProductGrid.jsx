import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onProductClick }) {
  return (
    <div
      className="product-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 24,
      }}
    >
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

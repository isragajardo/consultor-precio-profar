import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 24 }}>
      <input
        className="search-input"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Busca por nombre, principio activo, SKU..."
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 12,
          borderRadius: 8,
          border: "1px solid #00a4e8",
          fontSize: 18,
          outline: "none",
        }}
      />
    </div>
  );
}

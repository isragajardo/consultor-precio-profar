import React from "react";

const selloBioequiv =
  "https://d1tjllbjmslitt.cloudfront.net/assets/icons/bioequivalente-094811903b283ec18c7bbe6f7b0050b94fc6b60b8cf88247ebc1600b1815b3ff.png";

export default function ProductCard({ product, onClick }) {
  if (product.descontinuado) return null;

  return (
    <div
      className="product-card"
      onClick={() => onClick(product)}
    >
      {/* Imagen */}
      <div
        style={{
          height: 98,
          width: 120,
          background: "#fff",
          borderRadius: 10,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={product.imagen || "logo.png"}
          alt={product.nombre}
          style={{
            maxHeight: 90,
            maxWidth: 90,
            objectFit: "contain",
            background: "transparent",
            borderRadius: 8,
            display: "block",
          }}
          onError={e => (e.target.src = "logo.png")}
        />
      </div>

      {/* Nombre */}
      <div
        style={{
          fontWeight: 800,
          fontSize: 16.5,
          margin: "6px 0 3px 0",
          textAlign: "center",
          color: "#232e38",
          lineHeight: 1.18,
        }}
      >
        {product.nombre}
      </div>

      {/* Principio activo */}
      {product.principioActivo && (
        <div style={{ fontSize: 13.5, color: "#295", textAlign: "center", fontWeight: 600 }}>
          {product.principioActivo}
        </div>
      )}

      {/* Laboratorio */}
      {product.laboratorio && (
        <div style={{ fontSize: 13, color: "#1e4156", margin: "2px 0 3px", textAlign: "center" }}>
          {product.laboratorio}
        </div>
      )}

      {/* Presentación */}
      {product.presentacion && product.presentacion.toUpperCase() !== "FALSO" && (
        <div style={{ fontSize: 12.5, color: "#555", marginBottom: 2 }}>
          {product.presentacion}
        </div>
      )}

      {/* Vía de administración */}
      {product.viaAdministracion && (
        <div style={{ fontSize: 12, color: "#7c8596", marginBottom: 2, fontStyle: "italic" }}>
          Vía: {product.viaAdministracion}
        </div>
      )}

      {/* SKU */}
      <div style={{ fontSize: 12, color: "#8ea1ad", margin: "2px 0 4px 0" }}>
        SKU: <b>{product.sku}</b>
      </div>

      {/* Bioequivalente */}
      {typeof product.bioequivalente !== "undefined" && (
        <div style={{ fontSize: 13, margin: "2px 0 6px", textAlign: "center" }}>
          Bioequivalente:&nbsp;
          {product.bioequivalente === "Y" ? (
            <img
              src={selloBioequiv}
              alt="Bioequivalente"
              style={{ height: 21, verticalAlign: "middle" }}
            />
          ) : product.bioequivalente === "N" ? (
            <span style={{ color: "#e73b3b", fontWeight: 700 }}>NO</span>
          ) : (
            "-"
          )}
        </div>
      )}

      {/* Precio total */}
      <div
        style={{
          fontSize: 20,
          color: "#00a4e8",
          fontWeight: 800,
          margin: "3px 0 0",
          letterSpacing: "-1px",
        }}
      >
        ${" "}
        {product.precioTotal
          ? product.precioTotal.toLocaleString("es-CL")
          : "-"}
      </div>

      {/* Precio por unidad */}
      {product.precioUnidad && (
        <div style={{ fontSize: 13, color: "#00a4e8", margin: "2px 0 0 0" }}>
          x unidad: ${product.precioUnidad.toLocaleString("es-CL")}
        </div>
      )}

      {/* Stock */}
      {"stock" in product && (
        <div
          style={{
            fontSize: 14,
            color: product.stock > 0 ? "#21a557" : "#e73b3b",
            fontWeight: 700,
            margin: "6px 0 0 0",
          }}
        >
          {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
        </div>
      )}
    </div>
  );
}

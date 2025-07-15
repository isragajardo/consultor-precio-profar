import React from "react";

const selloBioequiv =
  "https://d1tjllbjmslitt.cloudfront.net/assets/icons/bioequivalente-094811903b283ec18c7bbe6f7b0050b94fc6b60b8cf88247ebc1600b1815b3ff.png";

export default function ProductModal({ product, onClose, alternativas = [], onAlternativeClick }) {
  if (!product) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          maxWidth: "1440px",
          width: "97vw",
          minHeight: "82vh",
          borderRadius: 30,
          boxShadow: "0 8px 36px rgba(0,0,0,.15)",
          background: "none"
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* MODAL IZQUIERDA */}
        <div className="modal-content">
          <button
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "none",
              border: "none",
              fontSize: 34,
              cursor: "pointer",
              color: "#bbb",
              zIndex: 10,
              fontWeight: 600,
            }}
            onClick={onClose}
          >
            ×
          </button>
          {/* Imagen */}
          <img
            src={product.imagen || "logo.png"}
            alt={product.nombre}
            style={{
              height: 140,
              width: 140,
              objectFit: "contain",
              margin: "0 auto 18px auto",
              display: "block",
              borderRadius: 12,
              boxShadow: "0 2px 10px rgba(0,0,0,0.09)",
              background: "#fff",
            }}
            onError={e => (e.target.src = "logo.png")}
          />

          {/* Nombre */}
          <div
            style={{
              fontWeight: 800,
              fontSize: 24,
              textAlign: "center",
              marginBottom: 10,
              color: "#232e38",
            }}
          >
            {product.nombre}
          </div>
          {/* Precio total */}
          <div
            style={{
              fontSize: 20,
              color: "#00a4e8",
              fontWeight: 700,
              textAlign: "center",
              margin: "2px 0 8px"
            }}
          >
            ${" "}
            {product.precioTotal
              ? product.precioTotal.toLocaleString("es-CL")
              : "-"}
          </div>
          {/* Precio por unidad */}
          {product.precioUnidad && (
            <div
              style={{
                fontSize: 16,
                color: "#00a4e8",
                fontWeight: 600,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              Precio por unidad: ${" "}
              {product.precioUnidad.toLocaleString("es-CL")}
            </div>
          )}
          {/* Stock */}
          {"stock" in product && (
            <div
              style={{
                fontSize: 15,
                color: product.stock > 0 ? "#21a557" : "#e73b3b",
                fontWeight: 600,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
            </div>
          )}
          {/* Bioequivalente */}
          {typeof product.bioequivalente !== "undefined" && (
            <div style={{ fontSize: 15, marginBottom: 10, textAlign: "center" }}>
              Bioequivalente:&nbsp;
              {product.bioequivalente === "Y" ? (
                <img
                  src={selloBioequiv}
                  alt="Bioequivalente"
                  style={{ height: 25, verticalAlign: "middle" }}
                />
              ) : product.bioequivalente === "N" ? (
                <span style={{ color: "#e73b3b", fontWeight: 700 }}>NO</span>
              ) : (
                "-"
              )}
            </div>
          )}
          {/* Principio activo */}
          {product.principioActivo && (
            <div
              style={{
                fontSize: 15,
                marginBottom: 8,
                color: "#1b4079",
                textAlign: "center",
              }}
            >
              <strong>Principio activo:</strong> {product.principioActivo}
            </div>
          )}
          {/* Presentación */}
          {product.presentacion && product.presentacion.toUpperCase() !== "FALSO" && (
            <div
              style={{
                fontSize: 15,
                color: "#1b4079",
                marginBottom: 8,
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              {product.presentacion}
            </div>
          )}
          {/* Vía de administración */}
          {product.viaAdministracion && (
            <div
              style={{
                fontSize: 14,
                color: "#2c4768",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              <strong>Vía administración:</strong> {product.viaAdministracion}
            </div>
          )}
          {/* Laboratorio */}
          {product.laboratorio && (
            <div
              style={{
                fontSize: 14,
                color: "#2c4768",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              <strong>Laboratorio:</strong> {product.laboratorio}
            </div>
          )}
          {/* Grupo */}
          {product.grupo && (
            <div
              style={{
                fontSize: 13.5,
                color: "#668",
                margin: "4px 0 10px 0",
                textAlign: "center",
              }}
            >
              <strong>Grupo:</strong> {product.grupo}
            </div>
          )}
          {/* SKU */}
          <div
            style={{
              fontSize: 13,
              color: "#7e8b9c",
              margin: "8px 0 0 0",
              textAlign: "center",
            }}
          >
            SKU: <b>{product.sku}</b>
          </div>
        </div>

        {/* SEPARACIÓN */}
        <div style={{
          width: 30,
          minWidth: 20,
          maxWidth: 40,
          background: "transparent"
        }} />

        {/* PANEL ALTERNATIVAS */}
        <div
          style={{
            flex: 1,
            minWidth: 340,
            maxWidth: 900,
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            borderRadius: "0 30px 30px 0",
            boxShadow: "none",
            padding: 0,
            overflow: "hidden",
            alignSelf: "stretch",
            height: "auto",
            maxHeight: "90vh"
          }}
        >
          {/* Header sticky */}
          <div style={{
            fontWeight: 800,
            fontSize: 22,
            color: "#089",
            padding: "32px 38px 15px 38px",
            borderBottom: "1px solid #eaeaea",
            background: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 2
          }}>
            Otras alternativas:
          </div>
          <div
            style={{
              overflowY: "auto",
              flex: 1,
              padding: "0 35px 34px 35px",
              scrollbarWidth: "thin"
            }}
          >
            {alternativas && alternativas.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 19 }}>
                {alternativas.map(prod => (
                  <button
                    key={prod.ItemCode}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 15,
                      padding: "13px 13px",
                      background: "#f6fbfe",
                      border: "1.6px solid #e0eef7",
                      borderRadius: 13,
                      cursor: "pointer",
                      textAlign: "left",
                      boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)",
                      transition: "box-shadow .18s, border .14s, background .14s",
                      minHeight: 67,
                      outline: "none"
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = "#e8f7ff";
                      e.currentTarget.style.boxShadow = "0 6px 18px 0 rgba(0,164,232,0.10)";
                      e.currentTarget.style.border = "1.7px solid #8ed7fb";
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = "#f6fbfe";
                      e.currentTarget.style.boxShadow = "0 2px 8px 0 rgba(0,0,0,0.07)";
                      e.currentTarget.style.border = "1.6px solid #e0eef7";
                    }}
                    onClick={() => {
                      if (typeof onAlternativeClick === "function") onAlternativeClick(prod);
                    }}
                  >
                    <img
                      src={prod.imagen || "logo.png"}
                      alt={prod.nombre}
                      style={{
                        width: 58, height: 58,
                        borderRadius: 9,
                        objectFit: "contain",
                        background: "#fff",
                        boxShadow: "0 1px 8px #eee"
                      }}
                      onError={e => (e.target.src = "logo.png")}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 700,
                        color: "#1e3755",
                        fontSize: 17,
                        lineHeight: 1.22,
                        marginBottom: 2
                      }}>
                        {prod.nombre}
                      </div>
                      <div style={{
                        fontSize: 15.5,
                        color: "#00a4e8",
                        fontWeight: 700,
                        marginTop: 0
                      }}>
                        ${prod.precioTotal ? prod.precioTotal.toLocaleString("es-CL") : "-"}
                      </div>
                      {prod.laboratorio && (
                        <div style={{
                          fontSize: 13,
                          color: "#25a06c",
                          marginTop: 2,
                          fontWeight: 600
                        }}>
                          {prod.laboratorio}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ color: "#666", fontSize: 15, marginTop: 22, textAlign: "center" }}>No hay alternativas disponibles.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

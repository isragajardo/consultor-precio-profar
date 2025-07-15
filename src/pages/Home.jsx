import React, { useState, useEffect, useCallback } from "react";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import ProductModal from "../components/ProductModal";
import ClaimModal from "../components/ClaimModal";

const PAGE_SIZE = 50;

function filterProducts(products, query) {
  if (!query) return products;
  const q = query.toLowerCase();
  return products.filter(
    p =>
      (p.nombreFantasia && p.nombreFantasia.toLowerCase().includes(q)) ||
      (p.principioActivo && p.principioActivo.toLowerCase().includes(q)) ||
      (p.ItemCode && p.ItemCode.toString().includes(q))
  );
}

// Orden personalizado para nombre y prioridad visual
function sortProducts(a, b) {
  function group(prod) {
    if (!prod.nombreFantasia || prod.nombreFantasia.length === 0) return 3;
    const first = prod.nombreFantasia.trim()[0];
    if (/^[a-zA-Z]$/.test(first)) return 0; // Letras
    if (/^\d$/.test(first)) return 1;       // Números
    return 2;                               // Otros (paréntesis, *, etc)
  }
  const gA = group(a);
  const gB = group(b);
  if (gA !== gB) return gA - gB;

  // Imagen presente (los que no tienen imagen al final)
  const hasImgA = !!a.imagen;
  const hasImgB = !!b.imagen;
  if (!hasImgA && hasImgB) return 1;
  if (hasImgA && !hasImgB) return -1;

  // Alfabético
  if (!a.nombreFantasia) return 1;
  if (!b.nombreFantasia) return -1;
  return a.nombreFantasia.localeCompare(b.nombreFantasia, "es", { sensitivity: "base" });
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [modalProduct, setModalProduct] = useState(null);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Nuevos estados para filtros
  const [categoria, setCategoria] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState(""); // "asc", "desc" o ""

  useEffect(() => {
    fetch("productosProfar.json")
      .then(r => r.json())
      .then(data => setProducts(data));
  }, []);

  // Opciones únicas de categoría y laboratorio (solo productos activos)
  const categoriasUnicas = React.useMemo(
    () =>
      Array.from(
        new Set(
          products
            .filter(p => !p.descontinuado && p.categoria && p.categoria !== "")
            .map(p => p.categoria)
        )
      ).sort(),
    [products]
  );
  const laboratoriosUnicos = React.useMemo(
    () =>
      Array.from(
        new Set(
          products
            .filter(p => !p.descontinuado && p.laboratorio && p.laboratorio !== "")
            .map(p => p.laboratorio)
        )
      ).sort(),
    [products]
  );

  // Aplicar todos los filtros
  let filtered = filterProducts(products, query)
    .filter(p => !p.descontinuado)
    .filter(p => !categoria || p.categoria === categoria)
    .filter(p => !laboratorio || p.laboratorio === laboratorio);

  // Ordenar por precio si corresponde
  if (ordenPrecio === "asc") filtered = [...filtered].sort((a, b) => (a.precioTotal || 0) - (b.precioTotal || 0));
  else if (ordenPrecio === "desc") filtered = [...filtered].sort((a, b) => (b.precioTotal || 0) - (a.precioTotal || 0));
  else filtered = filtered.sort(sortProducts);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset de página si cambian los filtros o búsqueda
  useEffect(() => {
    setPage(1);
  }, [query, categoria, laboratorio, ordenPrecio]);

  // ---- Alternativas para modal ----
  // Memoriza la función para evitar rerender innecesario
  const findAlternativas = useCallback(
    (baseProduct) => {
      if (!baseProduct || !baseProduct.principioActivo) return [];
      return products.filter(
        p =>
          !p.descontinuado &&
          p.ItemCode !== baseProduct.ItemCode &&
          p.principioActivo &&
          p.principioActivo.toLowerCase() === baseProduct.principioActivo.toLowerCase()
      );
    },
    [products]
  );

  // Permite actualizar el modal con una alternativa al hacer click
  const [modalAlternativas, setModalAlternativas] = useState([]);
  useEffect(() => {
    if (modalProduct) {
      setModalAlternativas(findAlternativas(modalProduct));
    } else {
      setModalAlternativas([]);
    }
  }, [modalProduct, findAlternativas]);

  // Maneja click en alternativa
  const handleAlternativeClick = (altProduct) => {
    setModalProduct(altProduct);
    setTimeout(() => window.scrollTo(0, 0), 100); // opcional: subir arriba al cambiar modal
  };

  return (
    <div className="App">
      {/* HEADER sticky arriba */}
      <div className="header-sticky">
        <img
          src="logo.png"
          className="logo-header"
          alt="Profar Consultor"
        />
        <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
          <SearchBar
            value={query}
            onChange={q => {
              setQuery(q);
              setPage(1);
            }}
          />
        </div>
      </div>
      {/* Layout principal: sidebar + contenido */}
      <div className="main-content">
        {/* Sidebar lateral de filtros */}
        <aside className="aside-filters">
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10, color: "#238" }}>
            Filtrar por:
          </div>
          {/* Filtro Categoría */}
          <div>
            <label style={{ fontWeight: 600, color: "#007bbd", fontSize: 15, marginBottom: 4, display: "block" }}>Categoría</label>
            <select
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
              style={{
                width: "100%",
                padding: "7px 9px",
                borderRadius: 6,
                border: "1px solid #00a4e8",
                fontSize: 15,
                marginTop: 4,
                marginBottom: 7,
              }}
            >
              <option value="">Todas</option>
              {categoriasUnicas.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          {/* Filtro Laboratorio */}
          <div>
            <label style={{ fontWeight: 600, color: "#007bbd", fontSize: 15, marginBottom: 4, display: "block" }}>Laboratorio</label>
            <select
              value={laboratorio}
              onChange={e => setLaboratorio(e.target.value)}
              style={{
                width: "100%",
                padding: "7px 9px",
                borderRadius: 6,
                border: "1px solid #00a4e8",
                fontSize: 15,
                marginTop: 4,
                marginBottom: 7,
              }}
            >
              <option value="">Todos</option>
              {laboratoriosUnicos.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          {/* Filtro Precio */}
          <div>
            <label style={{ fontWeight: 600, color: "#007bbd", fontSize: 15, marginBottom: 4, display: "block" }}>Precio</label>
            <select
              value={ordenPrecio}
              onChange={e => setOrdenPrecio(e.target.value)}
              style={{
                width: "100%",
                padding: "7px 9px",
                borderRadius: 6,
                border: "1px solid #00a4e8",
                fontSize: 15,
                marginTop: 4,
                marginBottom: 7,
              }}
            >
              <option value="">Cualquiera</option>
              <option value="asc">Menor a mayor</option>
              <option value="desc">Mayor a menor</option>
            </select>
          </div>
          {/* Botón limpiar */}
          {(categoria || laboratorio || ordenPrecio) && (
            <button
              style={{
                marginTop: 8,
                width: "100%",
                padding: "8px 0",
                borderRadius: 7,
                background: "#e0eaf7",
                border: "none",
                color: "#007bbd",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer"
              }}
              onClick={() => {
                setCategoria("");
                setLaboratorio("");
                setOrdenPrecio("");
              }}
            >
              Limpiar filtros
            </button>
          )}
        </aside>
        {/* Contenido principal */}
        <div style={{
          flex: 1,
          padding: "36px 0 0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "60vh",
        }}>
          {/* Grilla de productos */}
          <ProductGrid products={paginated} onProductClick={setModalProduct} />

          {/* Paginador */}
          <div className="paginator">
            {page > 1 && (
              <button onClick={() => setPage(page - 1)}>Anterior</button>
            )}
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
            {page < pageCount && (
              <button onClick={() => setPage(page + 1)}>Siguiente</button>
            )}
          </div>
        </div>
      </div>
      {/* Botón flotante reclamo */}
      <button
        onClick={() => setClaimModalOpen(true)}
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 2000,
          background: "#00a4e8",
          color: "#fff",
          border: "none",
          borderRadius: 30,
          fontWeight: 700,
          fontSize: 18,
          padding: "18px 38px 18px 32px",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.22)",
          cursor: "pointer",
          letterSpacing: ".02em",
          display: "flex",
          alignItems: "center",
          transition: "box-shadow .18s, transform .10s",
        }}
        onMouseOver={e => {
          e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(0,164,232,0.32)";
          e.currentTarget.style.transform = "translateY(-3px) scale(1.035)";
        }}
        onMouseOut={e => {
          e.currentTarget.style.boxShadow = "0 4px 24px 0 rgba(0,0,0,0.22)";
          e.currentTarget.style.transform = "none";
        }}
        title="Enviar reclamo"
      >
        <svg
          width={28}
          height={28}
          fill="none"
          viewBox="0 0 24 24"
          style={{ marginRight: 14 }}
        >
          {/* Ícono tipo megáfono o comentario */}
          <path
            d="M17.293 2.293A1 1 0 0 1 18 2h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3.382l-3.447 2.724A1 1 0 0 1 10 19v-1h-1a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h8a1 1 0 0 1 .707.293z"
            fill="#fff"
            opacity="0.8"
          />
        </svg>
        Reclamo
      </button>

      {/* Modales */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          alternativas={modalAlternativas}
          onAlternativeClick={handleAlternativeClick}
        />
      )}
      {claimModalOpen && (
        <ClaimModal onClose={() => setClaimModalOpen(false)} />
      )}
      {/* Footer */}
      <div style={{ textAlign: "center", fontSize: 13, color: "#bbb", margin: "30px 0" }}>
        <span>
          Plataforma de Consulta de Precios - Profar {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}

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

function sortProducts(a, b) {
  function group(prod) {
    if (!prod.nombreFantasia || prod.nombreFantasia.length === 0) return 3;
    const first = prod.nombreFantasia.trim()[0];
    if (/^[a-zA-Z]$/.test(first)) return 0; // Letras
    if (/^\d$/.test(first)) return 1;       // Números
    return 2;                               // Otros
  }
  const gA = group(a);
  const gB = group(b);
  if (gA !== gB) return gA - gB;
  const hasImgA = !!a.imagen;
  const hasImgB = !!b.imagen;
  if (!hasImgA && hasImgB) return 1;
  if (hasImgA && !hasImgB) return -1;
  if (!a.nombreFantasia) return 1;
  if (!b.nombreFantasia) return -1;
  return a.nombreFantasia.localeCompare(b.nombreFantasia, "es", { sensitivity: "base" });
}

function getPaginationPages(page, pageCount) {
  // Siempre muestra la primera y última página, y dos a cada lado de la actual
  const pages = [];
  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i++) pages.push(i);
    return pages;
  }
  pages.push(1);
  if (page > 4) pages.push("...");
  for (let i = Math.max(2, page - 2); i <= Math.min(pageCount - 1, page + 2); i++) {
    pages.push(i);
  }
  if (page < pageCount - 3) pages.push("...");
  pages.push(pageCount);
  return pages;
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [modalProduct, setModalProduct] = useState(null);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Filtros
  const [categoria, setCategoria] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState(""); // "asc", "desc" o ""
  const [showFilters, setShowFilters] = useState(false);

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

  // Aplicar filtros
  let filtered = filterProducts(products, query)
    .filter(p => !p.descontinuado)
    .filter(p => !categoria || p.categoria === categoria)
    .filter(p => !laboratorio || p.laboratorio === laboratorio);

  if (ordenPrecio === "asc") filtered = [...filtered].sort((a, b) => (a.precioTotal || 0) - (b.precioTotal || 0));
  else if (ordenPrecio === "desc") filtered = [...filtered].sort((a, b) => (b.precioTotal || 0) - (a.precioTotal || 0));
  else filtered = filtered.sort(sortProducts);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [query, categoria, laboratorio, ordenPrecio]);

  // Alternativas para modal
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
  const [modalAlternativas, setModalAlternativas] = useState([]);
  useEffect(() => {
    if (modalProduct) setModalAlternativas(findAlternativas(modalProduct));
    else setModalAlternativas([]);
  }, [modalProduct, findAlternativas]);

  const handleAlternativeClick = (altProduct) => {
    setModalProduct(altProduct);
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  // ---- PAGINADOR ----
  const paginationPages = getPaginationPages(page, pageCount);

  return (
    <div className="App">
      {/* HEADER sticky arriba */}
      <div className="header-sticky">
        <img src="logo.png" className="logo-header" alt="Profar Consultor" />
        <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
          <SearchBar
            value={query}
            onChange={q => {
              setQuery(q);
              setPage(1);
            }}
          />
        </div>

        {/* Barra azul "Filtros" */}
        <button className="filtros-barra" onClick={() => setShowFilters(s => !s)}>
          <span style={{ fontSize: 20, marginRight: 8 }}>☰</span> Filtros
        </button>

        {/* Panel de filtros (horizontal, debajo de barra) */}
        {showFilters && (
          <div className="panel-filtros">
            <div>
              <label className="filters-label">Categoría</label>
              <select
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
                className="filters-select"
              >
                <option value="">Todas</option>
                {categoriasUnicas.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="filters-label">Laboratorio</label>
              <select
                value={laboratorio}
                onChange={e => setLaboratorio(e.target.value)}
                className="filters-select"
              >
                <option value="">Todos</option>
                {laboratoriosUnicos.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="filters-label">Precio</label>
              <select
                value={ordenPrecio}
                onChange={e => setOrdenPrecio(e.target.value)}
                className="filters-select"
              >
                <option value="">Cualquiera</option>
                <option value="asc">Menor a mayor</option>
                <option value="desc">Mayor a menor</option>
              </select>
            </div>
            {(categoria || laboratorio || ordenPrecio) && (
              <button
                className="filters-clear"
                onClick={() => {
                  setCategoria("");
                  setLaboratorio("");
                  setOrdenPrecio("");
                }}
              >
                Limpiar filtros
              </button>
            )}
            <button className="cerrar-filtros" onClick={() => setShowFilters(false)}>
              Cerrar ✕
            </button>
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        <div style={{
          flex: 1,
          padding: "5px 0 0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "60vh",
        }}>
          {/* Grilla de productos */}
          <ProductGrid products={paginated} onProductClick={setModalProduct} />

          {/* Paginador ACOTADO */}
          <div className="paginator">
            {page > 1 && (
              <button onClick={() => setPage(page - 1)}>Anterior</button>
            )}
            {paginationPages.map((p, i) => (
              p === "..."
                ? <span key={`dots-${i}`} style={{ margin: "0 5px" }}>...</span>
                : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={page === p ? "active" : ""}
                  >
                    {p}
                  </button>
                )
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

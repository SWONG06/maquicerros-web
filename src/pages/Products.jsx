import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const API_URL =
    import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "") ||
    "http://localhost:5000";

  // 🧩 Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data.data || []);
        setFiltered(data.data || []);
      } catch (error) {
        console.error("❌ Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_URL]);

  // 🔄 Actualizar búsqueda desde la URL
  useEffect(() => {
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [searchQuery]);

  // 🔍 Filtros dinámicos
  useEffect(() => {
    let result = [...products];

    // Buscar por texto
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por marca (si existe)
    if (brandFilter !== "all") {
      result = result.filter((p) => p.brand === brandFilter);
    }

    // Filtrar por precio
    if (priceFilter !== "all") {
      if (priceFilter === "low") result = result.filter((p) => p.price < 50);
      if (priceFilter === "mid")
        result = result.filter((p) => p.price >= 50 && p.price <= 200);
      if (priceFilter === "high") result = result.filter((p) => p.price > 200);
    }

    setFiltered(result);
  }, [search, brandFilter, priceFilter, products]);

  // 🧹 Limpiar filtros
  const clearFilters = () => {
    setSearch("");
    setBrandFilter("all");
    setPriceFilter("all");
  };

  // Verificar si hay filtros activos
  const hasActiveFilters =
    search.trim() !== "" || brandFilter !== "all" || priceFilter !== "all";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 🏷️ Encabezado */}
      <section className="py-16 bg-linear-to-r from-[#111827] via-[#3a1d0f] to-[#d9480f] text-white text-center shadow-md">
        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">
          Catálogo de Productos
        </h1>
        <p className="text-lg opacity-90">
          Explora nuestra selección de herramientas y materiales profesionales.
        </p>
      </section>

      {/* 🔍 Barra de filtros */}
      <section className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row flex-wrap gap-4 justify-center items-center bg-white/80 dark:bg-secondary/70 backdrop-blur-md rounded-lg shadow-lg -mt-10">
        {/* Buscar */}
        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-1/3 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
        />

        {/* Filtro marca */}
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="w-full lg:w-1/4 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
        >
          <option value="all">Todas las marcas</option>
          <option value="Bosch">Bosch</option>
          <option value="Stanley">Stanley</option>
          <option value="Truper">Truper</option>
        </select>

        {/* Filtro precio */}
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="w-full lg:w-1/4 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
        >
          <option value="all">Todos los precios</option>
          <option value="low">Menos de S/ 50</option>
          <option value="mid">S/ 50 - S/ 200</option>
          <option value="high">Más de S/ 200</option>
        </select>

        {/* Botón limpiar */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-md font-medium flex items-center gap-2 transition-all shadow-md hover:scale-105"
          >
            🧹 Limpiar
          </button>
        )}
      </section>

      {/* 🧰 Resultados */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          {loading ? (
            <p className="text-center text-gray-500">Cargando productos...</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">😕 No se encontraron productos.</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-md shadow-md transition-all"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 text-center">
                {filtered.length} productos encontrados.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;

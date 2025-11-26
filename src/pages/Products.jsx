import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/mock/products.json");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // 📌 Leer categoría desde la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("cat");

    if (cat) {
      setCategory(cat);
    }
  }, [location.search]);

  const filtered = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    const matchesPrice =
      priceFilter === "all"
        ? true
        : priceFilter === "low"
        ? product.price <= 300
        : priceFilter === "mid"
        ? product.price > 300 && product.price <= 800
        : product.price > 800;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setPriceFilter("all");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* TÍTULO */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white">
          Catálogo de Productos
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Filtra por categoría, precio o usa el buscador.
        </p>

        {/* FILTROS */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-10">
          <input
            type="text"
            placeholder="🔍 Buscar productos..."
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Todas las categorías</option>
              <option value="electricas">Herramientas eléctricas</option>
              <option value="maquinaria">Maquinaria pesada</option>
              <option value="accesorios">Accesorios y repuestos</option>
            </select>

            <select
              className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">Todos los precios</option>
              <option value="low">Hasta S/300</option>
              <option value="mid">S/300 a S/800</option>
              <option value="high">Más de S/800</option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="w-full mt-4 bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-xl font-semibold"
          >
            Limpiar filtros
          </button>
        </div>

        {/* PRODUCTOS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productos;

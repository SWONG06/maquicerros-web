import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "") ||
    "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("🌍 Cargando desde:", `${API_URL}/api/products`);
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        console.log("📦 Respuesta backend:", data);
        setProducts(data.data || []);
      } catch (error) {
        console.error("❌ Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  // 🔍 Función que redirige con el query
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/productos?query=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/productos");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 🧱 Hero principal */}
      <section className="relative w-full h-[420px] bg-linear-to-r from-[#111827] via-[#3a1d0f] to-[#d9480f] flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg">
            Herramientas y maquinaria profesional
          </h1>

          {/* 🔍 Input + botón */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="w-72 sm:w-96 px-5 py-3 rounded-lg bg-white/15 text-white placeholder-gray-300 border border-white/30 backdrop-blur-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* 🔸 Degradado inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-gray-900/50 to-transparent pointer-events-none"></div>
      </section>

      {/* 🧰 Productos destacados */}
      <section className="py-16 bg-white dark:bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Productos destacados
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Cargando productos...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">
              No hay productos disponibles.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
              {products.slice(0, 8).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

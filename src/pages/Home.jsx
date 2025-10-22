import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '') || "http://localhost:5000";

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-linear-to-r from-primary to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Herramientas y maquinaria profesional</h1>
          <Link
            to="/productos"
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          >
            Ver productos
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Productos destacados
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Cargando productos...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No hay productos disponibles.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

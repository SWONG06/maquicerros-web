import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌐 Usa variable de entorno (para local y producción)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Banner */}
      <section className="bg-linear-to-r from-primary to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Herramientas y maquinaria para profesionales
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto">
            Compra en Maquicerros S.A.C. — productos industriales y de ferretería de alta calidad.
          </p>
          <Link
            to="/productos"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
          >
            Ver todos los productos
          </Link>
        </div>
      </section>

      {/* Productos Reales */}
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
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

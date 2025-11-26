import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/mock/products.json");
        const data = await res.json();
        setProducts(data || []);
      } catch (error) {
        console.error("❌ Error al cargar productos simulados:", error);
      }
    };

    fetchProducts();
  }, []);

  const goToCategory = (cat) => {
    navigate(`/productos?cat=${cat}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">

      {/* HERO */}
      <Hero />

      {/* CATEGORÍAS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Categorías destacadas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div
            onClick={() => goToCategory("electricas")}
            className="relative h-48 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
          >
            <img src="/tools_electrics.png" className="w-full h-full object-cover group-hover:scale-110 transition" />
            <div className="absolute inset-0 bg-black/40"></div>
            <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">Herramientas eléctricas</h3>
          </div>

          <div
            onClick={() => goToCategory("maquinaria")}
            className="relative h-48 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
          >
            <img src="/hero.png" className="w-full h-full object-cover group-hover:scale-110 transition" />
            <div className="absolute inset-0 bg-black/40"></div>
            <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">Maquinaria pesada</h3>
          </div>

          <div
            onClick={() => goToCategory("accesorios")}
            className="relative h-48 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
          >
            <img src="/hero.png" className="w-full h-full object-cover group-hover:scale-110 transition" />
            <div className="absolute inset-0 bg-black/40"></div>
            <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">Accesorios y repuestos</h3>
          </div>

        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Productos destacados
          </h2>

          {products.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">Cargando productos...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">

              {products
                .filter((p) => [1, 2, 3, 4].includes(p.id))
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}

            </div>
          )}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          ¿Por qué elegir Maquicerros?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl mb-3">⚡</div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Entrega rápida</h3>
            <p className="text-gray-600 dark:text-gray-300">Recibe tus herramientas en tiempo récord.</p>
          </div>

          <div>
            <div className="text-5xl mb-3">🛠️</div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Calidad garantizada</h3>
            <p className="text-gray-600 dark:text-gray-300">Herramientas profesionales para trabajo real.</p>
          </div>

          <div>
            <div className="text-5xl mb-3">💳</div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Pagos flexibles</h3>
            <p className="text-gray-600 dark:text-gray-300">Aceptamos Yape, Plin, tarjeta y más.</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-orange-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">¿Listo para comprar?</h2>
        <p className="text-lg mb-8 opacity-90">Explora nuestro catálogo completo.</p>

        <Link
          to="/productos"
          className="px-10 py-4 bg-white text-orange-600 font-bold text-lg rounded-xl shadow-lg hover:bg-gray-200 transition">
          Ver productos
        </Link>
      </section>
    </div>
  );
};

export default Home;

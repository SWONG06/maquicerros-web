import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  // Cargar mock
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/mock/products.json");
      const data = await res.json();
      setProducts(data);
      setFeatured(data.slice(0, 4));
    };
    load();
  }, []);

  return (
    <div className="bg-[#0D0D0D] min-h-screen">

      {/* HERO */}
      <section className="py-20 bg-linear-to-r from-black via-[#1A1A1A] to-black text-yellow-400 text-center shadow-xl border-b border-yellow-500/30">
        
        <h1 className="text-5xl font-extrabold drop-shadow-[0_0_10px_rgba(246,196,0,0.4)]">
          Maquinaria y Herramientas Profesionales
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Potencia industrial para tus proyectos más exigentes.
        </p>

        {/* BUSQUEDA */}
        <div className="mt-10 flex justify-center">
          <div className="flex bg-[#1A1A1A] border border-yellow-500/40 rounded-lg p-2 shadow-lg shadow-yellow-500/20 w-full max-w-lg">
            <input
              placeholder="Buscar productos..."
              className="flex-1 px-4 py-2 bg-transparent text-yellow-400 placeholder-gray-500 outline-none"
            />
            <Link
              to="/productos"
              className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-md transition-all"
            >
              Buscar
            </Link>
          </div>
        </div>

      </section>

      {/* DESTACADOS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-10 drop-shadow">
          Productos destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/productos"
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-bold shadow-lg shadow-yellow-500/20 transition-all"
          >
            Ver todos los productos →
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;

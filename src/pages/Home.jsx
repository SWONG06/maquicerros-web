import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

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

      {/* === HERO === */}
      <section className="py-14 px-4 sm:py-20 bg-linear-to-b from-black via-[#111] to-black text-yellow-400 text-center border-b border-yellow-500/20">

        {/* TITULO */}
        <h1 className="
          text-3xl 
          sm:text-5xl 
          font-extrabold 
          leading-tight 
          drop-shadow-[0_0_10px_rgba(246,196,0,0.35)]
        ">
          Maquinaria y Herramientas <br className="hidden sm:block" />
          Profesionales
        </h1>

        {/* SUBTITULO */}
        <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-md mx-auto">
          Potencia industrial para tus proyectos más exigentes.
        </p>

        {/* BUSCADOR */}
        <div className="mt-8 flex justify-center">
          <div className="
            flex 
            bg-[#1A1A1A] 
            border border-yellow-500/40 
            rounded-lg 
            p-2 
            w-full 
            max-w-md 
            shadow-lg shadow-yellow-500/20
          ">
            <input
              placeholder="Buscar productos…"
              className="
                flex-1 
                px-3 
                py-2 
                bg-transparent 
                text-yellow-400 
                placeholder-gray-500 
                outline-none 
                text-sm
              "
            />
            <Link
              to="/productos"
              className="
                px-4 
                py-2 
                bg-yellow-500 
                hover:bg-yellow-400 
                text-black 
                font-semibold 
                rounded-md 
                transition-all 
                text-sm
              "
            >
              Buscar
            </Link>
          </div>
        </div>
      </section>

      {/* === DESTACADOS === */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-10 drop-shadow">
          Productos destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* VER TODOS */}
        <div className="mt-10 text-center">
          <Link
            to="/productos"
            className="
              px-6 py-3 
              bg-yellow-500 
              hover:bg-yellow-400 
              text-black 
              rounded-lg 
              font-bold 
              shadow-lg shadow-yellow-500/20 
              transition-all
            "
          >
            Ver todos los productos →
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;

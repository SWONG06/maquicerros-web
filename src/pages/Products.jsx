import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/mock/products.json");
      const data = await res.json();

      setProducts(data);
      setFiltered(data);
    };
    load();
  }, []);

  // 🔍 Búsqueda
  useEffect(() => {
    let result = products;

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, products]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-200 pb-20">

      {/* 💛 HEADER */}
      <section className="py-16 text-center bg-linear-to-r from-black via-[#1A1A1A] to-black 
                          border-b border-yellow-500/40 shadow-lg shadow-yellow-500/10">
        <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-[0_0_10px_rgba(246,196,0,0.3)]">
          Catálogo de Productos
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Explora nuestra maquinaria y herramientas profesionales.
        </p>

        {/* 🔍 BUSCADOR */}
        <div className="mt-10 flex justify-center">
          <div className="flex bg-[#1A1A1A] border border-yellow-500/40 rounded-lg p-2 
                          shadow-yellow-500/20 w-full max-w-xl">
            <input
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 bg-transparent text-yellow-400 placeholder-gray-500 outline-none"
            />
            <button
              className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-md transition-all"
            >
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* GRID DE PRODUCTOS */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 text-lg mt-20">
            No se encontraron productos.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Products;

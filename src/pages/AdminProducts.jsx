import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/currency";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products_sim")) || [];
    setProducts(saved);
  }, []);

  const deleteProduct = (id) => {
    if (!confirm("¿Eliminar producto?")) return;

    const newList = products.filter((p) => p.id !== id);
    setProducts(newList);
    localStorage.setItem("products_sim", JSON.stringify(newList));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10">
      <div className="flex justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Productos (Admin)
        </h1>

        <Link
          to="/admin/productos/nuevo"
          className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl shadow-md"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="space-y-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.imageUrl}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div>
                <h2 className="font-bold text-xl text-gray-900 dark:text-white">
                  {p.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-300">
                  {formatPrice(p.price)}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to={`/admin/productos/editar/${p.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Editar
              </Link>

              <button
                onClick={() => deleteProduct(p.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("products_sim")) || [];

    const newProduct = {
      ...product,
      id: Date.now(),
      price: Number(product.price),
      stock: Number(product.stock),
    };

    saved.push(newProduct);
    localStorage.setItem("products_sim", JSON.stringify(saved));

    navigate("/admin/productos");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
        Nuevo Producto
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl max-w-3xl"
      >
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">Nombre</span>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700"
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
            />
          </label>

          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">
              Descripción
            </span>
            <textarea
              rows="3"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700"
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Precio</span>
              <input
                type="number"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </label>

            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Stock</span>
              <input
                type="number"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.value })
                }
              />
            </label>
          </div>

          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">
              Imagen (URL)
            </span>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700"
              onChange={(e) =>
                setProduct({ ...product, imageUrl: e.target.value })
              }
            />
          </label>

          <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-500">
            Guardar producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;

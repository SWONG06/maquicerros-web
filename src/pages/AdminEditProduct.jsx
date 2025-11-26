import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products_sim")) || [];
    const found = saved.find((p) => p.id === Number(id));

    if (!found) {
      alert("Producto no encontrado");
      navigate("/admin/productos");
      return;
    }

    setProduct(found);
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("products_sim")) || [];

    const updatedList = saved.map((p) =>
      p.id === Number(id)
        ? {
            ...product,
            price: Number(product.price),
            stock: Number(product.stock),
          }
        : p
    );

    localStorage.setItem("products_sim", JSON.stringify(updatedList));

    navigate("/admin/productos");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
        Editar Producto
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
              value={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 dark:text-gray-300">
              Descripción
            </span>
            <textarea
              rows="3"
              required
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Precio</span>
              <input
                type="number"
                required
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700"
              />
            </label>

            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Stock</span>
              <input
                type="number"
                required
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700"
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
              value={product.imageUrl}
              onChange={(e) =>
                setProduct({ ...product, imageUrl: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700"
            />
          </label>

          <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-500">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;

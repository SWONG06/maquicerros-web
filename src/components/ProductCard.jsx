import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} fue agregado al carrito 🛒`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300">
      {/* 🖼 Imagen del producto */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
        <img
          src={product.imageUrl || product.image || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          draggable="false"
        />
      </div>

      {/* 🧾 Contenido */}
      <div className="p-4 flex flex-col justify-between h-[250px]">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {product.description || "Producto sin descripción disponible."}
          </p>
        </div>

        {/* 💰 Precio + botones */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto pt-3 border-t border-gray-200 dark:border-gray-700 gap-3">
          <span className="text-2xl font-bold text-orange-600">
            S/ {parseFloat(product.price || 0).toFixed(2)}
          </span>

          <div className="flex gap-2 justify-end flex-wrap">
            {/* 👁️ Ver detalle — siempre visible en todas las pantallas */}
            <Link
              to={`/productos/${product.id}`}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md text-sm font-medium transition-all shadow-sm hover:scale-105"
            >
              <EyeIcon className="h-5 w-5" />
              <span>Ver detalle</span>
            </Link>

            {/* 🛒 Agregar al carrito */}
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-md text-sm font-medium transition-all shadow-sm hover:scale-105"
              title="Agregar al carrito"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

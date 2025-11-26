import { memo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { ShoppingCartIcon, EyeIcon } from "@heroicons/react/24/outline";
import { formatPrice } from "../utils/currency";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { success } = useToast();

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addToCart(product);
    success(`${product.name} agregado al carrito`);
  };

  return (
    <div
      className="
      bg-white dark:bg-gray-800 rounded-xl shadow-md
      overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl
      w-full
    "
    >

      {/* Imagen bien proporcionada */}
      <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <img
          src={product.imageUrl || "/placeholder-product.png"}
          alt={product.name}
          className="object-contain w-full h-full p-3"
          onError={(e) => (e.target.src = '/placeholder-product.jpg')}
        />
      </div>

      <div className="p-4">

        {/* Título */}
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Precio y stock */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-orange-600">
            {formatPrice(product.price)}
          </span>

          {product.stock > 0 ? (
            <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-xs font-medium">
              Stock: {product.stock}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-xs font-medium">
              Agotado
            </span>
          )}
        </div>

        {/* Botones */}
        <div className="grid grid-cols-2 gap-2">
          {/* Ver */}
          <Link
            to={`/productos/${product.id}`}
            className="
              flex items-center justify-center gap-1
              bg-gray-200 dark:bg-gray-700
              text-gray-900 dark:text-white
              rounded-md py-2 text-sm
              hover:bg-gray-300 dark:hover:bg-gray-600 transition
            "
          >
            <EyeIcon className="w-4 h-4" />
            Ver
          </Link>

          {/* Agregar */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="
              flex items-center justify-center gap-1
              bg-orange-600 text-white
              rounded-md py-2 text-sm
              hover:bg-orange-500 transition
              disabled:bg-gray-400 disabled:cursor-not-allowed
            "
          >
            <ShoppingCartIcon className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);

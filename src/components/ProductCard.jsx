import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";  // ⬅️ IMPORTANTE
import { ShoppingCartIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast(); // ⬅️ USO DEL TOAST

  const handleAdd = () => {
    addToCart(product);

    showToast(`🛠️ Añadiendo "${product.name}" a tu carrito...`); 
    // Mensaje elegante estilo Maquicerros
  };

  return (
    <div
      className="
        bg-[#0D0D0D] 
        border border-yellow-500/40 
        rounded-xl 
        shadow-lg 
        overflow-hidden 
        transition-all 
        hover:shadow-yellow-500/40 
        hover:-translate-y-2
      "
    >
      {/* Imagen del producto */}
      <div className="relative aspect-square bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
        <img
          src={product.imageUrl || product.image || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col h-60">
        <h3 className="text-lg font-bold text-yellow-400 line-clamp-2 mb-2 tracking-wide">
          {product.name}
        </h3>

        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
          {product.description || "Producto sin descripción disponible."}
        </p>

        {/* Precio + botones */}
        <div className="mt-auto pt-3 border-t border-gray-700 flex flex-col gap-3">
          <span className="text-2xl font-extrabold text-yellow-400 drop-shadow">
            S/ {parseFloat(product.price).toFixed(2)}
          </span>

          <div className="flex items-center justify-between gap-2">
            {/* Ver detalle */}
            <Link
              to={`/productos/${product.id}`}
              className="
                flex items-center gap-1 
                px-3 py-2 
                bg-[#1A1A1A] 
                border border-yellow-500 
                text-yellow-500 
                rounded-md 
                text-sm font-semibold 
                hover:bg-yellow-500 
                hover:text-black 
                transition-all
              "
            >
              <EyeIcon className="w-5 h-5" />
              Ver detalle
            </Link>

            {/* Agregar */}
            <button
              onClick={handleAdd}
              className="
                flex items-center gap-1 
                px-3 py-2 
                bg-yellow-500 
                hover:bg-yellow-400 
                text-black 
                rounded-md 
                text-sm font-semibold 
                transition-all shadow-md
              "
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

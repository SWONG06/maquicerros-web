import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Evita que el click del botón dispare el link
    addToCart(product);
    alert(`${product.name} fue agregado al carrito 🛒`);
  };

  return (
    <Link
      to={`/productos/${product.id}`}
      className="
        block bg-white dark:bg-secondary rounded-xl 
        shadow-md hover:shadow-2xl
        overflow-hidden 
        transform transition-all duration-300 
        hover:-translate-y-1 hover:scale-[1.02]
        border border-transparent hover:border-primary/30
      "
    >
      {/* Imagen */}
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700">
        <img
          src={product.imageUrl || product.image || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description || "Producto sin descripción disponible."}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            S/ {parseFloat(product.price || 0).toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="
              bg-primary hover:bg-primary/90 text-white 
              px-4 py-2 rounded-md font-medium 
              transition-colors duration-200 transform hover:scale-105
              shadow-sm hover:shadow-md
            "
          >
            Agregar
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

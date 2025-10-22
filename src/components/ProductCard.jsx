import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} fue agregado al carrito 🛒`);
  };

  return (
    <div className="bg-white dark:bg-secondary rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700">
        <img
          src={product.imageUrl || product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description || 'Producto sin descripción disponible.'}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            S/ {parseFloat(product.price || 0).toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 transform hover:scale-105"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { useCart } from '../context/CartContext';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center space-x-4 bg-white dark:bg-secondary p-4 rounded-lg shadow-sm">
      <img
        src={item.image || '/placeholder-product.jpg'}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {item.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          S/ {item.price.toFixed(2)} cada uno
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-medium">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-primary">
          S/ {(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 transition-colors duration-200 mt-1"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

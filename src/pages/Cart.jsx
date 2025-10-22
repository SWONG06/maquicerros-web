import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Tu carrito está vacío 🛒
        </h2>
        <Link
          to="/productos"
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto bg-white dark:bg-secondary p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          🛍️ Carrito de compras
        </h1>

        {/* Lista de productos */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-4"
            >
              <img
                src={item.imageUrl || item.image || "/placeholder-product.jpg"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  S/ {item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md"
                >
                  -
                </button>
                <span className="text-lg text-gray-900 dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md"
                >
                  +
                </button>
              </div>

              <p className="text-lg font-semibold text-primary">
                S/ {(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* Total y botones */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Total: S/ {total.toFixed(2)}
          </h2>
          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Vaciar carrito
            </button>
            <Link
              to="/checkout"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium"
            >
              Continuar al pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

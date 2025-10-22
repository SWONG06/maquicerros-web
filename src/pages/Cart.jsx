import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, getTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const subtotal = getTotal();
  const shipping = subtotal > 100 ? 0 : 15.99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              ¡Agrega algunos productos para comenzar tu compra!
            </p>
            <Link
              to="/productos"
              className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Explorar Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Carrito de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-secondary rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Productos ({cart.length})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200 text-sm font-medium"
                >
                  Vaciar carrito
                </button>
              </div>
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-secondary rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'Gratis' : `S/ ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {isAuthenticated ? (
                <Link
                  to="/checkout"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-semibold text-center block transition-colors duration-200"
                >
                  Proceder al Pago
                </Link>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Debes iniciar sesión para continuar
                  </p>
                  <Link
                    to="/login"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-semibold text-center block transition-colors duration-200"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              )}

              <Link
                to="/productos"
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 px-4 rounded-lg font-semibold text-center block mt-3 transition-colors duration-200"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

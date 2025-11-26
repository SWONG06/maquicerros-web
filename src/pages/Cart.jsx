import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";

const Cart = () => {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

        {/* Título */}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
          🛒 Tu Carrito de Compras
        </h1>

        {/* Si está vacío */}
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-300 text-lg mb-6">
              Tu carrito está vacío.
            </p>

            <Link
              to="/productos"
              className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-lg font-semibold shadow-lg transition"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            {/* Listado de productos */}
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-gray-100 dark:bg-gray-700 shadow-md"
                >
                  {/* Imagen */}
                  <img
                    src={
                      item.imageUrl ||
                      item.image ||
                      item.img ||
                      "/placeholder-product.jpg"
                    }
                    alt={item.name}
                    className="w-40 h-40 object-contain rounded-xl bg-white shadow"
                  />

                  {/* Información */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.name}
                    </h3>

                    <p className="text-lg text-primary font-bold mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Subtotal */}
                    <p className="mt-1 text-gray-700 dark:text-gray-300 text-sm">
                      Subtotal:{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </p>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="w-9 h-9 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-xl font-bold text-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                    >
                      -
                    </button>

                    <span className="text-lg font-bold text-gray-900 dark:text-white w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-xl font-bold text-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 font-semibold hover:text-red-600 transition"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            {/* Totales */}
            <div className="mt-10 bg-gray-100 dark:bg-gray-700 rounded-2xl p-8 shadow-inner">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Total del pedido:
              </h2>
              <p className="text-4xl font-extrabold text-orange-600 mb-6">
                {formatPrice(total)}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/productos"
                  className="flex-1 text-center px-6 py-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-xl font-semibold transition"
                >
                  Seguir comprando
                </Link>

                <Link
                  to="/checkout"
                  state={{ fromCart: true }}
                  className="flex-1 text-center px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
                >
                  Finalizar compra
                </Link>

                <button
                  onClick={clearCart}
                  className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

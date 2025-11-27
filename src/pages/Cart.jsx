import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[#0D0D0D] text-gray-300">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4 drop-shadow">
          Tu carrito está vacío 🛒
        </h2>
        <Link
          to="/productos"
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 
                     text-black font-bold rounded-lg shadow-lg hover:scale-105 transition"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-12 px-6 text-gray-200">
      <div className="max-w-5xl mx-auto bg-[#0D0D0D] border border-yellow-500/30 
                      p-8 rounded-xl shadow-xl shadow-black/40">

        <h1 className="text-4xl font-extrabold text-yellow-400 mb-10 drop-shadow">
          🛍️ Carrito de compras
        </h1>

        {/* LISTA DE PRODUCTOS */}
        <div className="space-y-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between gap-6 
                         border-b border-yellow-500/20 pb-6"
            >
              {/* Imagen */}
              <img
                src={item.imageUrl || item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg border border-yellow-500/30"
              />

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-yellow-400">{item.name}</h3>
                <p className="text-gray-400">S/ {item.price.toFixed(2)}</p>
              </div>

              {/* Controles de cantidad */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-3 py-1 bg-[#1A1A1A] border border-yellow-500/40 
                             rounded-md text-yellow-400 hover:bg-yellow-500 
                             hover:text-black transition"
                >
                  -
                </button>

                <span className="text-xl font-bold text-yellow-400">
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-[#1A1A1A] border border-yellow-500/40 
                             rounded-md text-yellow-400 hover:bg-yellow-500 
                             hover:text-black transition"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <p className="text-xl font-bold text-yellow-400">
                S/ {(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Eliminar */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-300 hover:underline transition"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* TOTAL + BOTONES */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
          <h2 className="text-3xl font-bold text-yellow-400 drop-shadow">
            Total: S/ {total.toFixed(2)}
          </h2>

          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white 
                         rounded-lg font-bold shadow-lg transition"
            >
              Vaciar carrito
            </button>

            <Link
              to="/checkout"
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black 
                         font-bold rounded-lg shadow-lg hover:scale-105 transition"
            >
              Continuar al pago →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;

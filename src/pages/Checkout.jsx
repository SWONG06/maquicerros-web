import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { cartItems, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔒 Si el usuario no está autenticado, redirige al login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // 💳 Procesar pedido
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "https://maquicerros-backend.onrender.com"}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            total,
            userId: user?.id || null, // opcional
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al procesar la orden");
      }

      clearCart();
      alert("✅ ¡Orden creada con éxito!");
      navigate("/pedidos");
    } catch (err) {
      console.error("❌ Error en checkout:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Finalizar Compra
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Tu carrito está vacío 🛒
        </p>
      ) : (
        <>
          <div className="bg-white dark:bg-secondary rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Resumen de tu pedido
            </h2>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="py-3 flex justify-between text-gray-800 dark:text-gray-200"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>S/ {(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4 text-lg font-semibold">
              <span>Total:</span>
              <span className="text-primary">
                S/{" "}
                {cartItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>

          {error && (
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`w-full py-3 rounded-md font-medium text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {loading ? "Procesando..." : "Confirmar Pedido"}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;

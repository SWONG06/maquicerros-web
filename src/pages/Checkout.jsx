import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../services/orders";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "tarjeta",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Manejar cambios en inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Enviar pedido al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.address) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
      };

      // ✅ Enviar al backend mediante servicio
      const response = await createOrder(orderData);

      if (response.success) {
        clearCart();
        navigate("/pedidos", { state: { orderSuccess: true } });
      } else {
        setError(response.message || "❌ No se pudo registrar el pedido.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Si el carrito está vacío
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Tu carrito está vacío 🛒
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto bg-white dark:bg-secondary p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          🧾 Finalizar compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 🧍 Datos del comprador */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Datos de envío
            </h2>

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Método de pago
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
              >
                <option value="tarjeta">Tarjeta de crédito / débito</option>
                <option value="yape">Yape / Plin</option>
                <option value="transferencia">Transferencia bancaria</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white px-4 py-3 rounded-md font-medium transition disabled:opacity-50"
            >
              {loading ? "Procesando..." : "Finalizar pedido"}
            </button>
          </form>

          {/* 🛍️ Resumen del pedido */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Resumen del pedido
            </h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      x{item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-orange-600">
                    S/ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-lg font-bold text-gray-900 dark:text-white flex justify-between">
                <span>Total:</span>
                <span>S/ {total.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

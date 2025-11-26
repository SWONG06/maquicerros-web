import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/currency";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    address: "",
    paymentMethod: "yape",
  });

  useEffect(() => {
    if (!user) navigate("/login");
    if (cart.length === 0) navigate("/carrito");
  }, [user, cart, navigate]);

  const handleSubmit = () => {
    if (!form.fullname || !form.phone || !form.address) {
      alert("Por favor completa todos los campos");
      return;
    }

    // 🧾 Crear pedido simulado
    const newOrder = {
      id: Date.now(),
      userId: user.id,
      items: cart.map((i) => ({
        productId: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total,
      status: "created",
      date: new Date().toISOString(),
      paymentMethod: form.paymentMethod,
    };

    // Guardar pedido
    const orders = JSON.parse(localStorage.getItem("orders_sim")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders_sim", JSON.stringify(orders));

    clearCart();

    navigate(`/checkout/success?id=${newOrder.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Finalizar compra
        </h1>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Datos de entrega
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                value={form.fullname}
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
              />

              <input
                type="text"
                placeholder="Teléfono"
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <textarea
                placeholder="Dirección completa"
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Método de pago
            </h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="yape"
                  checked={form.paymentMethod === "yape"}
                  onChange={() => setForm({ ...form, paymentMethod: "yape" })}
                />
                Yape
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="plin"
                  checked={form.paymentMethod === "plin"}
                  onChange={() => setForm({ ...form, paymentMethod: "plin" })}
                />
                Plin
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={form.paymentMethod === "card"}
                  onChange={() => setForm({ ...form, paymentMethod: "card" })}
                />
                Tarjeta (simulado)
              </label>
            </div>
          </div>

          {/* RESUMEN */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Resumen de compra
            </h2>

            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-800 dark:text-gray-200"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="text-xl font-bold flex justify-between">
              <span>Total:</span>
              <span className="text-orange-600">{formatPrice(total)}</span>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-orange-600 hover:bg-orange-500 text-white p-3 rounded-lg font-semibold"
            >
              Confirmar pedido
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;

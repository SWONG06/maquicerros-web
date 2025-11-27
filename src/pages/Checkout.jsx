import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "tarjeta",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address) {
      setError("Por favor completa todos los campos.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total,
      customer: formData,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
    };

    addOrder(newOrder);
    clearCart();

    navigate("/pedido-exitoso");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-yellow-400 text-xl">
        Tu carrito está vacío 🛒
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-yellow-400 py-16 px-6">
      <div className="max-w-5xl mx-auto bg-[#1A1A1A] border border-yellow-500/30 p-8 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold mb-8">🧾 Finalizar compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-semibold">Nombre completo</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black border border-yellow-500/40 rounded-md px-4 py-2 text-yellow-400 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Correo electrónico</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black border border-yellow-500/40 rounded-md px-4 py-2 text-yellow-400 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Dirección</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-black border border-yellow-500/40 rounded-md px-4 py-2 text-yellow-400 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Método de pago</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full bg-black border border-yellow-500/40 text-yellow-400 rounded-md px-4 py-2 outline-none"
              >
                <option value="tarjeta">Tarjeta</option>
                <option value="yape">Yape / Plin</option>
                <option value="transferencia">Transferencia bancaria</option>
              </select>
            </div>

            {error && (
              <p className="text-red-500 font-semibold text-sm">{error}</p>
            )}

            <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg shadow-lg transition-all">
              Realizar pedido
            </button>

          </form>

          {/* Resumen */}
          <div>
            <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

            <div className="divide-y divide-yellow-500/20">
              {cart.map((item) => (
                <div className="py-3 flex justify-between" key={item.id}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>S/ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-yellow-500/30">
              <p className="text-xl font-bold flex justify-between">
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
